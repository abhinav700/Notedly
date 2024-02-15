import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface userDataState{
  userData:{
    email:string,
    username:string,
    id?:string
  }
}
const initialState :userDataState= {
  userData: {
    email:"",
    username:"",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload ;
    },

  },
});

  export const {setUserData} = userSlice.actions;

  export const selectUser = (state: RootState) => state.user
