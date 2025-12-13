const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const healthRoutes = require('./routes/health.routes');

const app = express();

app.use(express.json());

app.use('/health', healthRoutes);

app.use(errorHandler);

module.exports = app;
