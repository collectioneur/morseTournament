const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const mysql = require('mysql2');

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "GoldEgor1512@",
  database: "morseTournament"
});

connection.connect(function(err)  {
  if(err) throw err;
  console.log("Connected!");
});

connection.query('select * from register_data', (err, results) => {
  if(err) throw err;
  console.log(results);
});
