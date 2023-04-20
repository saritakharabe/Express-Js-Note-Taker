const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

//loading and routing path index.html
app.get("/", (res, req) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//loading and routing path notes.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    let notes = JSON.parse(data);
    res.json(notes);
  });
});

//post request for adding notes
app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
    };
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(notes, null, "\t"),
          (error, data) =>
            error
              ? console.error(error)
              : console.info("Notes updates Successfully!")
        );
      }
    });
    const response = {
      status: "success",
      body: newNote,
    };
    res.json(response);
  } else {
    res.json(" post feedback error");
  }
});

//listen PORT
app.listen(PORT, () => {
  console.info(`Listening port of the app is http://localhost:${PORT}`);
});
