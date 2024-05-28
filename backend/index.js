// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 5000;
// ............................
const accountSid = 'AC716ec0cc38080bab2a455e3ed34d84cf';
const authToken = '48bf581f48061b6a094ba2c26bb6101c';
const client = require('twilio')(accountSid, authToken);
// ................................
// Middleware
app.use(bodyParser.json());
app.use(cors());

// Mock card rank data
const cardRanks = {
  "2C": 2, "2D": 2, "2H": 2, "2S": 2,
  "3C": 3, "3D": 3, "3H": 3, "3S": 3,
  "4C": 4, "4D": 4, "4H": 4, "4S": 4,
  "5C": 5, "5D": 5, "5H": 5, "5S": 5,
  "6C": 6, "6D": 6, "6H": 6, "6S": 6,
  "7C": 7, "7D": 7, "7H": 7, "7S": 7,
  "8C": 8, "8D": 8, "8H": 8, "8S": 8,
  "9C": 9, "9D": 9, "9H": 9, "9S": 9,
  "TC": 10, "TD": 10, "TH": 10, "TS": 10,
  "JC": 11, "JD": 11, "JH": 11, "JS": 11,
  "QC": 12, "QD": 12, "QH": 12, "QS": 12,
  "KC": 13, "KD": 13, "KH": 13, "KS": 13,
  "AC": 14, "AD": 14, "AH": 14, "AS": 14
};

const cardComponents = [
  { name: '2C', index: 0 },
  { name: '2D', index: 1 },
  { name: '2H', index: 2 },
  { name: '2S', index: 3 },
  { name: '3C', index: 4 },
  { name: '3D', index: 5 },
  { name: '3H', index: 6 },
  { name: '3S', index: 7 },
  { name: '4C', index: 8 },
  { name: '4D', index: 9 },
  { name: '4H', index: 10 },
  { name: '4S', index: 11 },
  { name: '5C', index: 12 },
  { name: '5D', index: 13 },
  { name: '5H', index: 14 },
  { name: '5S', index: 15 },
  { name: '6C', index: 16 },
  { name: '6D', index: 17 },
  { name: '6H', index: 18 },
  { name: '6S', index: 19 },
  { name: '7C', index: 20 },
  { name: '7D', index: 21 },
  { name: '7H', index: 22 },
  { name: '7S', index: 23 },
  { name: '8C', index: 24 },
  { name: '8D', index: 25 },
  { name: '8H', index: 26 },
  { name: '8S', index: 27 },
  { name: '9C', index: 28 },
  { name: '9D', index: 29 },
  { name: '9H', index: 30 },
  { name: '9S', index: 31 },
  { name: 'AC', index: 32 },
  { name: 'AD', index: 33 },
  { name: 'AH', index: 34 },
  { name: 'AS', index: 35 },
  { name: 'JC', index: 36 },
  { name: 'JD', index: 37 },
  { name: 'JH', index: 38 },
  { name: 'JS', index: 39 },
  { name: 'KC', index: 40 },
  { name: 'KD', index: 41 },
  { name: 'KH', index: 42 },
  { name: 'KS', index: 43 },
  { name: 'QC', index: 44 },
  { name: 'QD', index: 45 },
  { name: 'QH', index: 46 },
  { name: 'QS', index: 47 },
  { name: 'TC', index: 48 },
  { name: 'TD', index: 49 },
  { name: 'TH', index: 50 },
  { name: 'TS', index: 51 },
];


const genAI = new GoogleGenerativeAI('AIzaSyCkl99N0WdJMusNL_BgZHLYkIo5IC_P2qc');

// Function to call the Generative AI model
async function getAIResponse(prompt) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const r = await model.startChat().sendMessage(prompt);
  const t = await r.response;
  return t.text();
}

// GET endpoint
app.get('/generate', async (req, res) => {
  const { query } = req;
  console.log(query.prompt);
  const ss =  query.prompt +' answer in two sentences';
  const prompt = ss.toString();

  try {
    const response = await getAIResponse(prompt);
    res.json({ response });
  } catch (error) {
    console.error('Error generating AI response:', error);
    res.status(500).send('Internal Server Error');
  }
});



let players = [];

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join-game', (playerName) => {
    if (players.length < 3) {
      players.push({ id: socket.id, name: playerName, selectedCard: null });
      io.emit('update-players', players);

      if (players.length === 3) {
        io.emit('start-game');
      }
    } else {
      socket.emit('game-full');
    }
  });

  socket.on('select-card', (cardIndex) => {
    const player = players.find(p => p.id === socket.id);
    if (player) {
      player.selectedCard = cardIndex;
      io.emit('update-players', players);

      if (players.every(p => p.selectedCard !== null)) {
        const selectedCards = players.map(p => p.selectedCard);
        const winnerId = determineWinner(selectedCards);
        io.emit('game-result', { winnerId });
        players.forEach(p => p.selectedCard = null); // Reset for a new game
      }
    }
  });

  socket.on('disconnect', () => {
    players = players.filter(p => p.id !== socket.id);
    io.emit('update-players', players);
    console.log('A user disconnected:', socket.id);
  });
});
const determineWinner = (selectedCardIndices) => {
  // Get the card names using the indices from cardComponents
  const selectedCards = selectedCardIndices.map(index => cardComponents[index].name);

  // Map the card names to their ranks
  const ranks = selectedCards.map(card => cardRanks[card]);

  // Determine the maximum rank
  const maxRank = Math.max(...ranks);

  // Find the indices of the players with the maximum rank
  const winnerIndices = ranks.reduce((acc, rank, index) => {
    if (rank === maxRank) acc.push(index);
    return acc;
  }, []);

  // Determine the winner or if it's a draw
  if (winnerIndices.length === 1) {
    return players[winnerIndices[0]].name.toString();
  } else {
    return 'draw';
  }
};

app.get('/api/send-sms', (req, res) => {
  const { body, from, to } = req.query;
  client.messages
  .create({
     body: body,
     from: from,
     to: to
   })
  .then(message => {console.log(message.sid)
    res.json({ sid: message.sid })
  }).catch(error => res.status(500).send(error));
});


// Route to handle card comparison for three players
app.post('/compare-cards', (req, res) => {
  const { player1Card, player2Card, player3Card, player1Id, player2Id, player3Id } = req.body;

  const rank1 = cardRanks[player1Card];
  const rank2 = cardRanks[player2Card];
  const rank3 = cardRanks[player3Card];

  let winnerId;
  if (rank1 > rank2 && rank1 > rank3) {
    winnerId = player1Id;
  } else if (rank2 > rank1 && rank2 > rank3) {
    winnerId = player2Id;
  } else if (rank3 > rank1 && rank3 > rank2) {
    winnerId = player3Id;
  } else {
    winnerId = 'draw';
  }

  res.json({ winnerId });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
