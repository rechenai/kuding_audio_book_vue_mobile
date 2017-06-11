export const audio = state => state.audio

export const playList = state => state.playList

export const sequenceList = state => state.sequenceList

export const fullScreen = state => state.fullScreen

export const playing = state => state.playing

export const currentIndex = state => state.currentIndex

export const showPlayer = state => state.showPlayer

export const currentImg = state => state.currentImg

export const currentSongTitle = state => state.currentSongTitle

export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}
