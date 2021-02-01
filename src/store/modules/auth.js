import axios from 'axios';

// initial state
const state = () => ({
    token: localStorage.getItem('user-token') || '',
    status: '',
})
  
// getters
const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
}

// actions
const actions = {
    [AUTH_REQUEST]: ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => { // The Promise used for router redirect in login
            commit(AUTH_REQUEST)
            axios({url: 'auth', data: user, method: 'POST' })
                .then(res => {
                    const token = res.data.token
                    localStorage.setItem('user-token', token) // store the token in localstorage
                    commit(AUTH_SUCCESS, token)
                    // you have your token, now log in your user :)
                    dispatch(USER_REQUEST)
                    resolve(res)
                })
            .catch(err => {
            commit(AUTH_ERROR, err)
            localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
            reject(err)
            })
        })
    }
}
  
// mutations
const mutations = {
    [AUTH_REQUEST]: (state) => {
      state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, token) => {
      state.status = 'success'
      state.token = token
    },
    [AUTH_ERROR]: (state) => {
      state.status = 'error'
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}