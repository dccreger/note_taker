const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);

app.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;

  const notes = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./db/db.json"), "utf8")
  );

  const index = notes.findIndex((note) => note.id === noteId);

  if (index !== -1) {
    notes.splice(index, 1);

    fs.writeFileSync(
      path.join(__dirname, "./db/db.json"),
      JSON.stringify(notes)
    );

    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Note not found" });
  }
});
app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
