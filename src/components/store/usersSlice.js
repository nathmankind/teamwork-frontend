import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users", (api_path) =>
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/auth/${api_path}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error))
);

const usersInitialState = {
  usersList: {
    status: "idle",
    data: {},
    error: {},
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending.type]: (state, action) => {
      state.usersList = {
        status: "loading",
        data: {},
        error: {},
      };
    },
    [fetchUsers.fulfilled.type]: (state, action) => {
      state.usersList = {
        status: "idle",
        data: action.payload,
        error: {},
      };
    },
    [fetchUsers.rejected.type]: (state, action) => {
      state.usersList = {
        status: "idle",
        data: {},
        error: action.payload,
      };
    },
  },
});

const selectAllUsers = (state) => state.users.usersList;

export const usersListReducer = usersSlice.reducer;
export const userListAction = usersSlice.actions;

export const UserListSelectors = {
  selectAllUsers,
};
