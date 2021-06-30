use crate::wallet::{WalletDB, WalletPtr};
use crate::Result;
use log::*;
use async_std::sync::Arc;
//use std::sync::Arc;

pub type AdapterPtr = Arc<RpcAdapter>;
// Dummy adapter for now
pub struct RpcAdapter {
    pub wallet: Arc<WalletDB>,
}

impl RpcAdapter {
    pub fn new(wallet: Arc<WalletDB>) -> Result<Self> {
        debug!(target: "ADAPTER", "new() [CREATING NEW WALLET]");
        Ok(Self { wallet })
    }

    pub async fn key_gen(&self) -> Result<()> {
        debug!(target: "adapter", "key_gen() [START]");
        let (public, private) = self.wallet.key_gen().await;
        self.wallet.put_keypair(public, private).await?;
        Ok(())
    }

    pub async fn cash_key_gen(&self) -> Result<()> {
        debug!(target: "adapter", "key_gen() [START]");
        let (public, private) = self.wallet.key_gen().await;
        //self.wallet.put_keypair(public, private).await?;
        Ok(())
    }

    pub async fn get_key(&self) -> Result<()> {
        debug!(target: "adapter", "get_key() [START]");
        let key_public = self.wallet.get_public().await?;
        println!("{:?}", key_public);
        Ok(())
    }

    pub async fn get_cash_key(&self) -> Result<()> {
        debug!(target: "adapter", "get_cash_key() [START]");
        let cashier_public = self.wallet.get_public().await?;
        println!("{:?}", cashier_public);
        Ok(())
    }

    //pub async fn walletdb(&self) -> WalletPtr {
    //    self.wallet.clone();
    //}

    //pub async fn create_
    //pub async fn save_key(&self, pubkey: Vec<u8>) -> Result<()> {
    //    debug!(target: "adapter", "save_key() [START]");
    //    //let path = WalletDB::path("wallet.db")?;
    //    //WalletDB::save(path, pubkey).await?;
    //    Ok(())
    //}

    //pub async fn save_cash_key(&self, pubkey: Vec<u8>) -> Result<()> {
    //    debug!(target: "adapter", "save_cash_key() [START]");
    //    //let path = WalletDB::path("cashier.db")?;
    //    //WalletDB::save(path, pubkey).await?;
    //    Ok(())
    //}

    pub async fn get_info(&self) {}

    pub async fn say_hello(&self) {}

    pub async fn stop(&self) {}
}
