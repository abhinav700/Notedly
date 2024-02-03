import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action) => {
      
      state.userData = action.payload;
    },

  },
});

export const {setUserState} = userSlice.actions;

export default userSlice.reducer;