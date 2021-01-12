import { configureStore } from "@reduxjs/toolkit";
import {
  userListAction,
  usersListReducer,
  UserListSelectors,
} from "./usersSlice";
import { postsAction, PostsSelectors, postsReducer } from "./postSlice";
import {
  commentsAction,
  commentsReducer,
  CommentsSelectors,
} from "./commentsSlice";

const store = configureStore({
  reducer: {
    users: usersListReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export {
  store,
  userListAction,
  UserListSelectors,
  postsAction,
  PostsSelectors,
  commentsAction,
  CommentsSelectors,
};
