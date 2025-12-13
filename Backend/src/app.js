const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const healthRoutes = require('./routes/health.routes');
const authRoutes = require('./routes/auth.routes');
const sweetRoutes = require('./routes/sweet.routes');

const app = express();

app.use(express.json());

app.use('/health', healthRoutes);

app.use(errorHandler);

app.use('/api/auth', authRoutes);

app.use('/api/sweets', sweetRoutes);

module.exports = app;
