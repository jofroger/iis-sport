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

module.exports = db;

// Keby nefungovalo pripojenie je potrebne skusit nasledovne prikazy v MySql:
//
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
// FLUSH privileges;
//
// 'root' = user
// @'localhos' = host
// 'root' na konci = password

/*
con.query('SELECT * FROM employees', (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Db:\n');
    //console.log(rows);
    rows.forEach( (row) => {
        console.log(`${row.name} is in ${row.location}`);
      });
  });


const employee = { name: 'Winnie', location: 'Australia' };
con.query('INSERT INTO employees SET ?', employee, (err, res) => {
  if(err) throw err;

  console.log('Last insert ID:', res.insertId);
});

con.query(
    'UPDATE employees SET location = ? Where ID = ?',
    ['South Africa', 5],
    (err, result) => {
      if (err) throw err;
  
      console.log(`Changed ${result.changedRows} row(s)`);
    }
  );

  con.query(
    'DELETE FROM employees WHERE id = ?', [5], (err, result) => {
      if (err) throw err;
  
      console.log(`Deleted ${result.affectedRows} row(s)`);
    }
  );
  */