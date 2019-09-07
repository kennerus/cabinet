import {USER_REQUEST, USER_SUCCESS, USER_ERROR} from "../actions/user";
import api from '../../utils/api'

const state = {
    profile: {},
    status: ''
}

const getters = {
    getProfile: state => state.profile
}

const actions = {
    [USER_REQUEST]: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit(USER_REQUEST)
            
            api.get('/me')
                .then(response => {
                    commit(USER_SUCCESS, response.data.data)
                    resolve(response)
                })
                .catch(err => {
                    commit(USER_ERROR)
                    reject(err)
                })
        })
    }
}

const mutations = {
    [USER_REQUEST]: state => {
        state.status = 'loading'
    },
    [USER_ERROR]: state => {
        state.status = 'error'
    },
    [USER_SUCCESS]: (state, user) => {
        state.status = 'success';
        state.profile = user
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
