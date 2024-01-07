<template>
  <div>
    <h4 class="card-title">My Orders</h4>
    <table class="table table-striped" v-if="orders.length > 0">
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Status</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, i) in orders" :key="`order-${i}`">
          <td>{{ order.reference }}</td>
          <td>{{ order.status }}</td>
          <td>KES {{ $number.format(order.total) }}</td>
          <td>{{ order.created }}</td>
          <td>
            <router-link :to="{ name: 'orders.show', params: { id: order.reference }}" class="btn btn-primary btn-sm"> view</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="alert alert-info" v-if="orders.length == 0">
      We could not find any previous orders
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.fetch()
  },

  data() {
    return {
      orders: []
    }
  },

  methods: {
    fetch() {
      this.$axios.get('/api/v1/orders').then(response => {
        this.orders = response.data
      })
    }
  }
}
</script>