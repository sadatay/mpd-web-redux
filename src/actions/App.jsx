import axios from 'axios';

import { createAction } from 'redux-actions';

import { ActionTypes } from '../constants/ActionTypes';

const createFetchedStatus = createAction(ActionTypes.FETCHED_STATUS);
const createFetchedQueue = createAction(ActionTypes.FETCHED_QUEUE);

export function fetchStatus() {
  const url = 'http://192.168.1.68:4567/status/';
  return (dispatch) => {
    axios.get(url).then((resp) => {
      dispatch(createFetchedStatus({
        consume: resp.data.consume,
        playlistlength: resp.data.playlistlength,
        random: resp.data.random,
        repeat: resp.data.repeat,
        single: resp.data.single,
        song: resp.data.song,
        songid: resp.data.songid,
        state: resp.data.state,
        volume: resp.data.volume,
        time: resp.data.time
      }));
    }).catch((err) => {
      console.log("failed to fetch status");
    });
  };
}

export function fetchQueue() {
  const url = 'http://192.168.1.68:4567/queue/';
  return (dispatch) => {
    axios.get(url).then((resp) => {
      dispatch(createFetchedQueue({
        queue: resp.data
      }));
    }).catch((err) => {
      console.log("failed to fetch queue");
    });
  };
}

export function updateStatus(payload) {
  const url = 'http://192.168.1.68:4567/status/';
  return (dispatch) => {
    axios.put(url, payload).then((resp) => {
      dispatch(createFetchedStatus({
        consume: resp.data.consume,
        playlistlength: resp.data.playlistlength,
        random: resp.data.random,
        repeat: resp.data.repeat,
        single: resp.data.single,
        song: resp.data.song,
        songid: resp.data.songid,
        state: resp.data.state,
        volume: resp.data.volume,
        time: resp.data.time
      }));
    }).catch((err) => {
      console.log("failed to udpate status");
    });
  };
}