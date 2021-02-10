<template>
    <div v-if="user" id="userForm" class="userInputForm">
        <div><img v-if="profileImage || user.image" class="profileImage" :src="profileImage ? profileImage : 'http://127.0.0.1:8000/storage/images/'+user.id+'/'+user.image.storage_uuid" alt="profile image"></div>
        <input class="userInput" type="text" placeholder="name" v-model="user.name">
        <input class="userInput" type="text" placeholder="email" v-model="user.email">
        <input class="userInput" type="text" placeholder="password" v-model="user.password">
        <input class="userInput" type="file" ref="imageUpload" accept="image/*" @change="uploadImage($event)" id="file-input">
        <button @click="saveUser" class="aedButton addButton">Save</button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "User",
  data() {
    return {
        data: new FormData(),
        profileImage: null,
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    }),
  },
  methods: {
    uploadImage(event) {
        var reader = new FileReader();
        reader.onload = (e) => {
            this.profileImage = e.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
        this.data.append('image', event.target.files[0]);
    },
    saveUser() {
        this.data.append('name', this.user.name);
        this.data.append('email', this.user.email);
        if (this.user.password) {
            this.data.append('password', this.user.password);
        }
        this.data.append('_method', "PUT");
        this.$store.dispatch("user/updateUser", {
            id: this.user.id,
            formData: this.data
        });
        this.$refs.imageUpload.value = null;
    }
  },
};
</script>
