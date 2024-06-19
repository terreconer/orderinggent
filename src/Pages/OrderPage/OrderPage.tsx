import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { OrderList } from "../../Templates";
import { RootState, AppDispatch } from "../../store/store";
import { fetchOrders } from "../../store/orderSlice";

export const OrderPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { orders, loading: ordersLoading, error: ordersError } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  /**
   * TODO: add loading handling functionality to enhance UX and optimize app performance
   */
  if (ordersLoading) {
    return <p>Loading...</p>
  }

  /**
   * TODO: add error handling functionality to enhance UX and optimize app performance
   */
  if (ordersError) {
    return <p>Error</p>
  }

  return (
    <>
      <OrderList listItems={orders} />
    </>
  );
};
