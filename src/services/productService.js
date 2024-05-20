import { ResponseError } from "../middlewares/responseError.js";
import { productsModel } from "../models/productModel.js";
import { deleteImage } from "../utils/multer.js";

class ProductService {
  static async getAllProducts() {
    const products = productsModel.findAll();
    return products;
  }

  static async getProductById(id) {
    const product = productsModel.findByPk(id);
    if (!product) {
      throw new ResponseError(404, "product not found");
    }

    return product;
  }

  static async createProduct(product, imageUrl) {
    const image_url = `http://locaLhost:8000/public/${imageUrl}`;
    const { user_id, name, price, stock, status } = product;
    await productsModel.create({
      user_id,
      name,
      price,
      stock,
      status,
      image_url,
    });
    return product;
  }

  static async updateProduct(id, updateProduct, imageUrl) {
    try {
      console.log(updateProduct);

      const { user_id, name, price, stock, status } = updateProduct;

      // Menunggu hasil dari pencarian produk berdasarkan ID
      const product = await productsModel.findByPk(id);
      if (!product) {
        deleteImage(imageUrl);
        throw new ResponseError(404, "Product not found");
      }

      // Perbarui URL gambar jika ada gambar baru
      if (imageUrl) {
        deleteImage(product.image_url);
        product.image_url = imageUrl;
      }

      // Perbarui detail produk
      product.user_id = parseInt(user_id);
      product.name = name;
      product.price = parseInt(price);
      product.stock = parseInt(stock);
      product.status = parseInt(status);

      await product.save();

      return product;
    } catch (error) {
      console.error("Error updating product:", error.message);
      throw new ResponseError(500, error.message);
    }
  }
  static async deleteProduct(id) {
    const product = await productsModel.findByPk(id);
    if (!product) {
      throw new ResponseError(404, "Product not found");
    }
    deleteImage(product.image_url)
    await product.destroy()
    return "Product deleted"
  }
}

export default ProductService;
