const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const api = require('./api');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'itu-sport'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to dtb!');
  });

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(api(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

//todo https://developer.okta.com/blog/2019/08/16/angular-mysql-express
//
// ak nefunguje pripojenie na dtb
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
// FLUSH privileges;
