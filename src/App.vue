<template>
  <Header />
  <div class="content">
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: "App",
  components: {
    Header
  },
  computed: {
    ...mapState('user', ['loggedIn']),
  },
  methods: {
    ...mapActions('user', [
        'getUserProfile',
    ])
  },
  mounted() {
    if (this.loggedIn) {
      this.getUserProfile();
      this.$store.dispatch('user/getAllUsers');
    }
  }
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 8px;
  padding: 0;
}

.content {
  margin-top: 60px;
}

</style>
