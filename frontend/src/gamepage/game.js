import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './game.css';
import Web3 from 'web3';
import contractJson from './afunc.json';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import contractABI from './acardget.json';
import contractABIw from './thw.json';
import Gback from './gback/gback';



import { ReactComponent as Card2C } from './../cardsvg/2C.svg';
import { ReactComponent as Card2D } from './../cardsvg/2D.svg';
import { ReactComponent as Card2H } from './../cardsvg/2H.svg';
import { ReactComponent as Card2S } from './../cardsvg/2S.svg';
import { ReactComponent as Card3C } from './../cardsvg/3C.svg';
import { ReactComponent as Card3D } from './../cardsvg/3D.svg';
import { ReactComponent as Card3H } from './../cardsvg/3H.svg';
import { ReactComponent as Card3S } from './../cardsvg/3S.svg';
import { ReactComponent as Card4C } from './../cardsvg/4C.svg';
import { ReactComponent as Card4D } from './../cardsvg/4D.svg';
import { ReactComponent as Card4H } from './../cardsvg/4H.svg';
import { ReactComponent as Card4S } from './../cardsvg/4S.svg';
import { ReactComponent as Card5C } from './../cardsvg/5C.svg';
import { ReactComponent as Card5D } from './../cardsvg/5D.svg';
import { ReactComponent as Card5H } from './../cardsvg/5H.svg';
import { ReactComponent as Card5S } from './../cardsvg/5S.svg';
import { ReactComponent as Card6C } from './../cardsvg/6C.svg';
import { ReactComponent as Card6D } from './../cardsvg/6D.svg';
import { ReactComponent as Card6H } from './../cardsvg/6H.svg';
import { ReactComponent as Card6S } from './../cardsvg/6S.svg';
import { ReactComponent as Card7C } from './../cardsvg/7C.svg';
import { ReactComponent as Card7D } from './../cardsvg/7D.svg';
import { ReactComponent as Card7H } from './../cardsvg/7H.svg';
import { ReactComponent as Card7S } from './../cardsvg/7S.svg';
import { ReactComponent as Card8C } from './../cardsvg/8C.svg';
import { ReactComponent as Card8D } from './../cardsvg/8D.svg';
import { ReactComponent as Card8H } from './../cardsvg/8H.svg';
import { ReactComponent as Card8S } from './../cardsvg/8S.svg';
import { ReactComponent as Card9C } from './../cardsvg/9C.svg';
import { ReactComponent as Card9D } from './../cardsvg/9D.svg';
import { ReactComponent as Card9H } from './../cardsvg/9H.svg';
import { ReactComponent as Card9S } from './../cardsvg/9S.svg';
import { ReactComponent as CardAC } from './../cardsvg/AC.svg';
import { ReactComponent as CardAD } from './../cardsvg/AD.svg';
import { ReactComponent as CardAH } from './../cardsvg/AH.svg';
import { ReactComponent as CardAS } from './../cardsvg/AS.svg';
import { ReactComponent as CardJC } from './../cardsvg/JC.svg';
import { ReactComponent as CardJD } from './../cardsvg/JD.svg';
import { ReactComponent as CardJH } from './../cardsvg/JH.svg';
import { ReactComponent as CardJS } from './../cardsvg/JS.svg';
import { ReactComponent as CardKC } from './../cardsvg/KC.svg';
import { ReactComponent as CardKD } from './../cardsvg/KD.svg';
import { ReactComponent as CardKH } from './../cardsvg/KH.svg';
import { ReactComponent as CardKS } from './../cardsvg/KS.svg';
import { ReactComponent as CardQC } from './../cardsvg/QC.svg';
import { ReactComponent as CardQD } from './../cardsvg/QD.svg';
import { ReactComponent as CardQH } from './../cardsvg/QH.svg';
import { ReactComponent as CardQS } from './../cardsvg/QS.svg';
import { ReactComponent as CardTC } from './../cardsvg/TC.svg';
import { ReactComponent as CardTD } from './../cardsvg/TD.svg';
import { ReactComponent as CardTH } from './../cardsvg/TH.svg';
import { ReactComponent as CardTS } from './../cardsvg/TS.svg';


