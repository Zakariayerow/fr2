<template>
  <div class="nav-margin">
    <div class="container-fluid mt-4">
      <div class="row">
        <div class="col-md-2">
          <div class="card">
            <div class="card-body my-account-menu">
              <ul>
                <li>
                  <router-link :to="{ name: 'my-account.show' }"><i class="lni-user mr-2"></i> My Account</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'orders.index' }"><i class="lni-package mr-2"></i> My Orders</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'my-account.profile' }"><i class="lni-pencil mr-2"></i> My Profile</router-link>
                </li>
                <li class="mt-3">
                  <a href="#" @click.prevent="logout">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-10">
         <div class="card">
           <div class="card-body">
              <router-view />
           </div>
         </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$axios.post('/api/v1/logout').then(() => {
        this.$router.push({ name: 'login' })
      })
    }
  }
}
</script>