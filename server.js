const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
//http:localhost:3000/public/notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api/notes", (req, res) => {
  const notesData = JSON.parse(fs.readFileSync("./db.json", "utf8"));
  res.json(notesData);
});

app.post("/api/notes", (req, res) => {});

app.delete("/api/notes/:id", (req, res) => {});

app.listen(PORT, () => {
  console.log("Server is listening on http//localhost:$PORT");
});