const cardComponents = [
  { name: '2C', component: Card2C, index: 0, trump: 0, rank: 2 },
  { name: '3C', component: Card3C, index: 4, trump: 0, rank: 3 },
  { name: '4C', component: Card4C, index: 8, trump: 0, rank: 4 },
  { name: '5C', component: Card5C, index: 12, trump: 0, rank: 5 },
  { name: '6C', component: Card6C, index: 16, trump: 0, rank: 6 },
  { name: '7C', component: Card7C, index: 20, trump: 0, rank: 7 },
  { name: '8C', component: Card8C, index: 24, trump: 0, rank: 8 },
  { name: '9C', component: Card9C, index: 28, trump: 0, rank: 9 },
  { name: 'TC', component: CardTC, index: 48, trump: 0, rank: 10 },
  { name: 'JC', component: CardJC, index: 36, trump: 0, rank: 11 },
  { name: 'QC', component: CardQC, index: 44, trump: 0, rank: 12 },
  { name: 'KC', component: CardKC, index: 40, trump: 0, rank: 13 },
  { name: 'AC', component: CardAC, index: 32, trump: 0, rank: 14 },
  { name: '2D', component: Card2D, index: 1, trump: 0, rank: 2 },
  { name: '3D', component: Card3D, index: 5, trump: 0, rank: 3 },
  { name: '4D', component: Card4D, index: 9, trump: 0, rank: 4 },
  { name: '5D', component: Card5D, index: 13, trump: 0, rank: 5 },
  { name: '6D', component: Card6D, index: 17, trump: 0, rank: 6 },
  { name: '7D', component: Card7D, index: 21, trump: 0, rank: 7 },
  { name: '8D', component: Card8D, index: 25, trump: 0, rank: 8 },
  { name: '9D', component: Card9D, index: 29, trump: 0, rank: 9 },
  { name: 'TD', component: CardTD, index: 49, trump: 0, rank: 10 },
  { name: 'JD', component: CardJD, index: 37, trump: 0, rank: 11 },
  { name: 'QD', component: CardQD, index: 45, trump: 0, rank: 12 },
  { name: 'KD', component: CardKD, index: 41, trump: 0, rank: 13 },
  { name: 'AD', component: CardAD, index: 33, trump: 0, rank: 14 },
  { name: '2H', component: Card2H, index: 2, trump: 0, rank: 2 },
  { name: '3H', component: Card3H, index: 6, trump: 0, rank: 3 },
  { name: '4H', component: Card4H, index: 10, trump: 0, rank: 4 },
  { name: '5H', component: Card5H, index: 14, trump: 0, rank: 5 },
  { name: '6H', component: Card6H, index: 18, trump: 0, rank: 6 },
  { name: '7H', component: Card7H, index: 22, trump: 0, rank: 7 },
  { name: '8H', component: Card8H, index: 26, trump: 0, rank: 8 },
  { name: '9H', component: Card9H, index: 30, trump: 0, rank: 9 },
  { name: 'TH', component: CardTH, index: 50, trump: 0, rank: 10 },
  { name: 'JH', component: CardJH, index: 38, trump: 0, rank: 11 },
  { name: 'QH', component: CardQH, index: 46, trump: 0, rank: 12 },
  { name: 'KH', component: CardKH, index: 42, trump: 0, rank: 13 },
  { name: 'AH', component: CardAH, index: 34, trump: 0, rank: 14 },
  { name: '2S', component: Card2S, index: 3, trump: 0, rank: 2 },
  { name: '3S', component: Card3S, index: 7, trump: 0, rank: 3 },
  { name: '4S', component: Card4S, index: 11, trump: 0, rank: 4 },
  { name: '5S', component: Card5S, index: 15, trump: 0, rank: 5 },
  { name: '6S', component: Card6S, index: 19, trump: 0, rank: 6 },
  { name: '7S', component: Card7S, index: 23, trump: 0, rank: 7 },
  { name: '8S', component: Card8S, index: 27, trump: 0, rank: 8 },
  { name: '9S', component: Card9S, index: 31, trump: 0, rank: 9 },
  { name: 'TS', component: CardTS, index: 51, trump: 0, rank: 10 },
  { name: 'JS', component: CardJS, index: 39, trump: 0, rank: 11 },
  { name: 'QS', component: CardQS, index: 47, trump: 0, rank: 12 },
  { name: 'KS', component: CardKS, index: 43, trump: 0, rank: 13 },
  { name: 'AS', component: CardAS, index: 35, trump: 0, rank: 14 }
];


