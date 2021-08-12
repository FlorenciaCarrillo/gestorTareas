const express = require("express");
const controller = express.Router();
const path = require("path"); //libreria para crear las rutas correctamente


//request: representa la llamada del cliente http
//response: objeto que permite crear respuestas para el cliente
controller.get("/", (request, response) => {
    const dato= {saludo: "hola"};
    response.render("index.hbs", dato);







})

controller.get("/prioridades", (req, res) => {




})

module.exports = controller;