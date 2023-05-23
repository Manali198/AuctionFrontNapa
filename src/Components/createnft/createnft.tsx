import { ethers } from 'ethers';
import React, { useState } from 'react';
import { auctionabi, auctionaddress } from '../../lib/const';
import './createNft.css';

const getAuctionContract = (): ethers.Contract => {
  const { ethereum } = window as any;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(auctionaddress, auctionabi, signer);
  console.log(contract);
  return contract;
};

const CreateNft: React.FC = () => {
  const [nftId, setNftId] = useState<string>("");
  const [nftAddress, setNftAddress] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState<string>("");

  const createAuction = async (): Promise<void> => {
    const result = await getAuctionContract().createAuction(nftId, nftAddress, endTime, isPrivate, paymentType);
    console.log(result.hash);
  };

  return (
    <div className="CreateNft">
      <div className="card">
        <h2>Create NFT Auction</h2>
        <form>
          <div className="form-group">
            <label htmlFor="nftId">NFT ID:</label>
            <input type="text" id="nftId" value={nftId} onChange={e => setNftId(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="nftAddress">NFT Address:</label>
            <input type="text" id="nftAddress" value={nftAddress} onChange={e => setNftAddress(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="endTime">End Time:</label>
            <input type="text" id="endTime" value={endTime} onChange={e => setEndTime(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="isPrivate">Is Private:</label>
            <input type="checkbox" id="isPrivate" checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} />
          </div>
          <div className="form-group">
            <label htmlFor="paymentType">Payment Type:</label>
            <input type="text" id="paymentType" value={paymentType} onChange={e => setPaymentType(e.target.value)} />
          </div>
          <button type="button" onClick={createAuction}>Create Auction</button>
        </form>
      </div>
    </div>
  );
};

export default CreateNft;
