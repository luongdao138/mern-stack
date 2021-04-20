const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.on('open', () => console.log('database connected successfully!'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Allow-Control-Origin', '*');
  res.header(
    'Access-Allow-Control-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Allow-Control-Method', '*');
  next();
});

// load all routes
const authRouter = require('./routes/auth');

// routes middlewares
app.use('/api/v1/auth', authRouter);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
