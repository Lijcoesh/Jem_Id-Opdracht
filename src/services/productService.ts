import axios from "axios";
import { Product } from "../types/Product";

const API_URL = "https://jemid-warmupapi.azurewebsites.net/api/products";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}`);
    console.log("API Response:", response.data);

    if (!Array.isArray(response.data)) {
      if (Array.isArray(response.data.products)) {
        return response.data.products;
      }
      if (response.data && typeof response.data === "object") {
        return Object.values(response.data).filter(
          (item) => item && typeof item === "object"
        ) as Product[];
      }
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
