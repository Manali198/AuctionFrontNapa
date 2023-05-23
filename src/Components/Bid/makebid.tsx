import { ethers } from 'ethers';
import React, { useState } from 'react';
import { auctionabi, auctionaddress } from '../../lib/const';
import imageToAdd from "../assets/nature.jpg";
import "./makebid.css"

const getAuctionContract = (): ethers.Contract => {
  const { ethereum } = window as any;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(auctionaddress, auctionabi, signer);
  console.log(contract);
  return contract;
};

const MakeBid: React.FC = () => {
  const [auctionId , setAuctionId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const makeBid = async (): Promise<void> => {
    const result = await getAuctionContract().makeBid(auctionId, amount);
    console.log(result.hash);
  };

  return (
    <div className="makebid">
      <div className="card">
        <h2>Make Bid </h2>  
        <form>
          <div className="form-group">
           <img src={imageToAdd} alt="../assets/nature.jpg" /><br /><br />

            <label htmlFor="auctionId">Auction ID:</label>
            <input type="text" id="auctionId" value={auctionId} onChange={e => setAuctionId(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input type="text" id="amount" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          
          <button type="button" onClick={makeBid}>Make Bid</button>
        </form>
      </div>
    </div>
  );
};

export default MakeBid;