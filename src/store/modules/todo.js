import axios from 'axios';

// initial state
const state = () => ({
    todoList: [],
    categoriesList: [],
})
  
// getters
const getters = {
    getTodoList (state) {
        return state.todoList;
    },
    getCategoriesList (state) {
        return state.categoriesList;
    }
}

// actions
const actions = {
    getAllTodos ({ commit }) {
        axios.get("/todos")
            .then((res) => {
                commit('setTodoList', res.data.data);
            })
    },
    addNewTodo ({ commit }, payload) {
        axios.post("/todos", {
            name: payload.name,
            categories: payload.categories
        }).then((res) => {
            commit("addNewTodo", res.data.data);
        })
    },
    updateTodo ({ commit }, payload) {
        axios.put(`/todos/${payload.id}`, {
            name: payload.newTodoName,
            categories: payload.categories
        }).then((res) => {
            commit("updateTodo", res.data.data);
        })
    },
    deleteTodo ({ commit }, payload) {
        axios.delete(`/todos/${payload.id}`)
            .then((res) => {
                commit("deleteTodo", res.data);
        })
    },
    completeTodo ({ commit }, payload) {
        axios.put(`/todos/${payload.id}/complete`, {
            completed: payload.completed
        }).then((res) => {
            commit('completeTodo', res.data);
        })
    },
    getAllCategories ({ commit }) {
        axios.get("/categories")
            .then((res) => {
                commit('setCategoriesList', res.data);
            })
    },
}
  
// mutations
const mutations = {
    setTodoList (state, todoList) {
        state.todoList = todoList;
    },
    addNewTodo (state, todo) {
        state.todoList.unshift(todo);
    },
    updateTodo (state, todo) {
        let updatedTodo = state.todoList.find((eachTodo) => eachTodo.id === todo.id);
        updatedTodo.name = todo.name;
        updatedTodo.categories = todo.categories;
    },
    deleteTodo (state, todo) {
        let newTodoList = state.todoList.filter((eachTodo) => eachTodo.id !== todo.id);
        state.todoList = newTodoList;
    },
    completeTodo (state, todo) {
        let completedTodo = state.todoList.find((eachTodo) => eachTodo.id === todo.id);
        completedTodo.completed_at = todo.completed_at;
    },
    setCategoriesList (state, categoriesList) {
        state.categoriesList = categoriesList;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}