import axios from 'axios';
import router from '@/router/index';

// initial state
const state = () => ({
    user: null,
    userToken: localStorage.getItem('userToken'),
    loggedIn: !!localStorage.getItem('userToken'),
    users: [],
})
  
// getters
const getters = {
    getUser (state) {
        return state.user;
    },
    getUserToken (state) {
        return state.userToken;
    },
    getUserList (state) {
        return state.users;
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
                commit("setUserToken", res.data.token);
                dispatch("getUserProfile");
                router.push("/");
            }
        })
    },
    logout ({ commit }) {
        axios.post("/auth/logout")
            .then((res) => {
                if (res.status === 200) {
                    commit('resetUser');
                    router.go();
                }
        })
    },
    getUserProfile ({ commit }) {
        axios.get("/auth/profile")
            .then((res) => {
                if (res.status === 200) {
                    commit("setUser", res.data);
                }
            })
    },
    getAllUsers ({ commit }) {
        axios.get("/users")
            .then((res) => {
                if (res.status === 200) {
                    commit("setAllUsers", res.data);
                }
            })
    },
    addNewUser ({ commit }, payload) {
        axios.post("/users", {
            name: payload.name,
            email: payload.email,
            password: payload.password
        }).then((res) => {
            commit("addNewUser", res.data);
        })
    },
    updateUser ({ commit }, payload) {
        let config = {
            header : {
                'Content-Type' : 'multipart/form-data'
            }
        }
        if (payload.formData) {
            axios.post(`/users/${payload.id}`, payload.formData, config)
                .then((res) => {
                    commit("updateUser", res.data);
                })
        } else {
            axios.put(`/users/${payload.id}`, {
                name: payload.name,
                email: payload.email,
                password: payload.password,
                image: payload.image
            }).then((res) => {
                commit("updateUser", res.data);
            })
        }
    },
    deleteUser ({ commit }, payload) {
        axios.delete(`/users/${payload.id}`)
            .then((res) => {
                commit("deleteUser", res.data);
        })
    },
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
        state.user = [];
        state.loggedIn = false;
        state.userToken = null;
        localStorage.removeItem("userToken");
    },
    setAllUsers (state, users) {
        state.users = users;
    },
    addNewUser (state, user) {
        state.users.unshift(user);
    },
    updateUser (state, user) {
        let updatedUser = state.users.find((eachUser) => eachUser.id === user.id);
        updatedUser.name = user.name;
        updatedUser.email = user.email;
        if (user.password) {
            updatedUser.password = user.password;
        }
        if (user.image) {
            updatedUser.image = user.image
        }
    },
    deleteUser (state, user) {
        let newUserList = state.users.filter((eachUser) => eachUser.id !== user.id);
        state.users = newUserList;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}