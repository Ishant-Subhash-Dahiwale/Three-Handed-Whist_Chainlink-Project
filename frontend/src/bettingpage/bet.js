import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import contractABI from './thw.json';
import './bet.css'; // Import the CSS file
import { Button } from '@mui/material';

const ThreeHandedWhist = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [players, setPlayers] = useState([]);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [winnerAddress, setWinnerAddress] = useState('');
  
  const [showStakeSection, setShowStakeSection] = useState(false);
  const [showWinnerSection, setShowWinnerSection] = useState(false);

  const contractAddress = "0x5017cf71dA8E90DDEC3266224Ef762E3b14023d5";

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          setAccounts(accounts);
          const instance = new web3Instance.eth.Contract(contractABI, contractAddress);
          setContract(instance);
        });
    } else {
      console.log('Please install MetaMask!');
    }
  }, []);

  useEffect(() => {
    if (contract) {
      updateGameState();
    }
    generateSparkles(100); // Number of sparkles
  }, [contract]);

  const updateGameState = async () => {
    try {
      const players = await Promise.all([
        contract.methods.players(0).call(),
        contract.methods.players(1).call(),
        contract.methods.players(2).call()
      ]);
      setPlayers(players);

      const stakeAmount = await contract.methods.stakeAmount().call();
      setStakeAmount(web3.utils.fromWei(stakeAmount, 'ether'));

      const gameActive = await contract.methods.gameActive().call();
      setGameActive(gameActive);
    } catch (error) {
      console.error('Error updating game state:', error);
    }
  };

  const addPlayer = async () => {
    try {
      await contract.methods.addPlayer(accounts[0]).send({ from: accounts[0] });
      await updateGameState();
      setTimeout(() => setShowStakeSection(true), 2000); // Show stake section after 2 seconds
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  const stake = async (amount) => {
    try {
      await contract.methods.stake().send({ from: accounts[0], value: web3.utils.toWei(amount, 'ether') });
      await updateGameState();
      setTimeout(() => setShowWinnerSection(true), 2000); // Show winner section after 2 seconds
    } catch (error) {
      console.error('Error staking:', error);
    }
  };

  const giveWinner = async (winnerAddress) => {
    try {
      await contract.methods.giveWinner(winnerAddress).send({ from: accounts[0] });
      await updateGameState();
    } catch (error) {
      console.error('Error giving winner:', error);
    }
  };

  const generateSparkles = (count) => {
    const body = document.body;
    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('div');
      sparkle.classList.add('sparkle');
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.animationDelay = `${Math.random() * 5}s`;
      body.appendChild(sparkle);
    }
  };

  return (<div className='mmm' style={{height:window.innerHeight}}>
    <div className="container">
      <h1>Three Handed Whist</h1>
      <div>
        <p>Game Active: {gameActive ? "Yes" : "No"}</p>
        <p>Players: {players.join(', ')}</p>
        <p>Stake Amount: {stakeAmount} ETH</p>
      </div>
      <div>
        <button onClick={addPlayer}>Add Player</button>
        
      </div>
      {showStakeSection && (
        <div>
          <input className='in'
            type="number"
            placeholder="Stake amount in ETH"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
          />
          <button onClick={() => stake(stakeAmount)}>Stake</button>
        </div>
      )}
      {showWinnerSection && (
        <div>
          {/* <input
            type="text"
            placeholder="Winner Address"
            value={winnerAddress}
            onChange={(e) => setWinnerAddress(e.target.value)}
          />
          <button onClick={() => giveWinner(winnerAddress)}>Give Winnings</button> */}
          <br></br>
<Button variant="contained" color="success" style={{marginTop:'20px'}} href='/game'>
Go 
      </Button>         </div>
      )}
    </div>
    </div>
  );
};

export default ThreeHandedWhist;
