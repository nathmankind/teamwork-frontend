import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchComments = createAsyncThunk(
  "comments",
  async (path_url) =>
    await axios
      .get(`http://localhost:8000/api/v1/${path_url}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      })
);

const commentInitialState = {
  allComments: {
    status: "idle",
    data: {},
    error: {},
  },
};

const commentsSlice = createSlice({
  name: "comments",
  initialState: commentInitialState,
  reducers: {},
  extraReducers: {
    [fetchComments.pending.type]: (state, action) => {
      state.allComments = {
        status: "loading",
        data: {},
        error: {},
      };
    },
    [fetchComments.fulfilled.type]: (state, action) => {
      state.allComments = {
        status: "completed",
        data: action.payload,
        error: {},
      };
    },
    [fetchComments.rejected.type]: (state, action) => {
      state.allComments = {
        status: "idle",
        data: {},
        error: action.payload,
      };
    },
  },
});

const selectAllComments = (state) => state.comments.allComments;
const selectCommentStatus = (state) => state.comments.allComments.status;

export const commentsReducer = commentsSlice.reducer;
export const commentsAction = commentsSlice.actions;

export const CommentsSelectors = {
  selectAllComments,
  selectCommentStatus,
};
