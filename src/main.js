import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin

Vue.use(IconsPlugin);
// Plugins
import Auth from "./plugins/auth";
Vue.use(Auth);

import Cart from "./plugins/cart";
Vue.use(Cart);

import Numeral from "./plugins/numeral";
Vue.use(Numeral);

import Loader from "./plugins/loader";
Vue.use(Loader);

// Components
import Paginate from "vuejs-paginate";
Vue.component("paginate", Paginate);

import { Hooper, Slide, Navigation, Pagination } from "hooper";
Vue.component("hooper", Hooper);
Vue.component("slide", Slide);
Vue.component("hooper-navigation", Navigation);
Vue.component("hooper-pagination", Pagination);

import vSelect from "vue-select";
Vue.component("v-select", vSelect);

import Rating from "./components/Rating";
Vue.component("rating", Rating);

require("./theme");

const app = new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");

app.$axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    app.$loader.start();
    return config;
  },
  function(error) {
    // Do something with request error
    app.$loader.stop();
    return Promise.reject(error);
  }
);

// Add a response interceptor
app.$axios.interceptors.response.use(
  function(response) {
    app.$loader.stop();
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    app.$loader.stop();
    return Promise.reject(error);
  }
);
