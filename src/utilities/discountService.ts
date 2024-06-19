import axios from "axios";
import { DATA_URL } from "./constants";

export const handleFetchDiscounts = async () => {
  const { data } = await axios.get(`${DATA_URL}/discounts.json`);
  return data;
};
