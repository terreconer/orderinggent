import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { Link } from 'react-router-dom';
import { List } from "../../Organisms/List";
import { Order } from "../../types/types";
import { BASE_URL } from '../../utilities/constants';
import { fetchCustomers } from "../../store/customersSlice";

interface OrderListProps {
  listItems: Order[];
};

interface ModifiedOrderData {
  customerId: string;
  name: string;
  revenue: string;
  since: string;
  orderId: string;
}

export const OrderList = ({ listItems }: OrderListProps) => {
  const [modifiedOrderList, setModifiedOrderList] = useState<ModifiedOrderData[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const { customers, loading, error } = useSelector((state: RootState) => state.customers);
  console.log(customers, 'customers');

  useEffect(() => {
    if (!customers.length) {
      dispatch(fetchCustomers());
    }
  }, [dispatch, customers.length]);

  useEffect(() => {
    if (!loading && Object.keys(customers).length > 0) {
      const newOrderList = listItems.map((listItem) => {
        const customer = customers.find((item) => item.id === listItem['customer-id']);

        return {
          customerId: listItem['customer-id'],
          name: customer!.name,
          revenue: customer!.revenue,
          since: customer!.since,
          orderId: listItem.id,
        };
      });

      setModifiedOrderList(newOrderList);
    }
  }, [listItems, customers, loading]);

  if (loading) <div>Loading...</div>;
  if (error) <div>Error: {error}</div>;

  return (
    <>
      <List direction="vertical" className="px-5">
        {
          modifiedOrderList.map((orderItem: ModifiedOrderData) => {
            const { orderId } = orderItem;
            return (
              <li key={orderId} className="flex mb-5 justify-between items-center w-1/2">
                <div className="flex flex-col justify-between align-center border-2 w-full">
                  <div className="p-2 text-left">Order Number: {orderItem.orderId}</div>
                  <div className="p-2 text-left">Customer: {orderItem.name}</div>
                  <div className="p-2 text-left">Date: {orderItem.since}</div>
                  <div className="p-2 text-left">Revenue: {orderItem.revenue}</div>
                </div>
                <div className="flex p-2 justify-center items-center">
                  <Link className="flex text-center items-center bg-lime-300 p-2" to={`${BASE_URL}/orders/${orderId}`}>
                    <span className="align-middle	">Details</span>
                  </Link>
                </div>
              </li>
            )
          })
        }
      </List>
    </>
  );
};
