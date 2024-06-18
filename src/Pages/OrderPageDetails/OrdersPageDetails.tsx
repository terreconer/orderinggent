import { useEffect, useState, useMemo } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchOrderById } from '../../store/orderSlice';
import { fetchProductById, fetchProducts } from '../../store/productsSlice';
import { List } from '../../Organisms';
import { Sidebar } from '../../Templates';
import { OrderProductItem, SidebarProductItem } from '../../Molecules';
import { Button } from '../../Atoms';
import { OrderItemType } from '../../types/types';
import './styles/orderItem.css';

export const OrderPageDetails = () => {
  const [isShown, setIsShown] = useState(false);

  const { orderId } = useParams<{ orderId: string }>();
  const dispatch: AppDispatch = useDispatch();

  const { orderDetails, loading: orderLoad, error: orderError } = useSelector((state: RootState) => state.orders);
  const { productDetails, products, loading: productLoad, error: productError } = useSelector((state: RootState) => state.products);

  const handleAddItem = () => {
    setIsShown(!isShown);
    dispatch(fetchProducts());
  };

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }
  }, [dispatch, orderId]);

  useEffect(() => {
    if (orderDetails) {
      dispatch(fetchProductById(orderDetails.items));
      dispatch(fetchProducts());
    }
  }, [dispatch, orderDetails]);

  const memoizedOrderDetails = useMemo(() => orderDetails, [orderDetails]);
  const memoizedProductDetails = useMemo(() => productDetails, [productDetails]);

  if (orderLoad || productLoad) {
    return <p>Loading...</p>
  }

  if (orderError || productError) {
    return <p>Error</p>
  }

  return (
    <>
      <div className="relative py-0 px-5 w-full h-full">
        <div className="orderPage-list flex flex-col">
          <div className="w-full bg-lime-300 p-2 mt-2">
            <Button
              title="Add"
              onClickHandler={handleAddItem}
              type="button"
              disabled={isShown}
              className='bg-lime-300 p-2 w-full h-full'
            />
          </div>
          <List direction="vertical">
            {
              (memoizedOrderDetails && memoizedOrderDetails.items.length > 0) && (
                <>
                  <div className="flex">
                    <div>{`Order ID: ${memoizedOrderDetails.id}`}</div>
                  </div>
                  <div className="w-full p-5">
                    {`Order Total Price: ${memoizedOrderDetails.total}`}
                  </div>
                  {
                    memoizedProductDetails.map(product => {
                      const productInfo = memoizedOrderDetails.items.find((item: OrderItemType) => item['product-id'] === product.id);
                      const { quantity, total } = productInfo || { quantity: '0', total: '0' };

                      return (
                        <div key={product.id} className="w-full mb-5">
                          <OrderProductItem
                            orderId={memoizedOrderDetails.id}
                            quantity={quantity}
                            total={total}
                            product={product}
                          />
                        </div>
                      )
                    })
                  }
                </>
              )
            }
          </List>
        </div>
        {
          isShown && (
            <Sidebar onClose={handleAddItem}>
              <div className="w-1/2 bg-white h-full border-2 border-black rounded-sm p-5">
                {
                  (orderDetails && products && Object.keys(products).length > 0) &&
                  products.map(product => {
                    return (
                      <div key={product.id} className="w-full">
                        <SidebarProductItem
                          product={product}
                          orderId={orderDetails.id}
                        />
                      </div>
                    );
                  })
                }
              </div>
            </Sidebar>
          )
        }
      </div>
    </>
  );
};
