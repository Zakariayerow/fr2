<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-body">
            <div class="register-logo">
              <h4 class="card-title">Create Seller Account</h4>
              <hr>
            </div>
            <form @submit.prevent="register" v-if="! applied">
              <div class="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Full Name" class="form-control" required v-model="user.name">
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="text" placeholder="Email" class="form-control" required v-model="user.email">
              </div>
              <div class="form-group">
                <label>Phone Number</label>
                <input type="text" placeholder="Phone Number" class="form-control" required v-model="user.phone_number">
              </div>
              <div class="form-group">
                <label>Password</label>
                <input type="password" placeholder="******" class="form-control" required v-model="user.password">
              </div>
              <div class="form-group">
                <label>Retype Password</label>
                <input type="password" placeholder="******" class="form-control" required v-model="user.password_confirmation">
              </div>
              <div class="form-group text-right">
                <button class="btn btn-primary">Register</button>
              </div>
            </form>
            <div class="alert alert-success" v-if="applied">We have received your application. We will send you an email once approved</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: ''
      },
      applied: false
    }
  },

  methods: {
    register() {
      this.$axios.post('/api/v1/seller/register', this.user).then(() => {
        this.applied = true
      })
    }
  }
}
</script>