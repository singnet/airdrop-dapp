import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ScrollSectionState = {
  section: string | null;
};

const initialState: ScrollSectionState = {
  section: null,
};

export const scrollSectionSlice = createSlice({
  name: 'scrollSection',
  initialState,
  reducers: {
    setScrollSection(state, action: PayloadAction<any>) {
      state.section = action.payload;
    },
  },
});

export const { setScrollSection } = scrollSectionSlice.actions;
const scrollSectionSliceReducer = scrollSectionSlice.reducer;
export default scrollSectionSliceReducer;

export const selectSection = (state) => state;
