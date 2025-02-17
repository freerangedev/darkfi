/* This file is part of DarkFi (https://dark.fi)
 *
 * Copyright (C) 2020-2023 Dyne.org foundation
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

use std::time::{Duration, Instant};

use darkfi::{tx::Transaction, Result};
use darkfi_sdk::{
    crypto::{
        merkle_prelude::*, pallas, pasta_prelude::*, pedersen_commitment_u64, poseidon_hash, Coin,
        Keypair, MerkleNode, MerkleTree, SecretKey, TokenId, DAO_CONTRACT_ID, DARK_TOKEN_ID,
        MONEY_CONTRACT_ID,
    },
    ContractCall,
};
use darkfi_serial::{Decodable, Encodable};
use log::debug;
use rand::rngs::OsRng;

use darkfi_dao_contract::{
    dao_client, dao_model, money_client, note, wallet_cache::WalletCache, DaoFunction,
};

use darkfi_money_contract::{
    client::mint_v1::MintCallBuilder,
    model::{MoneyMintParamsV1, MoneyTransferParamsV1},
    MoneyFunction,
};

mod harness;
use harness::{init_logger, DaoTestHarness};

// TODO: Anonymity leaks in this proof of concept:
//
// * Vote updates are linked to the proposal_bulla
// * Nullifier of vote will link vote with the coin when it's spent

// TODO: strategize and cleanup Result/Error usage
// TODO: fix up code doc
// TODO: db_* errors returned from runtime should be more specific.
// TODO: db_* functions should be consistently ordered
// TODO: migrate rest of func calls below to make() format and cleanup

#[async_std::test]
async fn integration_test() -> Result<()> {
    init_logger()?;

    // Some benchmark averages
    let mut mint_verify_times = vec![];
    let mut propose_verify_times = vec![];
    let mut vote_verify_times = vec![];
    let mut exec_verify_times = vec![];

    // Slot to verify against
    let current_slot = 0;

    let dao_th = DaoTestHarness::new().await?;

    // Money parameters
    let xdrk_supply = 1_000_000;
    let xdrk_token_id = *DARK_TOKEN_ID;

    // Governance token parameters
    let gdrk_mint_auth = Keypair::random(&mut OsRng);
    let gdrk_supply = 1_000_000;
    let gdrk_token_id = TokenId::derive(gdrk_mint_auth.secret);

    // DAO parameters
    let dao = dao_client::DaoInfo {
        proposer_limit: 110,
        quorum: 110,
        approval_ratio_base: 2,
        approval_ratio_quot: 1,
        gov_token_id: gdrk_token_id,
        public_key: dao_th.dao_kp.public,
        bulla_blind: pallas::Base::random(&mut OsRng),
    };

    // We use this to receive coins
    let mut cache = WalletCache::new();

    // =======================================================
    // Dao::Mint
    //
    // Create the DAO bulla
    // =======================================================
    debug!(target: "dao", "Stage 1. Creating DAO bulla");

    let (params, proofs) = dao_client::make_mint_call(
        &dao,
        &dao_th.dao_kp.secret,
        &dao_th.dao_mint_zkbin,
        &dao_th.dao_mint_pk,
    )?;

    let mut data = vec![DaoFunction::Mint as u8];
    params.encode(&mut data)?;
    let calls = vec![ContractCall { contract_id: dao_th.dao_contract_id, data }];
    let proofs = vec![proofs];
    let mut tx = Transaction { calls, proofs, signatures: vec![] };
    let sigs = tx.create_sigs(&mut OsRng, &[dao_th.dao_kp.secret])?;
    tx.signatures = vec![sigs];

    let timer = Instant::now();
    let erroneous_txs = dao_th
        .alice_state
        .read()
        .await
        .verify_transactions(&[tx.clone()], current_slot, true)
        .await?;
    assert!(erroneous_txs.is_empty());
    mint_verify_times.push(timer.elapsed());
    // TODO: Witness and add to wallet merkle tree?

    let mut dao_tree = MerkleTree::new(100);
    let dao_leaf_position = {
        let node = MerkleNode::from(params.dao_bulla.inner());
        dao_tree.append(&node);
        dao_tree.witness().unwrap()
    };
    let dao_bulla = params.dao_bulla;
    debug!(target: "dao", "Created DAO bulla: {:?}", dao_bulla.inner());

    // =======================================================
    // Money::Transfer
    //
    // Mint the initial supply of treasury token
    // and send it all to the DAO directly
    // =======================================================
    debug!(target: "dao", "Stage 2. Minting treasury token");

    cache.track(dao_th.dao_kp.secret);

    // Address of deployed contract in our example is dao::exec::FUNC_ID
    // This field is public, you can see it's being sent to a DAO
    // but nothing else is visible.
    //
    // In the python code we wrote:
    //
    //   spend_hook = b"0xdao_ruleset"
    //
    // TODO: this should be the contract/func ID
    let spend_hook = DAO_CONTRACT_ID.inner();
    // The user_data can be a simple hash of the items passed into the ZK proof
    // up to corresponding linked ZK proof to interpret however they need.
    // In out case, it's the bulla for the DAO
    let user_data = dao_bulla.inner();

    let call = money_client::TransferCall {
        clear_inputs: vec![money_client::TransferClearInput {
            value: xdrk_supply,
            token_id: xdrk_token_id,
            signature_secret: dao_th.faucet_kp.secret,
        }],
        inputs: vec![],
        outputs: vec![money_client::TransferOutput {
            value: xdrk_supply,
            token_id: xdrk_token_id,
            public: dao_th.dao_kp.public,
            serial: pallas::Base::random(&mut OsRng),
            coin_blind: pallas::Base::random(&mut OsRng),
            spend_hook,
            user_data,
        }],
    };
    let (params, proofs) = call.make(
        &dao_th.money_mint_zkbin,
        &dao_th.money_mint_pk,
        &dao_th.money_burn_zkbin,
        &dao_th.money_burn_pk,
    )?;

    let contract_id = *MONEY_CONTRACT_ID;

    let mut data = vec![MoneyFunction::TransferV1 as u8];
    params.encode(&mut data)?;
    let calls = vec![ContractCall { contract_id, data }];
    let proofs = vec![proofs];
    let mut tx = Transaction { calls, proofs, signatures: vec![] };
    let sigs = tx.create_sigs(&mut OsRng, &vec![dao_th.faucet_kp.secret])?;
    tx.signatures = vec![sigs];

    let erroneous_txs = dao_th
        .alice_state
        .read()
        .await
        .verify_transactions(&[tx.clone()], current_slot, true)
        .await?;
    assert!(erroneous_txs.is_empty());

    // Wallet stuff

    // DAO reads the money received from the encrypted note
    {
        assert_eq!(tx.calls.len(), 1);
        let calldata = &tx.calls[0].data;
        let params_data = &calldata[1..];
        let params: MoneyTransferParamsV1 = Decodable::decode(params_data)?;

        for output in params.outputs {
            let coin = Coin::from(output.coin);
            cache.try_decrypt_note(coin, &output.note);
        }
    }

    let mut recv_coins = cache.get_received(&dao_th.dao_kp.secret);
    assert_eq!(recv_coins.len(), 1);
    let dao_recv_coin = recv_coins.pop().unwrap();
    let treasury_note = dao_recv_coin.note;

    // Check the actual coin received is valid before accepting it

    let coords = dao_th.dao_kp.public.inner().to_affine().coordinates().unwrap();
    let coin = poseidon_hash::<8>([
        *coords.x(),
        *coords.y(),
        pallas::Base::from(treasury_note.value),
        treasury_note.token_id.inner(),
        treasury_note.serial,
        treasury_note.spend_hook,
        treasury_note.user_data,
        treasury_note.coin_blind,
    ]);
    assert_eq!(coin, dao_recv_coin.coin.0);

    assert_eq!(treasury_note.spend_hook, spend_hook);
    assert_eq!(treasury_note.user_data, dao_bulla.inner());

    debug!(target: "dao", "DAO received a coin worth {} xDRK", treasury_note.value);

    // =======================================================
    // Money::Transfer
    //
    // Mint the governance token
    // Send it to three hodlers
    // =======================================================
    debug!(target: "dao", "Stage 3. Minting governance token");

    cache.track(dao_th.alice_kp.secret);
    cache.track(dao_th.bob_kp.secret);
    cache.track(dao_th.charlie_kp.secret);

    // TODO: Clean this whole test up
    let token_mint_zkbin = include_bytes!("../../money/proof/token_mint_v1.zk.bin");
    let token_mint_zkbin = darkfi::zkas::ZkBinary::decode(token_mint_zkbin)?;
    let token_mint_empty_wit = darkfi::zk::empty_witnesses(&token_mint_zkbin);
    let token_mint_circuit =
        darkfi::zk::ZkCircuit::new(token_mint_empty_wit, token_mint_zkbin.clone());
    let token_mint_pk = darkfi::zk::ProvingKey::build(13, &token_mint_circuit);

    // Spend hook and user data disabled
    let spend_hook = pallas::Base::from(0);
    let user_data = pallas::Base::from(0);

    let mut builder = MintCallBuilder {
        mint_authority: gdrk_mint_auth,
        recipient: dao_th.alice_kp.public,
        amount: 400000,
        spend_hook,
        user_data,
        token_mint_zkbin,
        token_mint_pk,
    };
    let debris1 = builder.build()?;

    builder.recipient = dao_th.bob_kp.public;
    let debris2 = builder.build()?;

    builder.amount = 200000;
    builder.recipient = dao_th.charlie_kp.public;
    let debris3 = builder.build()?;

    assert!(2 * 400000 + 200000 == gdrk_supply);

    // This should actually be 3 calls in a single tx, but w/e.
    let mut data = vec![MoneyFunction::MintV1 as u8];
    debris1.params.encode(&mut data)?;
    let calls = vec![ContractCall { contract_id: *MONEY_CONTRACT_ID, data }];
    let proofs = vec![debris1.proofs];
    let mut tx1 = Transaction { calls, proofs, signatures: vec![] };
    let sigs = tx1.create_sigs(&mut OsRng, &[gdrk_mint_auth.secret])?;
    tx1.signatures = vec![sigs];

    let mut data = vec![MoneyFunction::MintV1 as u8];
    debris2.params.encode(&mut data)?;
    let calls = vec![ContractCall { contract_id: *MONEY_CONTRACT_ID, data }];
    let proofs = vec![debris2.proofs];
    let mut tx2 = Transaction { calls, proofs, signatures: vec![] };
    let sigs = tx2.create_sigs(&mut OsRng, &[gdrk_mint_auth.secret])?;
    tx2.signatures = vec![sigs];

    let mut data = vec![MoneyFunction::MintV1 as u8];
    debris3.params.encode(&mut data)?;
    let calls = vec![ContractCall { contract_id: *MONEY_CONTRACT_ID, data }];
    let proofs = vec![debris3.proofs];
    let mut tx3 = Transaction { calls, proofs, signatures: vec![] };
    let sigs = tx3.create_sigs(&mut OsRng, &[gdrk_mint_auth.secret])?;
    tx3.signatures = vec![sigs];

    let erroneous_txs = dao_th
        .alice_state
        .read()
        .await
        .verify_transactions(&[tx1.clone(), tx2.clone(), tx3.clone()], current_slot, true)
        .await?;
    assert!(erroneous_txs.is_empty());

    // Wallet
    {
        for tx in [tx1, tx2, tx3] {
            assert_eq!(tx.calls.len(), 1);
            let calldata = &tx.calls[0].data;
            let params_data = &calldata[1..];
            let params: MoneyMintParamsV1 = Decodable::decode(params_data)?;
            cache.try_decrypt_note(params.output.coin, &params.output.note);
        }
    }

    let gov_keypairs = vec![dao_th.alice_kp, dao_th.bob_kp, dao_th.charlie_kp];
    let mut gov_recv = vec![None, None, None];
    // Check that each person received one coin
    for (i, key) in gov_keypairs.iter().enumerate() {
        let gov_recv_coin = {
            let mut recv_coins = cache.get_received(&key.secret);
            assert_eq!(recv_coins.len(), 1);
            let recv_coin = recv_coins.pop().unwrap();
            let note = &recv_coin.note;

            assert_eq!(note.token_id, gdrk_token_id);
            // Normal payment
            assert_eq!(note.spend_hook, pallas::Base::from(0));
            assert_eq!(note.user_data, pallas::Base::from(0));

            let (pub_x, pub_y) = key.public.xy();
            let coin = poseidon_hash::<8>([
                pub_x,
                pub_y,
                pallas::Base::from(note.value),
                note.token_id.inner(),
                note.serial,
                note.spend_hook,
                note.user_data,
                note.coin_blind,
            ]);
            assert_eq!(coin, recv_coin.coin.0);

            debug!(target: "dao", "Holder{} received a coin worth {} gDRK", i, note.value);

            recv_coin
        };
        gov_recv[i] = Some(gov_recv_coin);
    }
    // unwrap them for this demo
    let gov_recv: Vec<_> = gov_recv.into_iter().map(|r| r.unwrap()).collect();

    // =======================================================
    // Dao::Propose
    //
    // Propose the vote
    // In order to make a valid vote, first the proposer must
    // meet a criteria for a minimum number of gov tokens
    //
    // DAO rules:
    // 1. gov token IDs must match on all inputs
    // 2. proposals must be submitted by minimum amount
    // 3. all votes >= quorum
    // 4. outcome > approval_ratio
    // 5. structure of outputs
    //   output 0: value and address
    //   output 1: change address
    // =======================================================
    debug!(target: "dao", "Stage 4. Propose the vote");

    // TODO: look into proposal expiry once time for voting has finished

    let receiver_keypair = Keypair::random(&mut OsRng);

    let (money_leaf_position, money_merkle_path) = {
        let tree = &cache.tree;
        let leaf_position = gov_recv[0].leaf_position;
        let root = tree.root(0).unwrap();
        let merkle_path = tree.authentication_path(leaf_position, &root).unwrap();
        (leaf_position, merkle_path)
    };

    // TODO: is it possible for an invalid transfer() to be constructed on exec()?
    //       need to look into this
    let signature_secret = SecretKey::random(&mut OsRng);
    let input = dao_client::DaoProposeStakeInput {
        secret: dao_th.alice_kp.secret,
        note: gov_recv[0].note.clone(),
        leaf_position: money_leaf_position,
        merkle_path: money_merkle_path,
        signature_secret,
    };

    let (dao_merkle_path, dao_merkle_root) = {
        let tree = &dao_tree;
        let root = tree.root(0).unwrap();
        let merkle_path = tree.authentication_path(dao_leaf_position, &root).unwrap();
        (merkle_path, root)
    };

    let proposal = dao_client::DaoProposalInfo {
        dest: receiver_keypair.public,
        amount: 1000,
        token_id: xdrk_token_id,
        blind: pallas::Base::random(&mut OsRng),
    };

    let call = dao_client::DaoProposeCall {
        inputs: vec![input],
        proposal,
        dao: dao.clone(),
        dao_leaf_position,
        dao_merkle_path,
        dao_merkle_root,
    };
    let (params, proofs) = call.make(
        &dao_th.dao_propose_burn_zkbin,
        &dao_th.dao_propose_burn_pk,
        &dao_th.dao_propose_main_zkbin,
        &dao_th.dao_propose_main_pk,
    )?;

    let contract_id = *DAO_CONTRACT_ID;

    let mut data = vec![DaoFunction::Propose as u8];
    params.encode(&mut data)?;
    let calls = vec![ContractCall { contract_id, data }];
    let proofs = vec![proofs];
    let mut tx = Transaction { calls, proofs, signatures: vec![] };
    let sigs = tx.create_sigs(&mut OsRng, &vec![signature_secret])?;
    tx.signatures = vec![sigs];

    let timer = Instant::now();
    let erroneous_txs = dao_th
        .alice_state
        .read()
        .await
        .verify_transactions(&[tx.clone()], current_slot, true)
        .await?;
    assert!(erroneous_txs.is_empty());
    propose_verify_times.push(timer.elapsed());

    //// Wallet

    // Read received proposal
    let (proposal, proposal_bulla) = {
        // TODO: EncryptedNote should be accessible by wasm and put in the structs directly
        let enc_note = note::EncryptedNote2 {
            ciphertext: params.ciphertext,
            ephem_public: params.ephem_public,
        };
        let note: dao_client::DaoProposeNote = enc_note.decrypt(&dao_th.dao_kp.secret).unwrap();

        // TODO: check it belongs to DAO bulla

        // Return the proposal info
        (note.proposal, params.proposal_bulla)
    };
    debug!(target: "dao", "Proposal now active!");
    debug!(target: "dao", "  destination: {:?}", proposal.dest);
    debug!(target: "dao", "  amount: {}", proposal.amount);
    debug!(target: "dao", "  token_id: {:?}", proposal.token_id);
    debug!(target: "dao", "  dao_bulla: {:?}", dao_bulla.inner());
    debug!(target: "dao", "Proposal bulla: {:?}", proposal_bulla);

    // =======================================================
    // Proposal is accepted!
    // Start the voting
    // =======================================================

    // Copying these schizo comments from python code:
    // Lets the voting begin
    // Voters have access to the proposal and dao data
    //   vote_state = VoteState()
    // We don't need to copy nullifier set because it is checked from gov_state
    // in vote_state_transition() anyway
    //
    // TODO: what happens if voters don't unblind their vote
    // Answer:
    //   1. there is a time limit
    //   2. both the MPC or users can unblind
    //
    // TODO: bug if I vote then send money, then we can double vote
    // TODO: all timestamps missing
    //       - timelock (future voting starts in 2 days)
    // Fix: use nullifiers from money gov state only from
    // beginning of gov period
    // Cannot use nullifiers from before voting period

    debug!(target: "dao", "Stage 5. Start voting");

    // We were previously saving updates here for testing
    // let mut updates = vec![];

    // User 1: YES

    let (money_leaf_position, money_merkle_path) = {
        let tree = &cache.tree;
        let leaf_position = gov_recv[0].leaf_position;
        let root = tree.root(0).unwrap();
        let merkle_path = tree.authentication_path(leaf_position, &root).unwrap();
        (leaf_position, merkle_path)
    };

    let signature_secret = SecretKey::random(&mut OsRng);
    let input = dao_client::DaoVoteInput {
        secret: dao_th.alice_kp.secret,
        note: gov_recv[0].note.clone(),
        leaf_position: money_leaf_position,
        merkle_path: money_merkle_path,
        signature_secret,
    };

    let vote_option: bool = true;
    // assert!(vote_option || !vote_option); // wtf

    // We create a new keypair to encrypt the vote.
    // For the demo MVP, you can just use the dao_keypair secret
    let vote_keypair_1 = Keypair::random(&mut OsRng);

    let call = dao_client::DaoVoteCall {
        inputs: vec![input],
        vote_option,
        yes_vote_blind: pallas::Scalar::random(&mut OsRng),
        vote_keypair: vote_keypair_1,
        proposal: proposal.clone(),
        dao: dao.clone(),
    };
    let (params, proofs) = call.make(
        &dao_th.dao_vote_burn_zkbin,
        &dao_th.dao_vote_burn_pk,
        &dao_th.dao_vote_main_zkbin,
        &dao_th.dao_vote_main_pk,
    )?;

    let contract_id = *DAO_CONTRACT_ID;

    let mut data = vec![DaoFunction::Vote as u8];
    params.encode(&mut data)?;
    let calls = vec![ContractCall { contract_id, data }];
    let proofs = vec![proofs];
    let mut tx = Transaction { calls, proofs, signatures: vec![] };
    let sigs = tx.create_sigs(&mut OsRng, &vec![signature_secret])?;
    tx.signatures = vec![sigs];

    let timer = Instant::now();
    let erroneous_txs = dao_th
        .alice_state
        .read()
        .await
        .verify_transactions(&[tx.clone()], current_slot, true)
        .await?;
    assert!(erroneous_txs.is_empty());
    vote_verify_times.push(timer.elapsed());

    // Secret vote info. Needs to be revealed at some point.
    // TODO: look into verifiable encryption for notes
    // TODO: look into timelock puzzle as a possibility
    let vote_note_1 = {
        let enc_note = note::EncryptedNote2 {
            ciphertext: params.ciphertext,
            ephem_public: params.ephem_public,
        };
        let note: dao_client::DaoVoteNote = enc_note.decrypt(&vote_keypair_1.secret).unwrap();
        note
    };
    debug!(target: "dao", "User 1 voted!");
    debug!(target: "dao", "  vote_option: {}", vote_note_1.vote_option);
    debug!(target: "dao", "  value: {}", vote_note_1.all_vote_value);

    // User 2: NO

    let (money_leaf_position, money_merkle_path) = {
        let tree = &cache.tree;
        let leaf_position = gov_recv[1].leaf_position;
        let root = tree.root(0).unwrap();
        let merkle_path = tree.authentication_path(leaf_position, &root).unwrap();
        (leaf_position, merkle_path)
    };

    let signature_secret = SecretKey::random(&mut OsRng);
    let input = dao_client::DaoVoteInput {
        //secret: gov_keypair_2.secret,
        secret: dao_th.bob_kp.secret,
        note: gov_recv[1].note.clone(),
        leaf_position: money_leaf_position,
        merkle_path: money_merkle_path,
        signature_secret,
    };

    let vote_option: bool = false;
    // assert!(vote_option || !vote_option); // wtf

    // We create a new keypair to encrypt the vote.
    let vote_keypair_2 = Keypair::random(&mut OsRng);

    let call = dao_client::DaoVoteCall {
        inputs: vec![input],
        vote_option,
        yes_vote_blind: pallas::Scalar::random(&mut OsRng),
        vote_keypair: vote_keypair_2,
        proposal: proposal.clone(),
        dao: dao.clone(),
    };
    let (params, proofs) = call.make(
        &dao_th.dao_vote_burn_zkbin,
        &dao_th.dao_vote_burn_pk,
        &dao_th.dao_vote_main_zkbin,
        &dao_th.dao_vote_main_pk,
    )?;

    let contract_id = *DAO_CONTRACT_ID;

    let mut data = vec![DaoFunction::Vote as u8];
    params.encode(&mut data)?;
    let calls = vec![ContractCall { contract_id, data }];
    let proofs = vec![proofs];
    let mut tx = Transaction { calls, proofs, signatures: vec![] };
    let sigs = tx.create_sigs(&mut OsRng, &vec![signature_secret])?;
    tx.signatures = vec![sigs];

    let timer = Instant::now();
    let erroneous_txs = dao_th
        .alice_state
        .read()
        .await
        .verify_transactions(&[tx.clone()], current_slot, true)
        .await?;
    assert!(erroneous_txs.is_empty());
    vote_verify_times.push(timer.elapsed());

    let vote_note_2 = {
        let enc_note = note::EncryptedNote2 {
            ciphertext: params.ciphertext,
            ephem_public: params.ephem_public,
        };
        let note: dao_client::DaoVoteNote = enc_note.decrypt(&vote_keypair_2.secret).unwrap();
        note
    };
    debug!(target: "dao", "User 2 voted!");
    debug!(target: "dao", "  vote_option: {}", vote_note_2.vote_option);
    debug!(target: "dao", "  value: {}", vote_note_2.all_vote_value);

    // User 3: YES

    let (money_leaf_position, money_merkle_path) = {
        let tree = &cache.tree;
        let leaf_position = gov_recv[2].leaf_position;
        let root = tree.root(0).unwrap();
        let merkle_path = tree.authentication_path(leaf_position, &root).unwrap();
        (leaf_position, merkle_path)
    };

    let signature_secret = SecretKey::random(&mut OsRng);
    let input = dao_client::DaoVoteInput {
        //secret: gov_keypair_3.secret,
        secret: dao_th.charlie_kp.secret,
        note: gov_recv[2].note.clone(),
        leaf_position: money_leaf_position,
        merkle_path: money_merkle_path,
        signature_secret,
    };

    let vote_option: bool = true;
    // assert!(vote_option || !vote_option); // wtf

    // We create a new keypair to encrypt the vote.
    let vote_keypair_3 = Keypair::random(&mut OsRng);

    let call = dao_client::DaoVoteCall {
        inputs: vec![input],
        vote_option,
        yes_vote_blind: pallas::Scalar::random(&mut OsRng),
        vote_keypair: vote_keypair_3,
        proposal: proposal.clone(),
        dao: dao.clone(),
    };
    let (params, proofs) = call.make(
        &dao_th.dao_vote_burn_zkbin,
        &dao_th.dao_vote_burn_pk,
        &dao_th.dao_vote_main_zkbin,
        &dao_th.dao_vote_main_pk,
    )?;

    let contract_id = *DAO_CONTRACT_ID;

    let mut data = vec![DaoFunction::Vote as u8];
    params.encode(&mut data)?;
    let calls = vec![ContractCall { contract_id, data }];
    let proofs = vec![proofs];
    let mut tx = Transaction { calls, proofs, signatures: vec![] };
    let sigs = tx.create_sigs(&mut OsRng, &vec![signature_secret])?;
    tx.signatures = vec![sigs];

    let timer = Instant::now();
    let erroneous_txs = dao_th
        .alice_state
        .read()
        .await
        .verify_transactions(&[tx.clone()], current_slot, true)
        .await?;
    assert!(erroneous_txs.is_empty());
    vote_verify_times.push(timer.elapsed());

    // Secret vote info. Needs to be revealed at some point.
    // TODO: look into verifiable encryption for notes
    // TODO: look into timelock puzzle as a possibility
    let vote_note_3 = {
        let enc_note = note::EncryptedNote2 {
            ciphertext: params.ciphertext,
            ephem_public: params.ephem_public,
        };
        let note: dao_client::DaoVoteNote = enc_note.decrypt(&vote_keypair_3.secret).unwrap();
        note
    };
    debug!(target: "dao", "User 3 voted!");
    debug!(target: "dao", "  vote_option: {}", vote_note_3.vote_option);
    debug!(target: "dao", "  value: {}", vote_note_3.all_vote_value);

    // Every votes produces a semi-homomorphic encryption of their vote.
    // Which is either yes or no
    // We copy the state tree for the governance token so coins can be used
    // to vote on other proposals at the same time.
    // With their vote, they produce a ZK proof + nullifier
    // The votes are unblinded by MPC to a selected party at the end of the
    // voting period.
    // (that's if we want votes to be hidden during voting)

    let mut total_yes_vote_value = 0;
    let mut total_all_vote_value = 0;

    let mut blind_total_vote = dao_model::DaoBlindAggregateVote::default();

    // Just keep track of these for the assert statements after the for loop
    // but they aren't needed otherwise.
    let mut total_yes_vote_blind = pallas::Scalar::from(0);
    let mut total_all_vote_blind = pallas::Scalar::from(0);

    for (i, note) in [vote_note_1, vote_note_2, vote_note_3].iter().enumerate() {
        total_yes_vote_blind += note.yes_vote_blind;
        total_all_vote_blind += note.all_vote_blind;

        // Update private values

        // vote_option is either 0 or 1
        let yes_vote_value = note.vote_option as u64 * note.all_vote_value;
        total_yes_vote_value += yes_vote_value;
        total_all_vote_value += note.all_vote_value;

        // Update public values

        let yes_vote_commit = pedersen_commitment_u64(yes_vote_value, note.yes_vote_blind);
        let all_vote_commit = pedersen_commitment_u64(note.all_vote_value, note.all_vote_blind);

        let blind_vote = dao_model::DaoBlindAggregateVote { yes_vote_commit, all_vote_commit };
        blind_total_vote.aggregate(blind_vote);

        // Just for the debug
        let vote_result = match note.vote_option {
            true => "yes",
            false => "no",
        };
        debug!(
            target: "dao",
            "Voter {} voted {} with {} gDRK",
            i,
            vote_result,
            note.all_vote_value,
        );
    }

    debug!(target: "dao", "Outcome = {} / {}", total_yes_vote_value, total_all_vote_value);

    assert!(
        blind_total_vote.all_vote_commit ==
            pedersen_commitment_u64(total_all_vote_value, total_all_vote_blind),
    );
    assert!(
        blind_total_vote.yes_vote_commit ==
            pedersen_commitment_u64(total_yes_vote_value, total_yes_vote_blind),
    );

    // =======================================================
    // Execute the vote
    // =======================================================

    debug!(target: "dao", "Stage 6. Execute vote");

    // Used to export user_data from this coin so it can be accessed by DAO::exec()
    let user_data_blind = pallas::Base::random(&mut OsRng);

    let user_serial = pallas::Base::random(&mut OsRng);
    let user_coin_blind = pallas::Base::random(&mut OsRng);
    let dao_serial = pallas::Base::random(&mut OsRng);
    let dao_coin_blind = pallas::Base::random(&mut OsRng);
    let input_value = treasury_note.value;
    let input_value_blind = pallas::Scalar::random(&mut OsRng);
    let xfer_signature_secret = SecretKey::random(&mut OsRng);
    let exec_signature_secret = SecretKey::random(&mut OsRng);

    let (treasury_leaf_position, treasury_merkle_path) = {
        let tree = &cache.tree;
        let leaf_position = dao_recv_coin.leaf_position;
        let root = tree.root(0).unwrap();
        let merkle_path = tree.authentication_path(leaf_position, &root).unwrap();
        (leaf_position, merkle_path)
    };

    // TODO: this should be the contract/func ID
    //let spend_hook = pallas::Base::from(110);
    let spend_hook = DAO_CONTRACT_ID.inner();
    // The user_data can be a simple hash of the items passed into the ZK proof
    // up to corresponding linked ZK proof to interpret however they need.
    // In out case, it's the bulla for the DAO
    let user_data = dao_bulla.inner();

    let xfer_call = money_client::TransferCall {
        clear_inputs: vec![],
        inputs: vec![money_client::TransferInput {
            leaf_position: treasury_leaf_position,
            merkle_path: treasury_merkle_path,
            secret: dao_th.dao_kp.secret,
            note: treasury_note,
            user_data_blind,
            value_blind: input_value_blind,
            signature_secret: xfer_signature_secret,
        }],
        outputs: vec![
            // Sending money
            money_client::TransferOutput {
                value: 1000,
                token_id: xdrk_token_id,
                //public: user_keypair.public,
                public: receiver_keypair.public,
                serial: user_serial,
                coin_blind: user_coin_blind,
                spend_hook: pallas::Base::from(0),
                user_data: pallas::Base::from(0),
            },
            // Change back to DAO
            money_client::TransferOutput {
                value: xdrk_supply - 1000,
                token_id: xdrk_token_id,
                public: dao_th.dao_kp.public,
                serial: dao_serial,
                coin_blind: dao_coin_blind,
                spend_hook,
                user_data,
            },
        ],
    };
    let (xfer_params, xfer_proofs) = xfer_call.make(
        &dao_th.money_mint_zkbin,
        &dao_th.money_mint_pk,
        &dao_th.money_burn_zkbin,
        &dao_th.money_burn_pk,
    )?;

    let mut data = vec![MoneyFunction::TransferV1 as u8];
    xfer_params.encode(&mut data)?;
    let xfer_call = ContractCall { contract_id: *MONEY_CONTRACT_ID, data };

    let call = dao_client::DaoExecCall {
        proposal,
        dao,
        yes_vote_value: total_yes_vote_value,
        all_vote_value: total_all_vote_value,
        yes_vote_blind: total_yes_vote_blind,
        all_vote_blind: total_all_vote_blind,
        user_serial,
        user_coin_blind,
        dao_serial,
        dao_coin_blind,
        input_value,
        input_value_blind,
        hook_dao_exec: spend_hook,
        signature_secret: exec_signature_secret,
    };
    let (exec_params, exec_proofs) = call.make(&dao_th.dao_exec_zkbin, &dao_th.dao_exec_pk)?;

    let mut data = vec![DaoFunction::Exec as u8];
    exec_params.encode(&mut data)?;
    let exec_call = ContractCall { contract_id: *DAO_CONTRACT_ID, data };

    let mut tx = Transaction {
        calls: vec![xfer_call, exec_call],
        proofs: vec![xfer_proofs, exec_proofs],
        signatures: vec![],
    };
    let xfer_sigs = tx.create_sigs(&mut OsRng, &vec![xfer_signature_secret])?;
    let exec_sigs = tx.create_sigs(&mut OsRng, &vec![exec_signature_secret])?;
    tx.signatures = vec![xfer_sigs, exec_sigs];

    let timer = Instant::now();
    let erroneous_txs = dao_th
        .alice_state
        .read()
        .await
        .verify_transactions(&[tx.clone()], current_slot, true)
        .await?;
    assert!(erroneous_txs.is_empty());
    exec_verify_times.push(timer.elapsed());

    // Statistics
    let mint_avg = mint_verify_times.iter().sum::<Duration>();
    let mint_avg = mint_avg / mint_verify_times.len() as u32;
    println!("Average Mint verification time: {:?}", mint_avg);

    let propose_avg = propose_verify_times.iter().sum::<Duration>();
    let propose_avg = propose_avg / propose_verify_times.len() as u32;
    println!("Average Propose verification time: {:?}", propose_avg);

    let vote_avg = vote_verify_times.iter().sum::<Duration>();
    let vote_avg = vote_avg / vote_verify_times.len() as u32;
    println!("Average Vote verification time: {:?}", vote_avg);

    let exec_avg = exec_verify_times.iter().sum::<Duration>();
    let exec_avg = exec_avg / exec_verify_times.len() as u32;
    println!("Average Exec verification time: {:?}", exec_avg);

    Ok(())
}
