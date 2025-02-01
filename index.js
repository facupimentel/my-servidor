import express from "express";
import router from "./src/router/index.router.js";

// AQUI SOLO CONFIGURACIONES DEL SERVIDOR
// ESTO ES LOGICA DE SERVIDOR

/* SERVER SETTINGS */
const server = express();
// ejecutando el modulo de express se crea un servidor con muchas mas configuraciones que el de la clase pasada con http.createServer()

const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);

/* middlewares*/
server.use(express.static("public"))
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

/* ROUTERS */
server.use("/", router)
server.get("*", (req, res) => res.status(404).send("NOT FOUND POINT"));

