import express from "express";
import router from "./src/router/index.router.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import morgan from "morgan";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";

// AQUI SOLO CONFIGURACIONES DEL SERVIDOR
// ESTO ES LOGICA DE SERVIDOR

/* SERVER SETTINGS */
const server = express(); // ejecutando el modulo de express se crea un servidor con muchas mas configuraciones que el de la clase pasada con http.createServer()
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);

// TEMPLATE ENGINE
// con esto configuramos el motor de plantillas
server.engine("handlebars", engine()); // guardamos un motor en la propiedad handlebars
server.set("view engine", "handlebars"); // configurando el motor de vistas de handlebars
server.set("views", "./src/views"); //configuramos la ruta donde estan todas las plantillas


/* middlewares*/
server.use(morgan("dev"));
server.use("/assets", express.static("assets"));
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

/* ROUTERS */
server.use("/", router);
server.use(errorHandler); // maneja los errores que hayan en el codigo
server.use(pathHandler); // maneja el error de cualquier ruta que no exista
