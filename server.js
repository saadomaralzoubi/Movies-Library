`use strict`;
const express = require("express");
const app = express();

const movieData = require("./Movie Data/data.json");

app.get("/", dataHandler);
app.get("/favorite", favHandler);

function movie(title, poster_path, overview) {
  this.title = title;
  this.poster_path = poster_path;
  this.overview = overview;
}

function dataHandler(req, res) {
  let movieOne = new movie(
    movieData.title,
    movieData.poster_path,
    movieData.overview
  );
  return res.status(200).json(movieOne);
}

function favHandler(req, res) {
  return res.status(200).send("Welcome to Favorite Page");
}

app.use(function (req, res) {
  res.status(404).send("page not found error");
});

app.use(function (err, req) {
  res.status(500).send("Sorry, something went wrong");
});

app.listen(3000, () => {
  console.log("Listen to port 3000");
});
