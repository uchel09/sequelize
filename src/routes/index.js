
import { productRouter } from "./productRoute.js";

const allRoutes = (app) => {

  app.use("/api/products", productRouter);
};

export default allRoutes;
