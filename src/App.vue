<template>
  <Header />
  <div class="content">
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue';

export default {
  name: "App",
  components: {
    Header
  },
  data() {
    return {
    }
  },
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
