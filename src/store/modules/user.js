import axios from 'axios';
import router from '@/router/index';

// initial state
const state = () => ({
    user: null,
    userToken: null
})
  
// getters
const getters = {
    getUser (state) {
        return state.user
    },
    getUserToken (state) {
        return state.userToken
    }
}

// actions
const actions = {
    login ({ commit }, payload) {
        axios.post("/auth/login", {
            email: payload.email,
            password: payload.password
        }).then((res) => {
            if (res.status === 200) {
                localStorage.setItem('userToken', res.data.token)
                commit("setUserToken", res.data.token)
                router.push("/")
            }
        })
    },
    logout ({ commit }) {
        axios.post("/auth/logout")
            .then((res) => {
                if (res.status === 200) {
                    commit('setUser', null)
                    localStorage.removeItem("userToken")
                    router.go()
                }
        })
    },
    getUserProfile ({ commit }) {
        axios.get("/auth/profile")
            .then((res) => {
                if (res.status === 200) {
                    commit("setUser", res.data)
                }
            })
    }
}
  
// mutations
const mutations = {
    setUser (state, user) {
        state.user = user
    },
    setUserToken (state, userToken) {
        state.userToken = userToken
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}