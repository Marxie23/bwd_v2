import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  mentors:[{}],
  video:null,
  strand:[]
};

export const authSlice = createSlice({
  name: "inputs",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setMentor: (state, action) => {
      state.mentors = action.payload.mentors;
    },
    setVideo: (state, action) => {
      state.video = action.payload.video;
    },
    setStrand: (state, action) => {
      state.strand = action.payload.strand;
    },
  },
});

export const { setMode, setLogin, setLogout, setPosts, setPost ,setMentor ,setVideo } =
  authSlice.actions;
export default authSlice.reducer;
