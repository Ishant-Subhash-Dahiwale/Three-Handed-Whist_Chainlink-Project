const Web3 = require('web3');
const VRFABI = require('./vrfABI.json'); // Make sure to update the path

const initWeb3 = async () => {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // Request account access if needed
    return web3;
  } else if (typeof process !== 'undefined') {
    const web3 = new Web3(Web3.givenProvider); // Use your Infura project ID or other provider
    // const web3 = new Web3(provider);
    return web3;
  } else {
    throw new Error('MetaMask or other web3 provider is not installed!');
  }
};

const main = async () => {
  try {
    const web3 = await initWeb3();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const contractAddress = '0x8aC3aE2d38C6121bD5dbbA2333f8619b722F9AF7';
    const contract = new web3.eth.Contract(VRFABI.abi, contractAddress);

    console.log('Account:', account);

    // Request random words
    const requestRandomWords = async () => {
      try {
        const receipt = await contract.methods.requestRandomWords().send({ from: account });
        const requestId = receipt.events.RequestSent.returnValues.requestId;
        console.log('Request ID:', requestId);
        return requestId;
      } catch (error) {
        console.error('Error requesting random words:', error);
      }
    };

    // Get request status
    const getRequestStatus = async (requestId) => {
      try {
        const status = await contract.methods.getRequestStatus(requestId).call();
        console.log('Request Status:', status);
        return status;
      } catch (error) {
        console.error('Error getting request status:', error);
      }
    };

    // Withdraw LINK
    const withdrawLink = async () => {
      try {
        await contract.methods.withdrawLink().send({ from: account });
        console.log('LINK withdrawn');
      } catch (error) {
        console.error('Error withdrawing LINK:', error);
      }
    };

    // Execute the functions as needed
    const requestId = await requestRandomWords();
    if (requestId) {
      let a = await getRequestStatus(requestId);
      console.log(a);
    }
    // await withdrawLink();

  } catch (error) {
    console.error('Error in main execution:', error);
  }
};

main();
