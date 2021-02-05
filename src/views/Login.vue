<template>
  <div class="home">
    <input v-model="email" type="email" placeholder="email">
    <br />
    <input v-model="password" type="password" placeholder="password">
    <br />
    <button @click="login">Login</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    login() {
      this.$store.dispatch('user/login', {
        email: this.email,
        password: this.password
      })
    },
  },
};
</script>

<style scoped>
    div {
      margin-top: 100px;
      text-align: center;
    }

    input {
      margin-bottom: 10px;
      width: 60%;
      height: 30px;
    }

    button {
      width: 80px;
      height: 30px;
      background-color: green;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
</style>
