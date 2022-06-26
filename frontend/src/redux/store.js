import { configureStore } from "@reduxjs/toolkit";
import episodePlayerReducer from './episodePlayer'
import subscriptionReducer from './subscription'
import userReducer from './user'

export default configureStore({
  reducer: {
    episodePlayer: episodePlayerReducer,
    user: userReducer,
    subscription: subscriptionReducer
  }
})