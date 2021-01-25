import axios from 'axios';

// initial state
const state = () => ({
    todoList: []
})
  
// getters
const getters = {
    getTodoList (state) {
        return state.todoList
    }
}

// actions
const actions = {
    getAllTodos ({ commit }) {
        axios.get("/todos")
            .then((res) => {
                commit('setTodoList', res.data)
            })
    },
    setNewTodo ({ commit }, payload) {
        axios.post("/todos", {
            name: payload.name
        }).then((res) => {
            if (res.status === 200) {
                commit("addNewTodo", res.data)
            }
        })
    },
    updateTodo ({ commit }, payload) {
        axios.put(`/todos/${payload.id}`, {
            name: payload.newTodoName
        }).then((res) => {
            if (res.status === 200) {
                commit("updateTodo", res.data)
            }
        })
    },
    deleteTodo ({ commit }, payload) {
        axios.delete(`/todos/${payload.id}`)
            .then((res) => {
                if (res.status === 200) {
                    commit("deleteTodo", res.data)
                }
        })
    }
}
  
// mutations
const mutations = {
    setTodoList (state, todoList) {
        state.todoList = todoList
    },
    addNewTodo (state, todo) {
        state.todoList.push(todo)
    },
    updateTodo (state, todo) {
        state.todoList.forEach((eachTodo) => {
            if (eachTodo.id === todo.id) {
                eachTodo.name = todo.name
            }
        })
    },
    deleteTodo (state, todo) {
        let newTodoList = state.todoList.filter((eachTodo) => eachTodo.id !== todo.id)
        state.todoList = newTodoList
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}