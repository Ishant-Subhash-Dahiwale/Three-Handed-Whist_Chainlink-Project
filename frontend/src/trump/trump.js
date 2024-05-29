    // src/App.js

    import React, { useState, useEffect } from 'react';
    import Web3 from 'web3';
    import  contractABI from './vrfabi.json';
import axios from 'axios';
import { Button } from '@mui/material';

    const Trump = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [requestId, setRequestId] = useState(null);
    const [requestStatus, setRequestStatus] = useState(null);

    useEffect(() => {

        
        const initWeb3 = async () => {
            if (window.ethereum) {
            try {
                const web3Instance = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request account access
                const accounts = await web3Instance.eth.getAccounts();
                const contractAddress = '0x8aC3aE2d38C6121bD5dbbA2333f8619b722F9AF7';
                const contractInstance = new web3Instance.eth.Contract(contractABI.abi, contractAddress);
        
                setWeb3(web3Instance);
                setAccount(accounts[0]);
                setContract(contractInstance);
        
                console.log("Web3 and contract initialized successfully.");
                return { web3Instance, account: accounts[0], contractInstance };
            } catch (error) {
                console.error("User denied account access or an error occurred:", error);
            }
            } else if (window.web3) {
            const web3Instance = new Web3(window.web3.currentProvider);
            const accounts = await web3Instance.eth.getAccounts();
            const contractAddress = '0x8aC3aE2d38C6121bD5dbbA2333f8619b722F9AF7';
            const contractInstance = new web3Instance.eth.Contract(contractABI.abi, contractAddress);
        
            setWeb3(web3Instance);
            setAccount(accounts[0]);
            setContract(contractInstance);
        
            console.log("Web3 (legacy) and contract initialized successfully.");
            return { web3Instance, account: accounts[0], contractInstance };
            } else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
            console.error("Non-Ethereum browser detected. Please install MetaMask!");
            }
        };
        

        initWeb3();
    }, []);

    const requestRandomWords = async () => {
        if (contract && account) {
        try {
            const receipt = await contract.methods.requestRandomWords().send({ from: account });
            const requestId = receipt.events.RequestSent.returnValues.requestId;
            setRequestId(requestId.toString());
            console.log('Request ID:', requestId);
        } catch (error) {
            console.error('Error requesting random words:', error);
        }
        }
    };

    const getRequestStatus = async () => {
        if (contract && account ) {
        try {
            if(requestId){
            const status = await contract.methods.getRequestStatus(requestId).call();
            setRequestStatus(status);
            console.log('Request Status:', status);
            return;    
            }
            const req = await contract.methods.lastRequestId().call();
            const status = await contract.methods.getRequestStatus(req).call();

            setRequestStatus(status);
            console.log('Request Status:', status);
           await axios.get(`http://localhost:5000/trump?random=${Number(requestStatus.randomWords[0])%3}`);

        } catch (error) {
            console.error('Error getting request status:', error);
        }
        }
    };

    const withdrawLink = async () => {
        if (contract && account) {
        try {
            await contract.methods.withdrawLink().send({ from: account });
            console.log('LINK withdrawn');
        } catch (error) {
            console.error('Error withdrawing LINK:', error);
        }
        }
    };

    return (
        <div style={{
            backgroundColor: '#800000', /* Dark Red */
            color: '#fff', /* White text */
            border: '2px solid #a52a2a', /* Brownish red border */
            borderRadius: '10px',
            padding: '20px',
            width: window.innerWidth - 100,
            height: window.innerHeight - 100,
            margin: '0 auto',
            marginTop:'10px',
            textAlign: 'center',
            overflow: 'hidden',
            fontFamily: 'Georgia, serif',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            animation: 'fadeIn 1.5s ease-in-out', /* Apply fade-in animation */
            '@keyframes fadeIn': {
            from: { opacity: 0 },
            to: { opacity: 1 }
            }
        }}>
            <h1 style={{ color: '#ffd700', marginBottom: '20px' }}>Generate a trump card using Chainlink VRF Consumer</h1>
            <button style={{
            backgroundColor: '#a52a2a', /* Brownish red */
            color: '#fff', /* White text */
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            margin: '5px 0',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s ease, transform 0.3s ease', /* Add transition for hover effect */
            }} onClick={requestRandomWords}>Request Random Words</button>
                        <br></br>

            <button style={{
            backgroundColor: '#a52a2a', /* Brownish red */
            color: '#fff', /* White text */
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            margin: '5px 0',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s ease, transform 0.3s ease', /* Add transition for hover effect */
            }} onClick={()=>{getRequestStatus();
                
            }}>Get Request Status{' (GET trump card no.)'}</button>
            <br></br>
            <button style={{
            backgroundColor: '#a52a2a', /* Brownish red */
            color: '#fff', /* White text */
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            margin: '5px 0',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s ease, transform 0.3s ease', /* Add transition for hover effect */
            }} onClick={withdrawLink}>Withdraw LINK</button>
        
            {requestId && <p>Request ID: {requestId}</p>}
            {requestStatus && (
            <div>
                <p>Paid: {requestStatus.paid}</p>
                <p>Fulfilled: {requestStatus.fulfilled ? 'Yes' : 'No'}</p>
                <p>Random Words: {requestStatus.randomWords[0].toString()}</p>
                <p>Trump Card NO.: {Number(requestStatus.randomWords[0])%3}</p>
                <Button variant="contained" color="success" style={{marginTop:'20px'}} href='/game'>
GO to Game      </Button> 
            </div>
            )}
            <style>{`
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            button:hover {
                background-color: #8b0000; /* Darker red */
                transform: scale(1.05); /* Slightly enlarge */
            }
            `}</style>
        </div>
        );
    };

    export default Trump;
