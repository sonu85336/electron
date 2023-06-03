const express = require("express");
const app = express();
const cors = require("cors");

const sqlite3 = require("sqlite3").verbose();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-control-Allow-Origin", "*");
  next();
});
app.use(express.json({ limit: "10mb" }));
let db = new sqlite3.Database("newCredentials.db", (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("Connected to the access database");
});

app.post("/validatePasswords", (req, res) => {
  const { username, password } = req.body;
  db.all(
    `SELECT * FROM credentials WHERE  username = '${username}' and password = '${password}'`,
    (err, rows) => {
      if (err) {
        throw err;
      }
      if (rows.length >=0) {
        res.send({ validation: true });
        console.log('validation complete')
      } else {
        res.send({ validation: false });
        console.log('validation uncomplete')
      }
    }
  );
});

// app.post("/validatePasswords", cors(), (req, res) => {
//   const { username, password } = req.body;
//   db.all(
//     `SELECT * FROM credentials WHERE  username = '${username}' and password = '${password}'`,
//     (err, rows) => {
//       if (err) {
//         throw err;
//       }
//       if (rows.length >=0) {
//         res.send({ validation: true });
//       } else {
//         res.send({ validation: false });
//       }
//     }
//   );
// });

app.post("/Validateregistration",(req, res) => {
  const { username, password, phone, prefix, email } = req.body;

  // db.all(
  //   `INSERT INTO credentials (username,password,phone,prefix,email) VALUES(${username},${password},${phone},${prefix},${email})`,
  db.all(
    ` INSERT INTO credentials  VALUES('${username}','${password}','${phone}','${prefix}','${email}')`,
    (err, rows) => {
      if (err) {
        throw err;
      }
      if (rows.length >=0) {
        res.send({ validation: true });
      } else {
        res.send({ validation: false });
      }
    }
  );
});

app.listen(3001, () => console.log("Listening at port 3001"));
