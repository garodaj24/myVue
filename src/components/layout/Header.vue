<template>
    <header>
        <router-link to="/"><Logo :logoSize="50" /></router-link>
        <Navbar />
    </header>
</template>

<script>
import { mapGetters } from 'vuex';
import Navbar from '@/components/layout/Navbar.vue';
import Logo from '@/components/Logo.vue';

export default {
  name: "Header",
  components: {
      Navbar,
      Logo
  },
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
    header {
        width: 100%;
        height: 60px;
        background-color: white;
        position: fixed;
        top: 0;
        display: flex;
        align-items: center;
    }
</style>