const path = require("path");

module.exports = (app) => {
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/assets/notes.html"));
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/assets/index.html"));
  });
};
