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

app.post('/updateData', async (req, res) => {
   const { regionData, regionName } = req.body;

   regionData.forEach(async (row) => {
      const { 'F.no': Fno, 'Farmer name': farmerName, Requirement, Quantity, Status, 'Ph.no': Phno } = row;

      if (Fno) {
         const updateQuery = `
            UPDATE ${regionName} 
            SET \`F.no\` = ?, \`Farmer name\` = ?, Requirement = ?, Quantity = ?, Status = ?, \`Ph.no\` = ?
            WHERE \`F.no\` = ?
         `;
         await db.query(updateQuery, [Fno, farmerName, Requirement, Quantity, Status, Phno, Fno]);
      } else {
         const insertQuery = `
            INSERT INTO ${regionName} (\`F.no\`, \`Farmer name\`, Requirement, Quantity, Status, \`Ph.no\`)
            VALUES (?, ?, ?, ?, ?, ?)
         `;
         await db.query(insertQuery, [Fno, farmerName, Requirement, Quantity, Status, Phno]);
      }
   });

   res.json({ message: 'Data updated successfully' });
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
