import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [players, setPlayers] = useState([]);
    const [name, setName] = useState('');
    const [score, setScore] = useState('');

    useEffect(() => {
        const fetchPlayers = async () => {
            const res = await axios.get('http://localhost:5000/players');
            setPlayers(res.data);
        };
        fetchPlayers();
    }, []);

    const addPlayer = async () => {
        const newPlayer = { name, score: Number(score) };
        await axios.post('http://localhost:5000/players', newPlayer);
        setPlayers((prev) => [...prev, newPlayer]);
        setName('');
        setScore('');
    };

    return (
        <div>
            <h1>Leaderboard</h1>
            <ul>
                {players.map((player) => (
                    <li key={player._id}>{player.name}: {player.score}</li>
                ))}
            </ul>
            <input 
                type="text" 
                placeholder="Player Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <input 
                type="number" 
                placeholder="Score" 
                value={score} 
                onChange={(e) => setScore(e.target.value)} 
            />
            <button onClick={addPlayer}>Add Player</button>
        </div>
    );
};

export default App;
