import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { handleGetOrderById, handleGetOrders } from "../utilities/orderService";
import { Order, Product, Discount } from "../types/types";

interface OrderState {
  orders: Order[];
  orderDetails: Order | null;
  loading: boolean;
  error: string | null;
};

const initialState: OrderState = {
  orders: [],
  orderDetails: null,
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await handleGetOrders();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data)
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId: string, { rejectWithValue }) => {
      try {
        const response = await handleGetOrderById(orderId);
        return response;
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
  }
);

const applyDiscounts = (order: Order, discounts: Discount[]) => {
  const updatedOrders = order.items.map((item) => {
    const discountedProduct = discounts.find((discount) => item['product-id'] === discount.productId);
    /**
     * TODO: add functionality based on rules discounts apply to each matching product
     * calculated new `item.total` value for each matching product
     * update `order.total` value
    */
    console.log(discountedProduct);
    return [];
  });
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addProductDetail: (state, action: PayloadAction<{ orderId: string, product: Product}>) => {
      if (!state.orderDetails) return;
      const { product } = action.payload;
      const existingItem = state.orderDetails.items.find(item => item['product-id'] === product.id);

      if (existingItem) {
        existingItem.quantity = (parseInt(existingItem.quantity) + 1).toString();
        existingItem.total = (parseFloat(existingItem.total) + parseFloat(product.price)).toFixed(2);
      } else {
        state.orderDetails.items.push({
          'product-id': product.id,
          quantity: '1',
          'unit-price': product.price,
          total: product.price,
        });
      }
      state.orderDetails.total = state.orderDetails.items.reduce((acc, item) => acc + parseFloat(item.total), 0).toFixed(2);
    },
    removeProductDetail: (state, action: PayloadAction<{ orderId: string, product: Product }>) => {
      if (!state.orderDetails) return;

      const { product } = action.payload;
      const existingItemIndex = state.orderDetails.items.findIndex(item => item['product-id'] === product.id);
      const existingItem = state.orderDetails.items[existingItemIndex];

      if (existingItem && existingItem.quantity && parseInt(existingItem.quantity) >= 0) {
        const newQuantity = parseInt(existingItem.quantity) - 1;
        if (newQuantity > 0) {
          existingItem.quantity = newQuantity.toString();
          existingItem.total = (parseFloat(existingItem.total) - parseFloat(product.price)).toFixed(2);
        } else {
          state.orderDetails.items.splice(existingItemIndex, 1);
        }
      }

      state.orderDetails.total = state.orderDetails.items.reduce((acc, item) => acc + parseFloat(item.total), 0).toFixed(2);
    },
  },
  extraReducers(builder) {
    //Orders
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //Order By Id
    builder.addCase(fetchOrderById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchOrderById.fulfilled, (state, action) => {
        state.orderDetails = action.payload;
        state.loading = false;
    });
    
    builder.addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
    });
  },
});

export const { addProductDetail, removeProductDetail } = orderSlice.actions;
export default orderSlice.reducer;
