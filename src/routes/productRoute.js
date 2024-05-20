import express from "express";
import ProductController from "../controllers/productController.js";
import { upload } from "../utils/multer.js";

export const productRouter = express.Router();

productRouter.post("/", upload.single("image"), ProductController.create);
productRouter.get("/", ProductController.getAll);
productRouter.get("/:id", ProductController.getById);
productRouter.put("/:id", upload.single("image"), ProductController.update);
productRouter.delete("/:id", ProductController.delete);
