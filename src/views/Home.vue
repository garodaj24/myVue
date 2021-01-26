<template>
  <div class="home">
    <NewTodo />
    <div v-for="(todo) in todoList" :key="todo.id">
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
      userToken: localStorage.getItem('userToken'),
    }
  },
  watch: {
    todoList() {
      console.log(this.todoList);
    }
  },
  computed: {
    ...mapGetters({
      todoList: 'todo/getTodoList',
      user: 'user/getUser',
    })
  },
  created() {
    this.$store.dispatch('todo/getAllTodos')
    if (this.userToken) {
      this.$store.dispatch('user/getUserProfile')
    }
  }
};
</script>
