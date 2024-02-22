const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'detail', 
   port: 3306, 
});

db.connect();

app.get('/regions', (req, res) => {
   
   db.query('SHOW TABLES', (err, results) => {
      if (err) throw err;
      const regions = results.map(result => result.Tables_in_detail);
      res.json(regions);
   });
});

app.get('/region/:regionName', (req, res) => {
   const regionName = req.params.regionName;
   
   db.query(`SELECT * FROM ${regionName}`, (err, results) => {
      if (err) throw err;
      res.json(results);
   });
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
