import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users: [],
  loading: false,
  error: false,
  user: {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsersStart: (state) => {
      state.loading = true;
    },
    getUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    getUsersFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    getUserStart: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    getUsersFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    deleteUser: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.users = JSON.parse(action.payload);
    },
    deleteUserFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    addUser: (state) => {
      state.loading = true;
    },
    addUserSuccess: (state, action) => {
      state.loading = false;
      state.users = JSON.parse(action.payload);
    },
    addUserFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    updateUser: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.users = JSON.parse(action.payload);
    },
    updateUserFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

const userReducer = userSlice.reducer;
export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,
  addUser,
  addUserSuccess,
  addUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
} = userSlice.actions;
export default userReducer;
