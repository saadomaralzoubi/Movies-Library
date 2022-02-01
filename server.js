`use strict`;
const express = require("express");
const app = express();

const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
const APIKEY = process.env.APIKEY;

const movieData = require("./Movie Data/data.json");

app.get("/", dataHandler);
app.get("/favorite", favHandler);
app.get("/trending", trendHandler);
app.get("/searchmovie", searchHandler);
app.get("/genre", genrehHandler);
app.get("/popular", popularthHandler);

app.listen(3000, () => {
  console.log("Listen to port 3000");
});

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

function trendMovie(id, title, release_date, poster_path, overview) {
  this.id = id;
  this.title = title;
  this.release_date = release_date;
  this.poster_path = poster_path;
  this.overview = overview;
}

function trendHandler(req, res) {
  let trend = [];
  axios
    .get(`https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}`)
    .then((value) => {
      value.data.results.forEach((trender) => {
        let numberOnetrend = new trendMovie(
          trender.id,
          trender.title,
          trender.release_date,
          trender.poster_path,
          trender.overview
        );
        trend.push(numberOnetrend);
      });
      return res.status(200).json(trend);
    });
}

function searchHandler(req, res) {
  let searchQuery = req.query.search;
  let trendmovies = [];
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${searchQuery}`
    )
    .then((value) => {
      value.data.results.forEach((trender) => {
        trendmovies.push(trender);
      });
      return res.status(200).json(trendmovies);
    });
}

function genrehHandler(req, res) {
  let genrearry = [];
  axios
    .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}`)
    .then((value) => {
      value.data.genres.forEach((genre) => {
        genrearry.push(genre);
      });
      return res.status(200).json(genrearry);
    });
}
function popularthHandler(req, res) {
  axios;
  let populararry = [];
  axios
    .get(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}`)
    .then((value) => {
      value.data.results.forEach((popular) => {
        populararry.push(popular);
      });
      return res.status(200).json(populararry);
    });
}
