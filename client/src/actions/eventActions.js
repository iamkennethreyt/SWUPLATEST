import axios from "axios";

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  EVENT_LOADING,
  DELETE_EVENT,
  GET_EVENTS,
  ADD_EVENT
} from "./types";

// Add Post
export const addEvent = eventData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/events", eventData)
    .then(res =>
      dispatch({
        type: ADD_EVENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Posts
export const getEvents = () => dispatch => {
  dispatch(setEventLoading());
  axios
    .get("/api/events")
    .then(res =>
      dispatch({
        type: GET_EVENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EVENTS,
        payload: null
      })
    );
};

// Delete Event
export const deleteEvent = id => dispatch => {
  axios
    .delete(`/api/events/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_EVENT,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setEventLoading = () => {
  return {
    type: EVENT_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
