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
import { mapGetters } from 'vuex';

export default {
  name: "Home",
  components: {},
  data() {
    return {
      email: "",
      password: "",
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
    })
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
