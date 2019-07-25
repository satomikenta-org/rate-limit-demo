const express = require('express');
const slowDown = require("express-slow-down");

const app = express();

app.enable("trust proxy"); 
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 5, // allow 10 requests per 15 minutes, then...
  delayMs: 500, // begin adding 500ms of delay per request above 100:
  maxDelayMs: 20000,
});


app.get('/', speedLimiter, (req, res) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log("req.headers ===============", req.headers);
  console.log("req.connection ===============", req.connection)
  res.send(ip);
})

app.listen(3000, () => console.log("SERVER 3000"));