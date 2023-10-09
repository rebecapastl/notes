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

app
.route("/*")
.get((req, res)  => {
  res.status(200).send("Welcome to the Notes App");
});
