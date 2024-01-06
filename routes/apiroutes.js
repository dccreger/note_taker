const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    const notes = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8")
    );
    res.json(notes);
  });

  app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    const notes = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8")
    );

    newNote.id = uuidv4();

    notes.push(newNote);

    fs.writeFileSync(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(notes)
    );

    res.json(newNote);
  });
};
