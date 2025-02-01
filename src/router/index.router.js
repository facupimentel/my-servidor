import { Router } from "express";
import apiRouter from "./api/index.api.js";

// ESTO ES LOGICA DE ENRUTAMIENTO

const router = Router();
router.use("/api", apiRouter);
router.get("/api/welcome", (req, res) => {
  //   console.log(req.query);
  const { name, age } = req.query;
  const message = `hola ${name || "tú"}! Tienes ${age || "tantos"} años`;
  return res.status(200).send(message);
});

const indexPoint = "/";
const indexCb = (req, res) => res.status(200).send("welcome to my commerce");
router.get(indexPoint, indexCb);

const apiPoint = "/api";
const apiCb = (req, res) => res.status(200).send("welcome to my api");
router.get(apiPoint, apiCb);


export default router;
