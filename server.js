const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyparser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({ extended : true} ));

app.use(session({
  secret: 'ab',
  resave: false,
  saveUninitialized: true
}));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.get('/login', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


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

// connection.query('select * from register_data', (err, results) => {
//   if(err) throw err;
//   console.log(results);
// });

app.post("/register", async (req, res) => {
  try {
    const {email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO register_data(user_email, user_password) VALUES (?, ?)";
    connection.query(query, [email, hashedPassword], (err, results) => {
      if(err) {
        console.error(err);
        return res.status(500).send("error registration user");
      }
      else {
        console.log("successful registration");
        return res.send("Success");
      }
    });
  }
  catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }
});

app.post("/login", async (req, res) => {
  const {email, password} = req.body;
  const query = "SELECT user_id, user_email, user_password FROM register_data where user_email = ?";
  connection.query(query, [email], async (err, result) => {
    if(err) {
      console.error(err);
      return res.status(500).send("server error");
    }
    else {
      if(result.length === 0) {
        return res.status(401).send("user doesn't exist");
      }
      const user = result[0];
      console.log(user.user_id);
      console.log(user.user_email);
      const match = await bcrypt.compare(password, user.user_password);
      if(!match) {
        return res.status(401).send("invalid password");
      }

      req.session.user = {
        id: user.user_id,
        email: user.user_email
      };
      res.send("success");
    }
  });
})
