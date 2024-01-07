<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <router-link :to="{ name: 'my-account.password' }" class="float-right"><i class="lni-pencil mr-2"></i>Edit</router-link>
        <h4 class="card-title mb-4">My Account</h4>
        <table class="table table-bordered">
          <tbody>
            <tr>
              <td>Name</td>
              <td>{{ user.name }}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{{ user.email }}</td>
            </tr>
            <tr>
              <td>Phone Number</td>
              <td>{{ user.phone_number }}</td>
            </tr>
            <tr>
              <td colspan="2">
                <router-link :to="{ name: 'account.password' }">Change Password</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.getAuthUser
    }
  }
}
</script>