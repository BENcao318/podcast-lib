import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface EpisodePlayerInitialState {
  isPlaying: boolean
  episode: object
  isLoading: boolean
  duration: number
}

const initialState: EpisodePlayerInitialState = {
  isPlaying: false,
  episode: {},
  isLoading: false,
  duration: 0,
}

export const episodePlayerSlice = createSlice({
  name: 'episodePlayer',
  initialState,
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    episodePlayRequest: (state, action: PayloadAction<object>) => {
      state.episode = action.payload
      state.isLoading = true
    },
    episodePlaying: (state) => {
      state.isPlaying = true
      state.isLoading = false
    },
    episodePause: (state) => {
      state.isPlaying = false
    },
    episodeLoading: (state) => {
      state.isLoading = true
    },
    setPlayingEpisode: (state, action: PayloadAction<object>) => {
      state.episode = action.payload
    },
    setAudioDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload
    },
  },
})

export const {
  episodePlayRequest,
  episodePlaying,
  episodePause,
  setAudioDuration,
  episodeLoading,
  setPlayingEpisode,
} = episodePlayerSlice.actions

export default episodePlayerSlice.reducer
