import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Sounds {
  volume: number;
}

const initialState: Sounds = {
  volume: 0.3,
};

export const soundsSlice = createSlice({
  name: "sounds",
  initialState,
  reducers: {
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
  },
});

export const { setVolume } = soundsSlice.actions;

export default soundsSlice.reducer;