// Import card components here

const socket = io('http://localhost:5000');



const SlidingPane = ({ items, onItemClick, onTogglePane, selectedIndices }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [randomIndices, setRandomIndices] = useState([]);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [array1, setArray1] = useState([]);
  const [pid, setpid] = useState(0);


  const togglePane = () => {
    setIsOpen(!isOpen);
    if (onTogglePane) {
      onTogglePane(!isOpen);
    }
  };
  // const bigIntToStringArray = (array) => array.map(item => item.toString());

  const fetchArrays = async () => {
    if (contract) {
        try {

          // let co=4;

          // (async () => {
          //   try {
          //     let a = await axios.get('http://localhost:5000/getpid');
          //     console.log(a.data.pid);
          //     setpid(a.data.pid);
          //   } catch (error) {
          //     console.error('Error fetching PID:', error);
          //   }
          // })();
          
          console.log(pid);

            if(pid%3===0){
              const array1 = await contract.methods.getArray1().call();
              const array1Strings = array1.map(item => Number(item));

              setArray1(array1Strings);
              setRandomIndices(array1Strings)
              console.log(array1Strings);
            }else if(pid%3===1){
              const array2 = await contract.methods.getArray2().call();
              const array2Strings = array2.map(item => Number(item));

              setArray1(array2Strings);
              setRandomIndices(array2Strings)
              console.log(array2Strings);
            }
            else if(pid%3===2){
              const array3 = await contract.methods.getArray3().call();
              const array3Strings = array3.map(item => Number(item));

              setArray1(array3Strings);
              setRandomIndices(array3Strings)
              console.log(array3Strings);
            }

        } catch (error) {
            console.error("Error fetching arrays:", error);
        }
    }
};

  useEffect(() => {

    (async () => {
      try {
        let a = await axios.get('http://localhost:5000/getpid');
        console.log(a.data.pid);
        setpid(a.data.pid);
      } catch (error) {
        console.error('Error fetching PID:', error);
      }
    })();

      const contractAddress = '0x4A29216b73F4A3585420cFFC6623C45375Ae5346';

      const loadWeb3 =  () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            try {
              console.log(contract);

                 window.ethereum.request({ method: 'eth_requestAccounts' });
            } catch (error) {
                console.error("User denied account access", error);
            }
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    };
    
    const loadBlockchainData =  () => {
        const web3 = window.web3;
        const accounts =  web3.eth.getAccounts();
        setAccount(accounts[0]);
        console.log("User denied account 2access");

        const contract = new web3.eth.Contract(contractABI.abi, contractAddress);
        setContract(contract);
    };
    

      loadWeb3();
      loadBlockchainData();

    

    // const generateRandomIndices = (totalItems, count) => {
    //   const indices = [];
    //   while (indices.length < count) {
    //     const randomIndex = Math.floor(Math.random() * totalItems);
    //     if (!indices.includes(randomIndex)) {
    //       indices.push(randomIndex);
    //     }
    //   }
    //   return indices;
    // };

    // setRandomIndices([1,2,3]);
  }, []);

  return (
    <div className={`pane-container ${isOpen ? 'open' : ''}`}>
      <button className="toggle-button" onClick={()=>{togglePane();fetchArrays();}}>
        {isOpen ? 'Close Pane' : 'Open Pane'}
      </button>
      <div className="pane">
        <h2>Items</h2>
        <div className="items-container">
          {items.map((item, index) => (
            randomIndices.includes(index) && !selectedIndices.includes(index) && (
              <div
                key={index}
                className="item"
                onClick={() => {
                  onItemClick(index);
                  togglePane();
                }}
              > 
               <item.component />
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};
let idd='';

const Game = () => {
  const [web3w, setWeb3w] = useState(null);
  const [contractw, setContractw] = useState(null);
  const [accountw, setAccountw] = useState([]);


  const [winnerAddress, setWinnerAddress] = useState('');

  const [players, setPlayers] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [isGameFull, setIsGameFull] = useState(false);
  const [result, setResult] = useState(null);


  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3w(web3Instance);

      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          setAccountw(accounts);
          const contractAddressw = '0x5017cf71dA8E90DDEC3266224Ef762E3b14023d5'
          const instance = new web3Instance.eth.Contract(contractABIw, contractAddressw);
          setContractw(instance);
        });
    } else {
      console.log('Please install MetaMask!');
    }
  }, []);



