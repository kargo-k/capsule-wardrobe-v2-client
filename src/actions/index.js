import {
  SHOW_CAPSULE,
  SHOW_USER,
  LOGGED_IN,
  SET_CAPSULES
} from '../constants/action-types';

import { API } from '../constants/api-url';

export const showCapsule = payload => {
  return { type: SHOW_CAPSULE, payload }
}

export const createUser = payload => {
  return (dispatch, getState) => {
    fetch(API + '/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: payload
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          console.log('failed to create user...', json)
        } else {
          console.log('successfully created user', json)
          localStorage.setItem('token', json.jwt)
          dispatch(isLoggedIn())
        }
      })
  }
}

export const logInUser = credentials => {
  return (dispatch, getState) => {
    fetch(API + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: credentials
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          console.log('post request to login - error', json)
        } else {
          console.log('post request to login:', json)
          localStorage.setItem('token', json.jwt)
          dispatch(isLoggedIn())
        }
      })
  }
}

export const showUser = payload => {
  return { type: SHOW_USER, payload }
}

export const isLoggedIn = () => {
  return { type: LOGGED_IN }
}

export const fetchCapsules = () => {
  return (dispatch, getState) => {
    fetch(API + '/capsules', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log('in capsules fetch', data)
        dispatch(setCapsules(data))
      })
      .catch(e => console.log('error in get request', e))
  }
}

export const setCapsules = payload => {
  return { type: SET_CAPSULES, payload }
}