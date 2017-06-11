import * as types from './mutation-types'

const matutaions = {
  [types.SET_AUDIO] (state, audio) {
    state.audio = audio
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playList = list
  },
  [types.SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_SHOWPLAYER] (state, flag) {
    state.showPlayer = flag
  },
  [types.SET_CURRENT_IMG] (state, ads) {
    state.currentImg = ads
  },
  [types.SET_CURRENT_SONG_TITLE] (state, name) {
    state.currentSongTitle = name
  }
}

export default matutaions
