import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(7 * 24 * 60 * 60); 

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/players')
      .then(response => {
        setPlayers(response.data.data.players || []);
      })
      .catch(error => console.error(error));
  }, []);

 
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft > 0 ? prevTimeLeft - 1 : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secs = seconds % 60;
    return `${days}d : ${hours}h : ${minutes}m : ${secs}s`;
  };

  // Tablo sütunları
  const columns = [
    { field: 'country', headerName: 'Country', width: 150 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'rank', headerName: 'Rank', type: 'number', width: 100 },
    { field: 'money', headerName: 'Money', type: 'number', width: 150 },
    {
      field: 'dailyDiff',
      headerName: 'Daily Diff',
      width: 150,
      renderCell: (params) => (
        <span style={{ color: getDailyDiffColor(params.value) }}>
          {params.value}
        </span>
      ),
    },
  ];

  const getDailyDiffColor = (diff) => {
    if (diff > 0) return 'green';
    if (diff === 0) return 'yellow';
    return 'red';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Leaderboard
      </Typography>
      <Typography variant="h6" gutterBottom>
        Time left for weekly reset: {formatTime(timeLeft)}
      </Typography>

      <Box sx={{ height: 400, width: '50%' }}>
        <DataGrid
          rows={players}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.id}
        />
      </Box>
    </div>
  );
};

export default Leaderboard;
