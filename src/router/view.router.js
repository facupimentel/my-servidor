import { Router } from "express";
import productsManager from "../data/fs/products.fs.js";

const viewRouter = Router();

viewRouter.get("/", (req, res, next) => {
  try {
    const data = {
        title: "Home"
    }
    return res.render("index", data);
  } catch (error) {
    next();
  }
});

viewRouter.get("/product/:pid", async(req,res,next)=>{
    try {
        const all = await productsManager.readAll()
        const data = {
            title: "Product",
            products: all[3]
        }

        res.status(200).render("product", data)
    } catch (error) {
        next()
    }
})


viewRouter.get("/carts", (req,res,next)=>{
    try {
        const data = {
            title: "Carts"
        }
        res.status(200).render("carts", data)
    } catch (error) {
        next()
    }
})

viewRouter.get("/profile/:uid", (req,res,next)=>{
    try {
        const data = {
            title: "Profile"
        }
        res.status(200).render("profile", data)
    } catch (error) {
        next()
    }
})
export default viewRouter;
