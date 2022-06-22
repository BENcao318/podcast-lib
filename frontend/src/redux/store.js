import { configureStore } from "@reduxjs/toolkit";
import episodePlayerReducer from './episodePlayer'
import userReducer from './user'

export default configureStore({
  reducer: {
    episodePlayer: episodePlayerReducer,
    user: userReducer
  }
})