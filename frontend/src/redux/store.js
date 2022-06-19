import { configureStore } from "@reduxjs/toolkit";
import episodePlayerReducer from './episodePlayer'

export default configureStore({
  reducer: {
    episodePlayer: episodePlayerReducer,
  }
})