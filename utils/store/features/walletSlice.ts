import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type WalletState = {
  showConnectionModal: boolean;
};

const initialState: WalletState = {
  showConnectionModal: false,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setShowConnectionModal(state, action: PayloadAction<boolean>) {
      // We can directly mutate the state,
      // The redux-toolkit will take care of the diff
      state.showConnectionModal = action.payload;
    },
  },
});

export const { setShowConnectionModal } = walletSlice.actions;
const walletReducer = walletSlice.reducer;
export default walletReducer;
