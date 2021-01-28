import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
  "posts",
  async (post_path) =>
    await axios
      .get(`http://localhost:8000/api/v1/${post_path}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error))
);

const postsInitialState = {
  allPosts: {
    status: "idle",
    data: {},
    error: {},
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState: postsInitialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending.type]: (state, action) => {
      state.allPosts = {
        status: "loading",
        data: {},
        error: {},
      };
    },
    [fetchPosts.fulfilled.type]: (state, action) => {
      state.allPosts = {
        status: "idle",
        data: action.payload,
        error: {},
      };
    },
    [fetchPosts.rejected.type]: (state, action) => {
      state.allPosts = {
        status: "idle",
        data: {},
        error: action.payload,
      };
    },
  },
});

const selectAllPosts = (state) => state.posts.allPosts;

export const postsReducer = postsSlice.reducer;
export const postsAction = postsSlice.actions;

export const PostsSelectors = {
  selectAllPosts,
};
