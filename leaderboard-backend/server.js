const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const playerRouter = require('./routes/playerRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

mongoose.connect(process.env.DATABASE_URL).then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());


app.use('/api/v1/players', playerRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
