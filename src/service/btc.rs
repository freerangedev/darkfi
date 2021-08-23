use crate::{Result};

use rand::distributions::Alphanumeric;
use rand::{thread_rng, Rng};

use bitcoin::util::address::Address;
use bitcoin::util::ecdsa::{PrivateKey, PublicKey};
use secp256k1::key::SecretKey;
use bitcoin::blockdata::script::Script;
use bitcoin::network::constants::Network;
use async_std::sync::Arc;
use async_executor::Executor;
use log::*;
use electrum_client::{Client as ElectrumClient, ElectrumApi};

// Swap out these types for any future non bitcoin-rs types
pub type PubAddress = Address;
pub type PubKey = PublicKey;
pub type PrivKey = PrivateKey;

#[allow(dead_code)]
pub struct BitcoinKeys {
    secret_key: SecretKey,
    bitcoin_private_key: PrivateKey,
    btc_client: ElectrumClient,
    pub bitcoin_public_key: PublicKey,
    pub pub_address: Address,
    pub script: Script,
}

impl BitcoinKeys {
    pub fn new() -> Result<Arc<BitcoinKeys>> {

        // Pull address from config later
        let client_address = "";

        // create client
        let mut btc_client = ElectrumClient::new(&client_address).unwrap();

        let context = secp256k1::Secp256k1::new();

        // Probably not good enough for release
        let rand: String = thread_rng()
            .sample_iter(&Alphanumeric)
            .take(32)
            .map(char::from)
            .collect();

        let rand_hex = hex::encode(rand);

        // Generate simple byte array from rand
        let data_slice: &[u8] = rand_hex.as_bytes();

        let secret_key = SecretKey::from_slice(&hex::decode(data_slice).unwrap()).unwrap();

        // Use Testnet
        let bitcoin_private_key = PrivateKey::new(secret_key, Network::Testnet);

        let bitcoin_public_key = PublicKey::from_private_key(&context, &bitcoin_private_key);
        //let pubkey_serialized = bitcoin_public_key.to_bytes();

        let pub_address = Address::p2pkh(&bitcoin_public_key, Network::Testnet);

        let script = Script::new_p2pk(&bitcoin_public_key);

        Ok(Arc::new(BitcoinKeys {
            secret_key,
            bitcoin_private_key,
            bitcoin_public_key,
            btc_client,
            pub_address,
            script,
        }))
    }

    pub async fn start_subscribe(self: Arc<Self>, executor: Arc<Executor<'_>>) -> Result<()> {
        debug!(target: "BTC", "Subscribe");

        // Check if script is already subscribed
        let status = self.btc_client.script_subscribe(&self.script).unwrap();
        let subscribe_status_task =
            executor.spawn(
                self.subscribe_status_loop(executor.clone()),
            );

        let _ = subscribe_status_task.cancel().await;

        Ok(())
    }

    async fn subscribe_status_loop(
        self: Arc<Self>,
        executor: Arc<Executor<'_>>,
    ) -> Result<()> {
        loop {
            let check = self.btc_client.script_pop(&self.script);
            match check {
                // Script has a notification update
                Ok(status) => {

                }
                // No update
                Err(_) => {
                    break
                }
            }
        }
        Ok(())
    }

    // This should do a db lookup to return the same obj
    pub fn address_from_slice(key: &[u8]) -> Result<Address> {
        let pub_key = PublicKey::from_slice(key).unwrap();
        let address = Address::p2pkh(&pub_key, Network::Testnet);

        Ok(address)
    }

    pub fn get_deposit_address(&self) -> Result<&Address> {
        Ok(&self.pub_address)
    }
    pub fn get_pubkey(&self) -> &PublicKey {
        &self.bitcoin_public_key
    }
    pub fn get_privkey(&self) -> &PrivateKey {
        &self.bitcoin_private_key
    }
}
