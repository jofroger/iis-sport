const express = require('express')
//const bodyParser = require('body-parser')
//const cors = require('cors')

const server = express()

const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test'
});
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to dtb!');
});


/*var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
} 
server.use(cors(corsOptions))*/

/*
const UserContr = require('./uzivatel/UzivatelController')
server.use('/users', UserContr)
*/

// start server with command
// node controller.js or F5 when using visual code
server.listen(8000, () => {
    console.log('Server started!')
  })

module.exports = {
    app : server,
    dtb : db
}

/*
app.route('/api/cats').get((req, res) => {
    res.send({
    cats: [{ name: 'lilly' }, { name: 'lucy' }],
    })
})

app.route('/api/cats/:name').get((req, res) => {
    const requestedCatName = req.params['name']
    res.send({ name: requestedCatName })
})


app.use(bodyParser.json())
app.route('/api/cats').post((req, res) => {
    res.send(201, req.body)
})


app.route('/api/cats/:name').put((req, res) => {
    res.send(200, req.body)
})


app.route('/api/cats/:name').delete((req, res) => {
    res.sendStatus(204)
})
*/