// JavaScript to handle mouse movement and card animation
document.addEventListener('mousemove', (event) => {
  const card = document.createElement('div');
  card.className = 'cardm';
  card.style.left = `${event.pageX - 50}px`; // Center the card on the cursor
  card.style.top = `${event.pageY - 75}px`;
  
  document.querySelector('.Ap').appendChild(card);

  // Trigger the disappear animation after a short delay
  setTimeout(() => {
      card.style.animation = 'disappear 0.5s ease forwards';
  }, 500); // Adjust the delay as needed

  // Remove the card from the DOM after the disappear animation completes
  card.addEventListener('animationend', () => {
      card.remove();
  });
});

  useEffect(() => {
    connectWallet();

    socket.on('update-players', (players) => {
      console.log(players)
      setPlayers(players);
    });

    socket.on('start-game', () => {
      alert('Game is starting!');
    });

    socket.on('game-full', () => {
      setIsGameFull(true);
    });
    socket.on('game-result', ({ winnerId }) => {
      idd=winnerId;
      setResult(winnerId === 'draw' ? 'It\'s a draw!' : `The winner is ${winnerId}`);
    });

    return () => {
      socket.off('update-players');
      socket.off('start-game');
      socket.off('game-full');
      socket.off('game-result');
    };
  }, []);

  const handleItemClick = (index) => {
    if (selectedIndices.length < 1 && !selectedIndices.includes(index)) {
      setSelectedIndices([index]);
      socket.emit('select-card', index);
    }
  };

  const handleJoinGame = () => {
    socket.emit('join-game', playerName);
  };

  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [paneInput, setPaneInput] = useState('');
  const [submittedTexts, setSubmittedTexts] = useState([]);


  const togglePane = () => {

    setIsPaneOpen(!isPaneOpen);
  };

  const handlePaneSubmit = async() => {

    setSubmittedTexts([...submittedTexts, paneInput]);
    console.log(paneInput);

    if(isOn){
      let d =paneInput;
      let dir = await axios.get('http://localhost:5000/generate?prompt='+d.toString());
          setSubmittedTexts([...submittedTexts, dir.data.response.toString()]);
          setPaneInput('');
          console.log(dir);
      return;
        }
    let a= paneInput;


     callSendRequest(a);

let count = 0;

// Set the interval to call getCharacter every 10 seconds
const interval = setInterval(() => {
  
  getCharacter();
    count++;

    // Clear the interval after 5 calls
    if (count === 8) {
        clearInterval(interval);
    }
}, 25000); 
  };



