import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';

export interface AppState {
  language: string;
  // status: 'idle' | 'loading' | 'failed';
}

const initialState: AppState = {
  language: 'fa',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  }
});

export const { changeLanguage } = appSlice.actions;

export const selectLanguage = (state: RootState) => state.app.language;

export default appSlice.reducer;
