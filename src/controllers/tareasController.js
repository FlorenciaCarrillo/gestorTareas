const express = require("express");
const controller = express.Router();




controller.get("/tareas", (req, res) => {


    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'mydb'
    });

    connection.connect();

    connection.query('SELECT * from tarea', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.render("tareas", {
            tareas: results
        }); //traigo la vista tarea



    });

    connection.end();


})

controller.get("/tareas/nueva", (req, res) => {

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'mydb'
    });

    connection.connect();

    connection.query('SELECT * from prioridadtarea', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.render("nuevasTareas", {
            prioridades: results
        }); //le paso las prioridades a la vista nuevasTareas



    });

    connection.end();





})

controller.post("/tareas/nueva", (req, res) => {

    console.log(req.body);

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'mydb'
    });

    connection.connect();

    connection.query(`INSERT INTO tarea (nombre, descripcion, fecha, id_prioridad, id_estadoTarea) values ( '${req.body.nombre}', '${req.body.descripcion}','${req.body.fecha}',${req.body.id_prioridad},1)`, function (error, results, fields) {
        if (error) throw error;

        res.redirect("/tareas"); //redirecciona a otra ruta (si hace falta)



    });

    connection.end();



})

controller.get("/tareas/modificar/:id", (req, res) => {

    var mysql = require('mysql');
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'mydb'
    });



    pool.query(`SELECT * from tarea where (id=${req.params.id})`, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        const tarea = results[0];

        pool.query('SELECT * from prioridadtarea', function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            res.render("modificarTareas", {
                prioridades: results,
                tarea: tarea
            }); //le paso las prioridades y la tarea a la vista nuevasTareas
        });
    });



})

controller.get("/tareas/eliminar/:id", (req, res) => {

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'mydb'
    });

    connection.connect();

    connection.query(`DELETE from tarea where (id=${req.params.id})`, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.redirect("/tareas");
    });
    connection.end();
})


module.exports = controller;