// Sets up the configuration
require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Lead} = require('./models/lead');
const {allowOriginWithAuth} = require('./middleware/middleware')
const app = express();
const port = process.env.PORT;

// Middleware for allowing origins [front-end apps]
app.use(allowOriginWithAuth);
// Express middleware to convert request body to json
app.use(bodyParser.json());

// POST /leads to endpoint - Used to add a lead to the database
app.post('/leads', (req, res) => {
  var lead = new Lead({
    email: req.body.email
  });
  lead.save().then((lead) => {
    console.log('Success! Lead received on server')
    console.log('Lead:', lead);
    res.send({
      message: "success",
      lead
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started listening on port ${port}`);
})

module.exports = {app}
