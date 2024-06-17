import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleFetchCustomers } from "../utilities/customersService";
import { Customer } from "../types/types";

interface CustomersState {
  customers: Customer[];
  customerDetails: Customer[];
  loading: boolean;
  error: string | null;
};

const initialState: CustomersState = {
  customers: [],
  customerDetails: [],
  loading: false,
  error: null,
};

export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await handleFetchCustomers();

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCustomerById = createAsyncThunk(
  'product/fetchProductById',
  async (customerId: string, { rejectWithValue }) => {
    try {
      const customers = await handleFetchCustomers();
      const currentCustomer = customers.find((customer: Customer) => {
        return customer.id === customerId;
      });

      return currentCustomer;
    } catch (error: any) {
      rejectWithValue(error.message)
    }
  }
);

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    //Customers
    builder.addCase(fetchCustomers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.customers = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //Customer By Id
    builder.addCase(fetchCustomerById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchCustomerById.fulfilled, (state, action) => {
      state.loading = false;
      state.customerDetails = action.payload ?? [];
    });

    builder.addCase(fetchCustomerById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default customersSlice.reducer;
