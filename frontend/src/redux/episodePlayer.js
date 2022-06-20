import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isPlaying: false,
  episode: {},
  isLoading: false,
  duration: 0
}

export const episodePlayerSlice = createSlice({
  name: 'episodePlayer',
  initialState,
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    episodePlayRequest: (state, action) => {
      state.episode = action.payload
      state.loading = true
    },
    episodePlaying: (state, action) => {
      state.isPlaying = true
      state.episode = action.payload
    },
    episodePause: (state) => {
      state.isPlaying = false
    },
    setAudioDuration: (state, action) => {
      state.duration = action.payload
    }
  }
})

export const { episodePlayRequest, episodePlaying, episodePause, setAudioDuration } = episodePlayerSlice.actions

export default episodePlayerSlice.reducer