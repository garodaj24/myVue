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
  created() {
    if (this.loggedIn) {
      this.getUserProfile();
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.content {
  margin-top: 60px;
}

</style>
