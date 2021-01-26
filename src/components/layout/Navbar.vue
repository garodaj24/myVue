<template>
    <nav>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li>
                <router-link v-if="!user" to="/login">Login</router-link>
                <a v-else @click="logout">Logout</a>
            </li>
            <li><router-link v-if="!user" to="/register">Register</router-link></li>
        </ul>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "Navbar",
  data() {
    return {
      userToken: localStorage.getItem('userToken'),
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
    })
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout', {
        token: this.userToken
      })
    }
  },
};
</script>

<style scoped>
    nav {
        width: 100%;
        height: 100%;
        padding-right: 20px;
    }
    nav ul {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    nav ul li {
        text-decoration: none;
        margin-right: 1rem;
    }
    a {
        text-decoration: none;
        color: black;
    }
    a:hover {
        color: green;
        cursor: pointer;
    }
    .router-link-exact-active {
        color: green;
    }
</style>