<template>
  <div id="app">
    <app-header :navs="navs" />
    
    <div class="werezi-content">
      <router-view/>
    </div>

    <app-footer />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'

export default {
  components: {
    AppHeader, AppFooter
  },

  beforeCreate() {
    this.$axios.get('/api/v1/init').then(response => {
      this.navs = response.data.navigation
      this.$store.dispatch("setAuthUser", response.data.auth_user);

      if (! response.data.auth_user) {
          if (this.$auth.hasToken()) {
            this.$auth.removeToken();
            window.location.href = this.$router.resolve({
              name: "login",
            }).href;
          }
        }
    })
    this.$store.dispatch("setCartItems", this.$cart.all());
  },

  data() {
    return {
      navs: []
    }
  }
}
</script>
