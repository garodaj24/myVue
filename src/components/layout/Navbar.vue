<template>
    <nav>
        <ul>
            <template v-if="!userToken">
              <li><router-link to="/login">Login</router-link></li>
              <li><router-link to="/register">Register</router-link></li>
            </template>
            <template v-else>
              <li><router-link to="/">Todo</router-link></li>
              <li><router-link to="/users">Users</router-link></li>
              <li><router-link to="/about">About</router-link></li>
              <li v-if="user"><router-link to="/user">{{user.name}}</router-link></li>
              <li><a @click="logout">Logout</a></li>
            </template>
        </ul>
    </nav>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: "Navbar",
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      userToken: 'user/getUserToken'
    }),
    ...mapState('user', ['loggedIn']),
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout', {
        token: this.userToken
      });
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