import { createStore } from "vuex";
import todo from './modules/todo';
import user from './modules/user';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    todo,
    user,
  },
});
