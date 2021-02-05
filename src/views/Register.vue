<template>
  <div class="home">
    <div @click="alertOnClick">{{title}}</div>
    <img :alt="imageAlt" src="../assets/logo.png" />
    <ul>
      <li v-for="(todo, index) in todoList" :key="index">{{todo.employee_name}}</li>
    </ul>
    <div>{{user.token}}</div>
    <button v-if="user.token" @click="addNewTodo">logout</button>
    <button v-else @click="addNewTodo">login</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "Home",
  data() {
    return {
      imageAlt: "Vue logo",
      garodMessage: "Hello World",
      componentMode: true,
    }
  },
  computed: {
    title() {
      return this.componentMode ? "this is true" : "this is false";
    },
    ...mapGetters({
      todoList: 'todo/getTodoList',
      user: 'user/getUser',
    })
  },
  methods: {
    alertOnClick() {
      this.garodMessage = this.garodMessage === "noice!" ? "Hello World" : "noice!";
    },
    addNewTodo() {
      this.$store.dispatch('user/login', {
        email: "garod700@gmail.com",
        password: "myLaravel"
      })
    }
  },
  created() {
    this.$store.dispatch('todo/getAllTodos');
  }
};
</script>
