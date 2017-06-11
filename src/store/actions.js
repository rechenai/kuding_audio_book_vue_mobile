import * as types from './mutation-types'

export const selectPlay = function ({commit, state}, {list, index, title, img}) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_SHOWPLAYER, true)
  commit(types.SET_CURRENT_IMG, img)
  commit(types.SET_CURRENT_SONG_TITLE, title)
}

export const updateList = function ({commit, state}, {list}) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)
}

export const updateCurrentSongInfo = function ({commit, state}, {title, img}) {
  commit(types.SET_CURRENT_IMG, img)
  commit(types.SET_CURRENT_SONG_TITLE, title)
}
