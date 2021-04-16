require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV, CLIENT_ORIGIN } = require("./config");
const request = require('request')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
);

app.get('/', (req, res) => {
  request(
    { url: 'https://questionnaire-148920.appspot.com/swe/data.html' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500);
      }

      res.send(body)
    }
  )
});

module.exports = app