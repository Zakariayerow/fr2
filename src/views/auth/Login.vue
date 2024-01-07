<template>
  <div class=" nav-margin">
    <div class="container pt-5">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="card" style="margin-bottom: 3rem">
          <div class="card-body">
            <h2 class="card-title ">Login</h2>
            <div class="alert alert-danger" v-if="has_error">
              Invalid email and/or password
            </div>
            <form @submit.prevent="login" id="login-form">
              <div class="form-group">
                <label>Email</label>
                <input
                  type="email"
                  :class="`form-control ${has_error ? 'is-invalid' : ''}`"
                  placeholder="Your Email"
                  v-model="user.email"
                />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input
                  type="password"
                  :class="`form-control ${has_error ? 'is-invalid' : ''}`"
                  placeholder="********"
                  v-model="user.password"
                />
              </div>
              <div class="form-group text-right">
                <button class="btn btn-primary btn-sm">Sign In</button>
              </div>
            </form>
            <p>
              Forgot your password?
              <router-link
                class="text-info"
                :to="{ name: 'reset', query: { next: $route.query.next } }"
                >Reset</router-link
              >
            </p>
            <p class="d-mobile">
              Don't have an account?
              <router-link
                class="text-info"
                :to="{ name: 'register', query: { next: $route.query.next } }"
                >Create an account</router-link
              >
            </p>
            <div class="row mb-4" v-if="1 == 0">
              <div class="col-md-12 text-center pb-4 pt-2 text-muted">OR</div>
              <div class="col-md-6">
                <a href class="btn btn-block btn-facebook mb-4">
                  <i class="lni-facebook mr-2"></i>Login With Facebook
                </a>
              </div>
              <div class="col-md-6">
                <a href class="btn btn-block btn-google">
                  <i class="lni-google mr-2"></i>Login with Google
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  beforeMount() {
    if (this.$auth.hasToken()) {
      this.$router.push({ name: "account" });
    }
  },

  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      has_error: false,
    };
  },

  methods: {
    login() {
      this.has_error = false

      this.$axios
        .post("/api/v1/login", this.user)
        .then((response) => {
          this.$auth.setToken(response.data.access_token);
          window.location.href = this.$route.query.next
            ? this.$router.resolve({ path: this.$route.query.next }).href
            : this.$router.resolve({ name: "home" }).href;
        })
        .catch(() => {
          this.has_error = true;
        });
    },
  },
};
</script>
