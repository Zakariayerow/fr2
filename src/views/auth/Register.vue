<template>
  <div class="nav-margin">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-7">
          <div class="card shadow my-5">
            <div class="card-body">
              <h2 class="card-title text-center mb-4">Register</h2>
              <form @submit.prevent="register" id="register-form">
                <div v-if="has_error">
                  There was an error ptocessing your request
                </div>
                <div class="form-row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Full Name"
                        v-model="user.name"
                        name="name"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Email"
                        v-model="user.email"
                        name="email"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        placeholder="+254712345678"
                        class="form-control"
                        v-model="user.phone_number"
                        name="phone_number"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="********"
                        v-model="user.password"
                        name="password"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="********"
                        v-model="user.password_confirmation"
                        name="password_confirmation"
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group text-right">
                      <button class="btn btn-primary">
                        <i class="fa fa-sign-in mr-2"></i>Register
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <p>
                Have an account?
                <router-link
                  class="text-info"
                  :to="{ name: 'login', query: { next: $route.query.next } }"
                  >Login</router-link
                >
              </p>
              <div class="row mb-4" v-if="1 == 0">
                <div class="col-md-12 text-center pb-4 pt-2 text-muted">OR</div>
                <div class="col-md-6">
                  <a href class="btn btn-block btn-facebook mb-4">
                    <i class="lni-facebook mr-2"></i>Register With Facebook
                  </a>
                </div>
                <div class="col-md-6">
                  <a href class="btn btn-block btn-google">
                    <i class="lni-google mr-2"></i>Register with Google
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
        phone_number: "",
        name: "",
        email: "",
      },
      has_error: false,
    };
  },

  methods: {
    register() {
      this.has_error = false;
      this.$axios
        .post("/api/v1/register", this.user)
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
