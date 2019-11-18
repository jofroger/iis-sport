var express = require('express');
const server = require('../server')
const bodyParser = require('body-parser')
const User = require('./Uzivatel')
const router = express.Router();

router.use(bodyParser.json())

router.get('/', (req, res) => {
    User.getUsers( (err, rows) => {
        if (err) res.status(400).json(err);
        else res.json(rows);
    })
})

module.exports = router;