import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleGetProducts } from "../utilities/productService";
import { OrderItemType, Product } from '../types/types';

interface ProductState {
  products: Product[];
  productDetails: Product[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductState = {
  products: [],
  productDetails: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await handleGetProducts();
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (items: OrderItemType[], { rejectWithValue }) => {
    try {
      const products = await handleGetProducts();

      const orderProducts = items.map((item) => {
        return products.find((product: { id: string; }) => product.id === item['product-id']);
      }).filter(Boolean) as Product[];

      return orderProducts;
    } catch (error: any) {
      rejectWithValue(error.message)
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    //Products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    //Product By Id
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.productDetails = action.payload ?? [];
    });

    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

// export const { addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
