// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

// Data Helper
function dateIsValid(dateStr) {
  if (dateStr == "" || dateStr === undefined) {
    return
  }
  if (dateStr.length === 13) {
    const unixTimestamp = parseInt(dateStr);
    const checkValid = !isNaN(unixTimestamp) && isValidUnixTimestamp(unixTimestamp);
    if (checkValid) {
      return "UNIX"
    }
  }
  let date = new Date(dateStr);
  const checkValidDate = date instanceof Date && !isNaN(date);
  if (checkValidDate) {
    return "NormalDate"
  }
}

function isValidUnixTimestamp(unixTimestamp) {
  const date = new Date(unixTimestamp);
  return date instanceof Date && !isNaN(date);
}

app.get("/api/:date?", (req, res) => {
  if (!req.params.date) {
    let date = new Date();
    let UTC = date.getTime() - 20000;
    UTC = new Date(UTC);
    let UTS = UTC.toUTCString();
    let UNIX = date.getTime() - 20000;
    res.json({ unix: UNIX, utc: UTS });
  }

  else if (dateIsValid(req.params.date) === "NormalDate") {
    let UNIX = new Date(req.params.date).getTime();
    let UTC = new Date(req.params.date).toUTCString();

    res.json({ unix: UNIX, utc: UTC })
  } else if (dateIsValid(req.params.date) === "UNIX") {
    const unixTimeStamp = parseInt(req.params.date)
    let UNIX = new Date(unixTimeStamp).getTime();
    let UTC = new Date(unixTimeStamp).toUTCString();

    res.json({ unix: UNIX, utc: UTC })
  } else {
    res.json({ error: "Invalid Date" })
  }


})


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
