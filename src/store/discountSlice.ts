import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Discount } from '../types/types';
import { handleFetchDiscounts } from '../utilities/discountService';

interface DiscountsState {
  discounts: Discount[];
  loading: boolean;
  error: string | null;
}

const initialState: DiscountsState = {
  discounts: [],
  loading: false,
  error: null,
};

export const fetchDiscounts = createAsyncThunk('discounts/fetchDiscounts', async (_, { rejectWithValue }) => {
  try {
    const response = await handleFetchDiscounts();
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const discountsSlice = createSlice({
  name: 'discounts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDiscounts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiscounts.fulfilled, (state, action) => {
        state.discounts = action.payload;
        state.loading = false;
      })
      .addCase(fetchDiscounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default discountsSlice.reducer;
