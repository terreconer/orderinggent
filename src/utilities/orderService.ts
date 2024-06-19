import axios from "axios";
import { Order } from "../types/types";
import { DATA_URL } from "./constants";

export const handleGetOrders = async () => {
  /**
   * 1) all orders were moved into single file to ease access to them
   * 2) to request data from each separate file in oridignal version of fake DB,
   *    there is required to have access to file system which requires usage of server:
   *    - to scan dir for all order files
   *    - form array with file names
   *    - request data from each file existing in array through loop
   *    - form and return new array of order objects
   *    - manipulate new array
   */
  const { data } = await axios.get(`${DATA_URL}/orders.json`);

  return data;
};

export const handlePostOrder = async (data: Order) => {
  const { id } = data;
  /**
   * due to original structure of order "DB" real POST request will be looking like this
   */
  axios.post(`${DATA_URL}/orders${id}.json`, data).then((res) => {
    console.log(res.status, res.data);
  });
};

export const handleGetOrderById = async (orderId: string): Promise<Order> => {
  /**
   * further code represents approach to get particular order from json file contains all existing orders
   */
  const response = await axios.get(`${DATA_URL}/orders.json`);
  const resultOrder = response.data.find((item: Order) => item.id === orderId);

  if (response.statusText !== 'OK') {
    throw new Error('Some error');
  }

  return resultOrder;
};
