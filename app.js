const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { callBack } = require('./db');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/dash', require('./routes/dash.js'));

if (process.env.NODE_ENV == 'production') {
  const path = require('path');
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));

  app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

  //   app.get('/', (_, res) => {
  //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  //   });
}

if (!process.env.PORT) process.env.PORT = 4000;
callBack(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`);
  });
});
