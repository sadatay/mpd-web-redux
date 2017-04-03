import _ from 'lodash';
import { handleActions } from 'redux-actions';
import { ActionTypes } from '../constants/ActionTypes';

const initialQueue = {
	queue: []
}

const queue = handleActions({
  [ActionTypes.FETCHED_QUEUE]: (state, action) => (_.assign({}, state, {
  	queue: action.payload.queue
  })),
}, initialQueue);

export default queue;