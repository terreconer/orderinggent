import axios from "axios";
import { Order } from "../types/types";
import { DATA_URL } from "./constants";

export const handleFetchOrders = async () => {
  const { data } = await axios.get(`${DATA_URL}/orders.json`);
  return data;
};

export const handleFetchOrderById = async (orderId: string): Promise<Order> => {
  const response = await axios.get(`${DATA_URL}/orders.json`);
  const resultOrder = response.data.find((item: Order) => item.id === orderId);

  if (response.statusText !== 'OK') {
    throw new Error('Some error');
  }

  return resultOrder;
};
