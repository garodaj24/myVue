<template>
  <div class="home">
    <NewTodo />
    <div v-for="(todo, index) in todoList" :key="index">
      <Todo :todo="todo"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Todo from "@/components/Todo.vue";
import NewTodo from "@/components/NewTodo.vue";
import { mapGetters } from 'vuex';

export default {
  name: "Home",
  components: {
    Todo,
    NewTodo
  },
  data() {
    return {
      imageAlt: "Vue logo",
      userToken: localStorage.getItem('userToken'),
    }
  },
  computed: {
    ...mapGetters({
      todoList: 'todo/getTodoList',
      user: 'user/getUser',
    })
  },
  methods: {
    addNewTodo() {
      this.$store.commit("todo/addNewTodo", {
        employee_age: "26",
        employee_name: "Garod Ajemian",
        employee_salary: "320800",
        id: "1",
        profile_image: ""
      })
    }
  },
  created() {
    this.$store.dispatch('todo/getAllTodos')
    if (this.userToken) {
      this.$store.dispatch('user/getUserProfile')
    }
  }
};
</script>