// here i have used chainlink functions
  const [isOn, setIsOn] = useState(false);
  const [account, setAccount] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [character, setCharacter] = useState('');

  let web3;
  let contract;
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);


  } else {
    console.error("MetaMask is not installed.");
    return;
  }
  let accounts;
  const connectWallet = async () => {
    try {
       accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      setContractAddress('0x0D1f597A8b553e074F81B9b016f162c52b319B84')
    
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  const callSendRequest = async (a) => {
    contract = new web3.eth.Contract(contractJson.abi, contractAddress);
    console.log('Connected to wallet. Accounts:', accounts);

    const subscriptionId = 2810; // Replace with your actual subscription ID
    const ss="giveans in fewwords"
    const args = [`${a} ${ss}`]; // Replace with your actual arguments

    try {
      const tx = await contract.methods.sendRequest(subscriptionId, args).send({ from: account, gas: 300000 });

      console.log('Transaction hash:', tx.transactionHash);
      console.log('Transaction confirmed in block:', tx.blockNumber);
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  const getCharacter = async () => {
    try {
      const character = await contract.methods.character().call();
      setCharacter(character);
      console.log('Character:', character);
    } catch (error) {
      console.error('Error getting character:', error);
    }
  };
  const handleToggle = (event) => {
    setIsOn(event.target.checked);
if(isOn){
  alert(`'Makes ai call through Chainlink Functions'`)
  return ;
}
alert(`' Direct Call to AI'`)

  };



  // const handleToggle = () => {
  //     setIsOn(!isOn);
  //     console.log(`' The switch is ${isOn ? "ON" : "OFF"}'`)

  // };

  const giveWinner = async (winnerAddress) => {
    try {
      await contractw.methods.giveWinner(winnerAddress).send({ from: accountw[0] });
      // await updateGameState();
    } catch (error) {
      console.error('Error giving winner:', error);
    }
  };



  return (
<div style={{ position: 'relative' }}>
      <Gback/>
    <div className="Ap">
      <div style={{zIndex:15}} >
      <h1>Three-Handed Whist Game</h1>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter your name"
        disabled={isGameFull}
      />
      <button onClick={handleJoinGame} disabled={isGameFull}>Join Game</button>

      {isGameFull && <p>The game is full. Please wait for the next game.</p>}

      <div className="player-cards">
        {players.map((player, idx) => (
          <div key={player.id} className="player-card">
            <p>{player.name}</p>
            {player.selectedCard !== null && React.createElement(cardComponents[player.selectedCard].component)}
          </div>
        ))}
      </div>
      </div>

      <SlidingPane
        items={cardComponents}
        onItemClick={handleItemClick}
        onTogglePane={() => {}}
        selectedIndices={selectedIndices}
      />
      {result && (
        <div className="result-box">
          <p>{result}</p>
          <br></br>
{idd===playerName && (<div>
  <input
            type="text"
            placeholder="Winner Address"
            value={winnerAddress}
            onChange={(e) => setWinnerAddress(e.target.value)}
          />
          <button onClick={() => giveWinner(winnerAddress)}>Give Winnings</button> 
          </div>)
        }</div>
      )}
        <button onClick={togglePane} style={{ position: 'fixed', top: '0px', left: '0px', zIndex: 3 }}>
        {isPaneOpen ? '<' : 'AI HELPER'}
      </button>
      {isPaneOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '90%',
          width: '550px',
          backgroundColor: '#f0f0f0',
          boxShadow: '2px 0px 5px rgba(0,0,0,0.5)',
          zIndex: 2,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}>

          <div style={{marginLeft:'50px'}}
          >
            <FormControlLabel
                control={<Switch checked={isOn} onChange={handleToggle} />}
                label="Toggle to switch between modes"
                sx={{ color: 'black' }}  // Set font color to black
                />

            </div>
          <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#333', padding: '10px', borderRadius: '5px' }}>
  {submittedTexts.map((text, index) => (
    <div key={index} style={{ backgroundColor: '#444', color: '#fff', padding: '10px', margin: '5px 0', borderRadius: '5px' }}>
      <p style={{ margin: 0 }}>{text}</p>
      {character && <p>Character: {character}</p>}

    </div>
  ))}
</div>
<input
  type="text"
  value={paneInput}
  onChange={(e) => setPaneInput(e.target.value)}
  placeholder="Enter text"
  style={{ marginBottom: '20px', backgroundColor: '#444', color: '#fff', border: '1px solid #555', borderRadius: '5px', padding: '10px' }}
/>
<button 
  onClick={handlePaneSubmit}
  style={{ backgroundColor: '#555', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px' }}
>
  Submit
</button>
 
        </div>
      )}
    </div>
    </div>
  );
};

export default Game;