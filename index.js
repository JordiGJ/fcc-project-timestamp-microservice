// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Timestamp Microservice

// params.date does not exist
app.get('/api', (req, res) => {
  const now = new Date();
  const obj = {
    unix: now.getTime(),
    utc: now.toUTCString(),
  };
  res.json(obj);
});

// params.date exists
app.get('/api/:date?', (req, res) => {
  const clientTime = req.params.date;
  const newDate1 = new Date(clientTime);
  const newDate2 = new Date(+clientTime);

  // incorrect date (new Date returns invalid date in both cases)
  if (isNaN(newDate1) === true && isNaN(newDate2) === true) {
    res.json({ error: 'Invalid Date' });
    return;
  }

  // if clientTime is not in unix format
  if (isNaN(newDate2) === true) {
    const obj = {
      unix: Math.floor(new Date(clientTime)),
      utc: new Date(clientTime).toUTCString(),
    };
    res.json(obj);
    return;
  }
  // if clientTime is in unix format
  const utc = new Date(+clientTime).toUTCString();
  const obj = {
    unix: +clientTime,
    utc: utc,
  };
  res.json(obj);
  return;
});

// listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
