import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './orderSlice';
import productsReducer from './productsSlice';
import customersReducer from './customersSlice';
import discountSlice from './discountSlice';

const store = configureStore({
  reducer: {
    orders: orderReducer,
    products: productsReducer,
    customers: customersReducer,
    discounts: discountSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
