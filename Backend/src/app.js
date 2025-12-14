const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/auth.routes');
const sweetRoutes = require('./routes/sweet.routes');

const app = express();

app.use(cors({
    origin: ['http://localhost:5173',
        'https://sugarrushshop.vercel.app'],
    credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);

app.use(errorHandler);

module.exports = app;
