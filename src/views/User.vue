<template>
  <template v-if="isAdmin">
    <button class="aedButton addButton" @click="toggleUserOverlay('add')">Add</button>
    <table class="users-table">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Created at</th>
      </tr>
      <tr v-for="(eachUser) in userList" :key="eachUser.id">
        <td>{{eachUser.name}}</td>
        <td>{{eachUser.email}}</td>
        <td>{{eachUser.created_at.split("T")[0] + " " + eachUser.created_at.split("T")[1].split(".")[0]}}</td>
        <td><button @click="toggleUserOverlay('update', eachUser)" class="aedButton editButton">Edit</button></td>
        <td><button @click="deleteUser(eachUser.id)" class="aedButton deleteButton">Delete</button></td>
      </tr>
    </table>
  </template>
  <template v-else>
    <div>Only Admins Are Allowed</div>
  </template>
  <userFormOverlay :user="updatedUser" :overlayType="overlayType" @toggleUserModal="toggleUserOverlay" v-if="showUserOverlay" />
</template>

<script>
import UserFormOverlay from "@/components/UserFormOverlay.vue";
import { mapGetters } from 'vuex';

export default {
  name: "User",
  components: {
    UserFormOverlay,
  },
  data() {
    return {
      showUserOverlay: false,
      newUser: null,
      isAdmin: true,
      overlayType: "add",
      updatedUser: {
        id: 0,
        name: "",
        email: "",
      }
    }
  },
  computed: {
    ...mapGetters({
      userList: 'user/getUserList',
      user: 'user/getUser'
    }),
  },
  watch: {
    "user": function() {
      this.checkIsAdmin();
    }
  },
  methods: {
    toggleUserOverlay(modal, userData) {
      this.overlayType = modal;
      if (userData) {
        this.updatedUser = {
          id: userData.id,
          name: userData.name,
          email: userData.email
        }
      } else {
        this.updatedUser = {
          id: 0,
          name: "",
          email: ""
        }
      }
      this.showUserOverlay = !this.showUserOverlay;
    },
    checkIsAdmin() {
      if (this.user && this.user.is_admin) {
        this.$store.dispatch('user/getAllUsers');
      }
    },
    deleteUser(userId) {
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085D6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("user/deleteUser", {
            id: userId
          });
        }
      })
    },
  },
  mounted() {
    this.checkIsAdmin();
  }
};
</script>
