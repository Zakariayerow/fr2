export default {
  install(Vue) {
    Vue.auth = {
      token_name: `${process.env.VUE_APP_LOCAL_STORAGE_PREFIX}_token`,

      getToken() {
        return localStorage.getItem(this.token_name);
      },

      hasToken() {
        if (this.getToken() == null) {
          return false;
        }
        if (this.getToken().length == 0) {
          return false;
        }

        return true;
      },

      setToken(token) {
        localStorage.setItem(this.token_name, token);
      },

      removeToken() {
        localStorage.removeItem(this.token_name);
      }
    };

    Object.defineProperties(Vue.prototype, {
      $auth: {
        get() {
          return Vue.auth;
        }
      }
    });
  }
};
