<template>
    <img :style="{height: logoSize + 'px'}" alt="Website Logo" src="../assets/logo.png" />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "Logo",
  props: {
      logoSize: {
          type: Number,
          description: 'logo image height and width',
          default: 25
      }
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
      });
    }
  },
};
</script>