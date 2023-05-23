import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { nftAbi, nftAddress } from '../../lib/const';
import './fetchnft.css';

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
}

const Nav = () => {
  const [nftMetadata, setNFTMetadata] = useState<NFTMetadata[]>([]);

  useEffect(() => {
    connectWallet();
  }, []);

  // Connect to the wallet
  async function connectWallet() {
    // Check if the wallet is connected
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        // Request access to the user's accounts
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Retrieve NFT tokens
        const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);
        const walletAddress = await signer.getAddress();
        const tokenIds = await nftContract.balanceOf(walletAddress);

        // Convert tokenIds to an array
        const tokenIdsArray = Array.from(Array(Number(tokenIds)).keys());

        // Fetch and display metadata
        const metadataPromises = tokenIdsArray.map(async (tokenId: number) => {
          try {
            const tokenUri = await nftContract.tokenURI(tokenId);

            if (tokenUri.startsWith('ipfs://')) {
              // Handle IPFS URI separately
              const ipfsUrl = `https://ipfs.io/ipfs/${tokenUri.replace('ipfs://', '')}`;
              const metadataResponse = await axios.get<NFTMetadata>(ipfsUrl);
              return metadataResponse.data;
            } else {
              // Handle regular HTTP URI
              const metadataResponse = await axios.get<NFTMetadata>(tokenUri);
              return metadataResponse.data;
            }
          } catch (error) {
            console.error('Failed to fetch metadata for token', tokenId, ':', error);
            return null; // Handle the error by returning null or a placeholder value
          }
        });

        const metadataResults = await Promise.all(metadataPromises);
        const filteredMetadata = metadataResults.filter((metadata) => metadata !== null) as NFTMetadata[];
        setNFTMetadata(filteredMetadata);
      } catch (error) {
        console.error('Failed to connect to the wallet:', error);
      }
    } else {
      console.error('Wallet not found or MetaMask not installed');
    }
  }

  return (
    <div className="container">
      <h1>Your NFT Metadata:</h1>
      <ul>
        {nftMetadata.map((metadata, index) => (
          <li key={index} className="metadata-item">
            <div className="metadata-name">
              <strong>Name:</strong> {metadata.name}
            </div>
            <div className="metadata-description">
              <strong>Description:</strong> {metadata.description}
            </div>
            <div>
              <strong>Image:</strong> <img src={metadata.image} alt={metadata.name} className="metadata-image" />
            </div>
            <hr className="metadata-divider" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
