const express = require("express");
const prioridadesController = require("./controllers/prioridadesController");
const tareasController= require("./controllers/tareasController");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.set("view engine", "hbs"); //va a usar view engine
app.set("views", path.join(__dirname, "views")); //le digo a la libreria que las vistas estan guardadas en la carpeta views



app.use(prioridadesController); //middlewares hacen "algo" (funciones que se ejecutan) entre el cliente y el servidor
app.use(tareasController);

app.listen(3000, () => console.log("app escuchando en puerto 3000"));