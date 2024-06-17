import axios from "axios";
import { DATA_URL } from "./constants";
import { Product } from "../types/types";

export const handleFetchProducts = async () => {
  const { data } = await axios.get(`${DATA_URL}/products.json`);
  return data;
};

export const handleFetchProductById = async (productId: string): Promise<Product> => {
  const { data } = await axios.get(`${DATA_URL}/products.json`);
  const product = data.find((product: Product) => product.id === productId);

  if (!product) {
    throw new Error('Product not found')
  }
  return product;
};
