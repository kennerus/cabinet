import {AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT} from '../actions/auth'
import {USER_REQUEST} from "../actions/user";
import api from '../../utils/api'

const storeKey = 'user-token';

const state = {
  token: localStorage.getItem(storeKey) || '',
  status: ''
}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
}

const actions = {
  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      api({url: '/login', data: user, method: 'POST'})
        .then(response => {
          localStorage.setItem(storeKey, response.data.token)
          api.defaults.headers['Authorization'] = 'Bearer ' + response.data.token
          commit(AUTH_SUCCESS, response.data)
          dispatch(USER_REQUEST)
          resolve(response)
        })
        .catch(err => {
          commit(AUTH_ERROR, err)
          localStorage.removeItem(storeKey)
          reject(err)
        })
    })
  },
  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem(storeKey)
      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.token = resp.token
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
