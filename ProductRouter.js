import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const pm = new ProductManager("./src/data/products.json");

// GET /
router.get("/", async (req, res) => {
    const products = await pm.getProducts();
    res.json(products);
});

// GET /:pid
router.get("/:pid", async (req, res) => {
    const product = await pm.getProductById(req.params.pid);
    product ? res.json(product) : res.status(404).send("Producto no encontrado");
});

// POST /
router.post("/", async (req, res) => {
    const newProduct = await pm.addProduct(req.body);
    res.status(201).json(newProduct);
});

// PUT /:pid
router.put("/:pid", async (req, res) => {
    const updated = await pm.updateProduct(req.params.pid, req.body);
    updated ? res.json(updated) : res.status(404).send("Producto no encontrado");
});

// DELETE /:pid
router.delete("/:pid", async (req, res) => {
    const deleted = await pm.deleteProduct(req.params.pid);
    deleted ? res.send("Producto eliminado") : res.status(404).send("No existe");
});

export default router;
