import axios from 'axios';

// initial state
const state = () => ({
    todoList: []
 })
  
// getters
const getters = {
    getTodoList (state) {
        console.log(state);
        return state.todoList
    }
}

// actions
const actions = {
    getAllTodos ({ commit }) {
        axios.get("http://dummy.restapiexample.com/api/v1/employees")
            .then((res) => {
                commit('setTodoList', res.data.data)
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}