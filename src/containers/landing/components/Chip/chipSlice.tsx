import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type ChipState = {
  chips: any[];
}

const initialState: ChipState = {
  chips: []
};

export const ChipSlice = createSlice({
  name: "chip",
  initialState,
  reducers: {
    addChip: (state, action: PayloadAction<any>) => {
      state.chips.push(action.payload);
    },
    removeChip: (state, action: PayloadAction<any>) => {
      const slugs = [...state.chips].filter(
        (x) => x.id !== action.payload.id
      );
      state.chips = slugs;
    },
    clearChip: (state, action: PayloadAction<any>) => {
      state.chips = action.payload;
    } 
  }
});

export const {
  addChip,
  removeChip,
  clearChip
} = ChipSlice.actions;

export default ChipSlice.reducer;
