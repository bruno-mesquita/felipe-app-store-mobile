import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const pushToken = createSlice({
  name: 'pushToken',
  initialState: null,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state = action.payload;
    },
  },
});

export const pushtTokenActions = pushToken.actions;

export default pushToken.reducer;
