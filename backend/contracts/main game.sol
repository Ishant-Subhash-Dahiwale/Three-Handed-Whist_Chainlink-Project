// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract ThreeHandedWhist {
    address[] public players;
    uint256 public stakeAmount;
    bool public gameActive;

    mapping(address => uint256) public stakes;

    event PlayerAdded(address indexed player);
    event Staked(address indexed player, uint256 amount);
    event WinnerPaid(address indexed winner, uint256 amount);
    event GameEnded();
    event ErrorOccurred(string reason);

    constructor() {
        gameActive = false; // Game is not active until players are added
    }

    // Function to add a player
    function addPlayer(address _player) external {
        require(!gameActive, "Game is already active");
        require(_player != address(0), "Invalid address");
        require(players.length < 3, "All players are already added");

        players.push(_player);

        emit PlayerAdded(_player);

        // Start the game if all players are added
        if (players.length == 3) {
            gameActive = true;
        }
    }

    // Function for players to stake ETH
    function stake() external payable {
        require(gameActive, "Game is not active");
        require(isPlayer(msg.sender), "Not a player");
        require(msg.value > 0, "Must send ETH to stake");
        require(stakes[msg.sender] == 0, "Player has already staked");

        stakes[msg.sender] = msg.value;
        stakeAmount += msg.value;

        emit Staked(msg.sender, msg.value);
    }

    // Function to give the winnings to the winner
    function giveWinner(address payable winner) external {
        require(isPlayer(msg.sender), "Not a player");
        require(gameActive, "Game is not active");
        require(isPlayer(winner), "Not a player");

        // uint256 fee = 0.001 ether;
        uint256 totalStakes = stakeAmount;
        stakeAmount =0;

        // require(totalStakes > fee, "Not enough balance to cover fee");

        uint256 winnings = totalStakes;

        require(winnings > 0, "No winnings to distribute");

        (bool success, ) = winner.call{value: winnings}("");
        require(success, "Transfer to winner failed");

        emit WinnerPaid(winner, winnings);

        // Reset game
        removePlayers();
    }

    // Function to end the game and allow distributing winnings
    function endGame() external {
        require(isPlayer(msg.sender), "Not a player");
        gameActive = false;
        removePlayers();
        emit GameEnded();
    }

    // Function to remove players after the game is over
    function removePlayers() internal {
        for (uint i = 0; i < players.length; i++) {
            stakes[players[i]] = 0;
        }
        delete players;
        stakeAmount = 0;
        gameActive = false;
    }

    // Helper function to check if an address is a player
    function isPlayer(address _player) internal view returns (bool) {
        for (uint256 i = 0; i < players.length; i++) {
            if (players[i] == _player) {
                return true;
            }
        }
        return false;
    }

    // Function to withdraw ETH from the contract to a specified address
    function withdrawETH(address payable recipient, uint256 amount) external {
        require(isPlayer(msg.sender), "Not a player");
        require(amount <= address(this).balance, "Not enough balance");

        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Transfer failed");
    }
}
