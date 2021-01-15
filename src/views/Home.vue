<template>
  <div class="home">
    <div @click="alertOnClick">{{title}}</div>
    <img :alt="imageAlt" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <ul>
      <li v-for="(todo, index) in todoList" :key="index">{{todo.employee_name}}</li>
    </ul>
    <button @click="addNewTodo">Add new todo</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapGetters } from 'vuex';

export default {
  name: "Home",
  components: {
    HelloWorld
  },
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
    })
  },
  methods: {
    alertOnClick() {
      this.garodMessage = this.garodMessage === "noice!" ? "Hello World" : "noice!";
    },
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
  }
};
</script>
