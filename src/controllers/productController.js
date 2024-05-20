import productService from "../services/productService.js";

class ProductController {
  static async getAll(req, res, next) {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json({
        status: "success",
        data: products,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      res.status(200).json({
        status: "success",
        data: product,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async create(req, res) {
    try {
      const imageUrl = req.file ? req.file.filename : null;

      const product = await productService.createProduct(req.body, imageUrl);
      res.status(201).json({
        status: "success",
        data: product,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async update(req, res, next) {
    const imageUrl = req.file ? req.file.filename : null;
    const newImagePath = imageUrl
      ? `http://localhost:8000/public/${imageUrl}`
      : null;

    try {
      const product = await productService.updateProduct(
        req.params.id,
        req.body,
        newImagePath
      );

      res.status(200).json({
        status: "success",
        data: product,
      });

    } catch (error) {
      next(error);
    }
  }

    static async delete(req, res) {
      const product = await productService.deleteProduct(req.params.id);
      if (product) {
        res.json({
          status:'success',
          message: product
        });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    }
}

export default ProductController;
