const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
app.use(express.json());

function authenticateToken(req, res, next) {
  const requestheader = req.headers["authorization"];
  if (typeof requestheader !== "undefined") {
    const token = requestheader;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
      if (err) {
        res.send({ result: "invalid token" });
      } else {
        next();
      }
    });
  } else {
    return res.status(404).send("invalid token");
  }
}

/*app.post("/login", async (req, res) => {
  const user = {};
  jwt.sign(
    { user },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" },
    async (err, token) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ accToken: token });
      }
    }
  );
});

app.get("/profile", authenticateToken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
    if (err) {
      res.send({ result: "invalid token" });
    } else {
      res.send({
        message: "access granted ",
      });
    }
  });
});*/

module.exports = {
  authenticateToken,
};
