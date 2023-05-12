import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/products.slice";
import isLoadingSlice from "./slices/isLoading.slice";

export default configureStore({
  reducer: {
    products: productSlice,
    isLoading: isLoadingSlice,
  },
});
