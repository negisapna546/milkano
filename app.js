
require('dotenv').config()
const mysql = require('mysql');
const express = require("express");
const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.json());
const jwt = require("jsonwebtoken");
var cmsRoute = require("./routes");
var port = process.env.PORT || 3001;
// cms api routes
app.use("/app/v1/admin", cmsRoute);

// const conn = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "milkano_agro",
//   multipleStatements: true,
// });
// conn.connect((err) => {
//   if (err) throw err;
//   console.log("Mysql Connected...");
// });

// app.get("/", (req, res) => {
//   let sql = "SELECT * FROM users";
//   let query = conn.query(sql, (err, results) => {
//     if (err) throw err;
//     res.send(results);
//   });
// });


// app.post('/login', (req, res) => {
//     console.log(req.body)
//   const email = req.body.email;
//   const password = req.body.password;
//   const data = {email, password};
//   conn.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], function (err, users) {
//     if (users.length > 0) {
//         console.log(users[0].user_id)
//         const authtoken = jwt.sign(
//             { user_id: users[0].user_id, role_id: users[0].role_id, email: users[0].email, permission: users[0].permission },
//         process.env.accessTokenSecret
//           );
//    ////update token and logged in
//           const data = {
//             user_id:users[0].user_id,
//             role_id: users[0].role_id,
//             email:users[0].email,
//             permission: JSON.parse(users[0].permission),
//             token:authtoken,
//           }
//           //UPDATE USERS.
//       return res.send({
//         message: "login successfully",
//         data: data,
//       })
//     }
//     else {
//       return res.send("not found");
//     }
//   })
// })


app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
