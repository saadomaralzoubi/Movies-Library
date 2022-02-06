`use strict`;
const express = require("express");
const app = express();

const axios = require("axios");
const dotenv = require("dotenv");
const pg = require("pg");

dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

console.log(DATABASE_URL);

const APIKEY = process.env.APIKEY;
app.use(express.json());

const movieData = require("./Movie Data/data.json");

app.get("/", dataHandler);
app.get("/favorite", favHandler);
app.get("/trending", trendHandler);
app.get("/searchmovie", searchHandler);
app.get("/genre", genrehHandler);
app.get("/popular", popularthHandler);
app.post("/addMovie", addHandler);
app.get("/getMovies", getHandler);

app.get("/getMovies/:id", getIdHandler);
app.put("/UPDATE/:id", updateHandler);
app.delete("/DELETE/:id", deleteHandler);

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

function addHandler(req, res) {
  let movie = req.body;
  const sql = `INSERT INTO movielist(title,release_date,poster_path,overview,comment) VALUES($1, $2, $3, $4, $5) RETURNING * ;`;
  let values = [
    movie.title,
    movie.release_date,
    movie.poster_path,
    movie.overview,
    movie.comment,
  ];
  client.query(sql, values).then((data) => {
    return res.status(201).json(data.rows);
  });
}

function getHandler(req, res) {
  const sql = `SELECT * FROM movielist`;
  client.query(sql).then((data) => {
    return res.status(200).json(data.rows);
  });
}

function getIdHandler(req, res) {
  let id = req.params.id;
  const sql = `SELECT * FROM movielist WHERE id=${id}`;
  client.query(sql).then((data) => {
    return res.status(200).json(data.rows);
  });
}

function updateHandler(req, res) {
  let id = req.params.id;
  const movie = req.body;

  const sql = `UPDATE movielist SET comment=$1 WHERE id=${id} RETURNING *;`;
  const values = [movie.comment];

  client.query(sql, values).then((data) => {
    return res.status(200).json(data.rows);
  });
}

function deleteHandler(req, res) {
  const id = req.params.id;

  const sql = `DELETE FROM movielist WHERE id=${id};`;

  client.query(sql).then(() => {
    return res.status(204).json([]);
  });
}

client.connect().then(() => {
  app.listen(3000, () => {
    console.log("Listen to port 3000");
  });
});
