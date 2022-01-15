import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const pushToken = createSlice({
  name: 'pushToken',
  initialState: null,
  reducers: {
    set: (_, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const pushtTokenActions = pushToken.actions;

export default pushToken.reducer;
