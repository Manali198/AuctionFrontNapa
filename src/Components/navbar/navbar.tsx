import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import './navbar.css';

const web3Modal = new Web3Modal();

function Navbar() {
  const [currentAccount, setCurrentAccount] = useState<string | undefined>(undefined);

  const connectWallet = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      return alert('Please install Metamask wallet');
    }

    const networkId = await ethereum.request({ method: 'net_version' });

    if (networkId !== '11155111') {
      return alert('Please switch to Sepolia Testnet');
    }

    const provider = await web3Modal.connect();
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    setCurrentAccount(address);
    console.log(address);
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      const { ethereum } = window;
      if (ethereum && ethereum.selectedAddress) {
        const web3Provider = new ethers.providers.Web3Provider(ethereum);
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        setCurrentAccount(address);
      }
    };

    checkWalletConnection();
  }, []);

  const displayAddress = currentAccount
    ? `${currentAccount.slice(0, 4)}...${currentAccount.slice(-4)}`
    : '';

  return (
    <div className="">
      <nav>
        <ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0, justifyContent: 'space-evenly' }}>
          <li style={{ marginRight: '10px' }}>
            <a href="/">CreateNFT</a>
          </li>
          <li>
            <a href="/makeBid">Auction</a>
          </li>
          <li>
            <a href="/Nav">FetchNFT</a>
          </li>
          {currentAccount ? (
            <li style={{ marginRight: '10px' }}>{displayAddress}</li>
          ) : (
            <li style={{ marginRight: '10px' }}>
              <button onClick={connectWallet}>Connect Wallet</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;