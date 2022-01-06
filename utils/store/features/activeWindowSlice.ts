import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AirdropWindow } from 'utils/airdropWindows';
import { RootState } from '../';

type ActiveWindowState = {
  totalWindows: number;
  window?: AirdropWindow;
};

const initialState: ActiveWindowState = {
  totalWindows: 0,
  window: undefined,
};

export const activeWindowSlice = createSlice({
  name: 'Active Window',
  initialState,
  reducers: {
    setActiveWindow(state, action: PayloadAction<AirdropWindow>) {
      state.window = action.payload;
    },
    setActiveWindowState(state, action: PayloadAction<ActiveWindowState>) {
      state.window = action.payload.window;
      state.totalWindows = action.payload.totalWindows;
    },
    removeActiveWindow(state) {
      state.window = undefined;
    },
  },
});

export const { setActiveWindow, setActiveWindowState, removeActiveWindow } = activeWindowSlice.actions;
export const selectActiveWindow = (state: RootState) => state.activeWindow;
const activeWindowReducer = activeWindowSlice.reducer;
export default activeWindowReducer;
