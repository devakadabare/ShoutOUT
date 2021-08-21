const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const path = require('path');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

//connect(app); // attach the routes

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(cookieParser());

app.use('/', require(path.join(__dirname, 'src/api/routes')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, x-auth, vendor_id, Content-Type, Accept");
  const err = new Error(`${req.method} ${req.url} Not Found`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(
    `Express Server started on Port ${app.get(
      'port'
    )} | Environment : ${app.get('env')}`
  );
});
