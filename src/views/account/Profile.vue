<template>
  <div class="row">
    <div class="col-md-6">
      <h4 class="card-title">My Profile</h4>
      <form @submit.prevent="submit">
        <div class="form-group">
          <label>Full Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Name"
            v-model="user.name"
          />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            readonly
            v-model="user.email"
          />
        </div>
        <div class="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            class="form-control"
            placeholder="Phone Number"
            v-model="user.phone_number"
          />
        </div>
        <div class="form-group text-right">
          <button class="btn btn-primary">
            <i class="lni-save mr-2"></i>Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: this.$store.getters.getAuthUser.name,
        email: this.$store.getters.getAuthUser.email,
        phone_number: this.$store.getters.getAuthUser.phone_number,
      },
    };
  },

  methods: {
    submit() {
      this.$axios.post('/api/v1/account/profile', this.user).then(response => {
        this.$store.dispatch('setAuthUser', response.data.user)
      })
    }
  }
};
</script>
