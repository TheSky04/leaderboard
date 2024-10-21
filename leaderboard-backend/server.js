// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB bağlantısı (deprecated seçenekler kaldırıldı)
mongoose.connect('mongodb://localhost:27017/leaderboard')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

// Player modelini oluştur
const PlayerSchema = new mongoose.Schema({
    name: String,
    score: Number,
});

const Player = mongoose.model('Player', PlayerSchema);

// API uç noktaları
app.get('/players', async (req, res) => {
    const players = await Player.find().sort({ score: -1 });
    res.json(players);
});

app.post('/players', async (req, res) => {
    const newPlayer = new Player(req.body);
    await newPlayer.save();
    res.status(201).json(newPlayer);
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
