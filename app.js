const Notes = require("./models/Notes.js");
const express = require("express");
const app = express();

const connection = require("./db/connection");

app.use(express.static("public"));
app.use(express.json());

connection.once("open", () => {
  console.log("connected to db");
  app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
  });
});

app
  .route("/notes")
  .get((req, res) => {
    connection
      .collection("notes")
      .find({})
      .limit(50)
      .toArray()
      .then((notesList) => {
        res.status(200).send(notesList);
      })
      .catch((error) => console.log(error));
  })
  .post((req, res) => {
    let newNote = new Notes(req.body);
    newNote
      .save()
      .then((noteSaved) => {
        res.status(201).send(`Note ${noteSaved.title} successfully created.`);
      })
      .catch((error) => {
        res.status(400).send(error);
        console.log(error);
      });
  })
  .put((req, res) => {
    let filter = { _id: req.body._id };
    let update = req.body;

    Notes.findOneAndUpdate(filter, update, {
      new: true
    })
      .then((updated) => {
        res.status(201).send(`Note ${updated.title} successfully updated.`);
      })
      .catch((error) => {
        res.status(400).send(error);
        console.log(error);
      });
  })
  .delete((req, res) => {
    Notes.deleteOne({ _id: req.body._id })
      .then((deleted) => {
        if (deleted.deletedCount > 0) {
          res.status(201).send("Note successfully deleted.");
        } else {
          res.status(404).send("No corresponding note found.");
        }
      })
      .catch((error) => {
        res.status(400).send(error);
        console.log(error);
      });
  });

app.route("/*").get((req, res) => {
  res.status(200).send("Welcome to the Notes App!");
});
