<template>
  <div @click="toggleModal" class="modal">
    <div @click.stop class="modal-content">
      <input class="userInput" type="text" placeholder="name" v-model="clonedUser.name">
      <input class="userInput" type="text" placeholder="email" v-model="clonedUser.email">
      <input class="userInput" type="text" placeholder="password" v-model="clonedUser.password">
      <button @click="saveUser" class="aedButton addButton">{{overlayType.charAt(0).toUpperCase() + overlayType.slice(1)}}</button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: "UserFormOverlay",
  props: {
    overlayType: {
      type: String,
      description: "Overlay type add or update",
      default: "add"
    },
    user: {
      type: Object,
      description: "User data",
    }
  },
  methods: {
    toggleModal() {
      this.$emit('toggleUserModal');
    },
    saveUser() {
      if (this.overlayType === "add") {
        this.$store.dispatch("user/addNewUser", this.clonedUser);
      } else {
        this.$store.dispatch("user/updateUser", this.clonedUser);
      }
      this.toggleModal();
    }
  },
  created() {
    this.clonedUser = _.cloneDeep(this.user);
  }
};
</script>
