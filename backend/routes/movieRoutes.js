//Rotas para cada uma das funcionalidades em movieController

const express = require("express");
const { createMovie, getAllMovies, deleteMoviebyName, updateMoviebyName, findMovie} = require("../controllers/movieController")

const router = express.Router();

//Dependendo do comando recebido, encaminha-se para a função designada
router.post("/add", createMovie);
router.get("/", getAllMovies);
router.delete("/delete", deleteMoviebyName)
router.put("/update", updateMoviebyName)
router.get("/get", findMovie)

module.exports = router;