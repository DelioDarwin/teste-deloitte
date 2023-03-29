const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "niwrad",
  database: "deloitte",
});

app.use(express.json());
app.use(cors());  
 

app.post("/register", (req, res) => {
  const { equipamento } = req.body;
  const { target } = req.body;
  const { data } = req.body;

  let mysql = "INSERT INTO tabela ( equipamento, target, data) VALUES (?, ?, ?)";
  db.query(mysql, [equipamento, target, data], (err, result) => {
    res.send(result);
  });
});

app.post("/search", (req, res) => {
  const { equipamento } = req.body;
  const { target } = req.body;
  const { data } = req.body;

  let mysql =
    "SELECT * from tabela WHERE equipamento = ? AND target = ? AND data = ?";
  db.query(mysql, [equipamento, target, data], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.get("/getCards", (req, res) => {
  let mysql = "SELECT * FROM tabela";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { equipamento } = req.body;
  const { target } = req.body;
  const { data } = req.body;
  let mysql = "UPDATE tabela SET equipamento = ?, target = ?, data = ? WHERE id = ?";
  db.query(mysql, [equipamento, target, data, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let mysql = "DELETE FROM tabela WHERE id = ?";
  db.query(mysql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
