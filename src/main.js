import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import VueAxios from 'vue-axios';

// creating axios instance with base URL
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

// intercepting every axios request to authorize it
axios.interceptors.request.use(req => {
  if (localStorage.getItem('userToken')) {
    req.headers.authorization = `Bearer ${localStorage.getItem('userToken')}`
  }
  return req;
});

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .mount("#app");
