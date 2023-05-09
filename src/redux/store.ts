import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import appReducer from "../app/appSlice";
import userReducer from "../containers/landing/components/UsersList/userSlice";
import productReducer from "../containers/landing/components/ProductsList/productSlice";
import chipReducer from "../containers/landing/components/Chip/chipSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    product: productReducer,
    chip: chipReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
