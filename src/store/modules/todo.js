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
    addNewTodo ({ commit }, payload) {
        axios.post("/todos", {
            name: payload.name
        }).then((res) => {
            commit("addNewTodo", res.data)
        })
    },
    updateTodo ({ commit }, payload) {
        axios.put(`/todos/${payload.id}`, {
            name: payload.newTodoName,
        }).then((res) => {
            commit("updateTodo", res.data)
        })
    },
    deleteTodo ({ commit }, payload) {
        axios.delete(`/todos/${payload.id}`)
            .then((res) => {
                commit("deleteTodo", res.data)
        })
    },
    completeTodo ({ commit }, payload) {
        axios.put(`/todos/${payload.id}/complete`, {
            completed: payload.completed
        }).then((res) => {
            commit('completeTodo', res.data)
        })
    }
}
  
// mutations
const mutations = {
    setTodoList (state, todoList) {
        state.todoList = todoList
    },
    addNewTodo (state, todo) {
        state.todoList.unshift(todo)
    },
    updateTodo (state, todo) {
        let updatedTodo = state.todoList.find((eachTodo) => eachTodo.id === todo.id)
        updatedTodo.name = todo.name
    },
    deleteTodo (state, todo) {
        let newTodoList = state.todoList.filter((eachTodo) => eachTodo.id !== todo.id)
        state.todoList = newTodoList
    },
    completeTodo (state, todo) {
        let completedTodo = state.todoList.find((eachTodo) => eachTodo.id === todo.id)
        completedTodo.completed_at = todo.completed_at
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}