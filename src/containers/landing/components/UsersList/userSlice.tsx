import { UserType } from "../../../../models/user.model";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UsersListState {
  users: Array<UserType>;
  loading: boolean;
  error: any;
}

const initialState: UsersListState = {
  loading: false,
  users: [],
  error: null,
};

export const fetchUsersListAsync = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response: any = await fetch('https://fakestoreapi.com/users')
    const data = await response.json();
    return data;
  }
);

export const userListSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersListAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsersListAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersListAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = userListSlice.actions;

export default userListSlice.reducer;
