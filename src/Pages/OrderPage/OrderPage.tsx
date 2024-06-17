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

  if (ordersLoading) {
    return <p>Loading...</p>
  }

  if (ordersError) {
    return <p>Error</p>
  }

  return (
    <>
      <OrderList listItems={orders} />
    </>
  );
};
