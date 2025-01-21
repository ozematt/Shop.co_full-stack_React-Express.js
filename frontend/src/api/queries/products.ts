import {
  type ProductsFetchedData,
  productsFetchedDataSchema,
} from "../../lib/types";
import { PRODUCTS } from "../constants";

const fetchProducts = async () => {
  try {
    const response = await fetch(
      `${PRODUCTS}?limit=0&&select=id,title,price,rating,category,images,thumbnail,discountPercentage,weight,stock,dimensions,warrantyInformation,shippingInformation,reviews,brand,description,`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const products: unknown = await response.json();
    const validateProducts = productsFetchedDataSchema.safeParse(products);

    if (!validateProducts.success) {
      console.error("Validation error:", validateProducts.error);
      throw new Error("Validation failed: " + validateProducts.error);
    }
    const validProducts: ProductsFetchedData = validateProducts.data;
    return validProducts;
  } catch (error) {
    console.error("There has been a problem with fetch", error);
    throw error;
  }
};

export default fetchProducts;
