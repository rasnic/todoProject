const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router');

dotenv.config();

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'user'],
  })
);

app.options('*', cors());

app.use(express.json());
app.use(morgan('tiny'));
app.use(router);
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('starting on port 8080');

  app.listen(8080);
});
