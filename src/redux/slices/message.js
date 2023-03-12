import axios from '../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: false,
  messages: []
};

const slice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getMessagesSuccess(state, action) {
      state.isLoading = false;
      state.messages = action.payload;
    },

    createMessageSuccess(state, action) {
      state.isLoading = false;
      // TODO: something when create a message
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError } = slice.actions;

// --------------------------------------------------------------------------------------------

export function getMessages({ enqueueSuccess }) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/message/list');
      dispatch(slice.actions.getMessagesSuccess(response.data));
      enqueueSuccess(response.data);
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
}

export function createMessage({ data, enqueueSuccess }) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/message/add', data);
      dispatch(slice.actions.createMessageSuccess(response.data));
      enqueueSuccess(response.data);
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
}
