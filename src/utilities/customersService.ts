import axios from "axios";
import { DATA_URL } from "./constants";
import { Customer } from "../types/types";

export const handleFetchCustomers = async () => {
  const { data } = await axios.get(`${DATA_URL}/customers.json`);

  return data;
};

export const handleFetchCustomersById = async (customerId: string): Promise<Customer> => {
  const { data } = await handleFetchCustomers();
  const customer = data.find((customer: Customer) => customer.id === customerId);

  if (!customer) {
    throw new Error('Customer not found')
  }

  return customer;
};
