import _ from 'lodash';
import { handleActions } from 'redux-actions';
import { ActionTypes } from '../constants/ActionTypes';

const initialMpdStatus = {
    consume: false,
    playlistlength: 0,
    random: false,
    repeat: false,
    single: false,
    song: -1,
    songid: -1,
    state: "initial",
    volume: -1,
    time: []
}
const mpdStatus = handleActions({
  [ActionTypes.FETCHED_STATUS]: (state, action) => (_.assign({}, state, {
    consume: action.payload.consume,
    playlistlength: action.payload.playlistlength,
    random: action.payload.random,
    repeat: action.payload.repeat,
    single: action.payload.single,
    song: action.payload.song,
    songid: action.payload.songid,
    state: action.payload.state,
    volume: action.payload.volume,
    time: action.payload.time
  })),
}, initialMpdStatus);


export default mpdStatus;

