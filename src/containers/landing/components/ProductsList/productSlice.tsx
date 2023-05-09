import { ProductType } from "../../../../models/product.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface productsListState {
  products: Array<ProductType>;
  loading: boolean;
  error: any;
}

const initialState: productsListState = {
  loading: false,
  products: [],
  error: null,
};

export const fetchProductsListAsync = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response: any = await fetch('https://fakestoreapi.com/products')
    const data = await response.json();
    return data;
  }
);

export const productListSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsListAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsListAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsListAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = productListSlice.actions;

export default productListSlice.reducer;
