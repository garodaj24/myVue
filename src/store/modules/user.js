import axios from 'axios';
import router from '@/router/index';

// initial state
const state = () => ({
    user: null,
    userToken: localStorage.getItem('userToken'),
    loggedIn: !!localStorage.getItem('userToken')
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
    login ({ commit, dispatch }, payload) {
        axios.post("/auth/login", {
            email: payload.email,
            password: payload.password
        }).then((res) => {
            if (res.status === 200) {
                commit("setUserToken", res.data.token)
                dispatch("getUserProfile")
                router.push("/")
            }
        })
    },
    logout ({ commit }) {
        axios.post("/auth/logout")
            .then((res) => {
                if (res.status === 200) {
                    commit('resetUser')
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
        state.user = user;
    },
    setUserToken (state, userToken) {
        localStorage.setItem('userToken', userToken);
        state.loggedIn = true;
        state.userToken = userToken;
    },
    resetUser (state) {
        state.user = []
        state.loggedIn = false;
        state.userToken = null;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}