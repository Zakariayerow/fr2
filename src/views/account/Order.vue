<template>
  <div class="container mt-2">
    <hr class="pb-4">
    <div class="row">
      <div class="col-md-5">
        <h4>Books</h4>
        <table class="table">
          <tbody>
            <tr 
              v-for="(item, i) in details.books"
              :key="`cart-item-${i}`"
            >
              <td><img :src="item.image" :alt="item.name" width="100px" ></td>
              <td>
                <h5>{{ item.name }}</h5>
                <p>by {{ item.author }}</p>
                <p>Quantity: {{ $number.format(item.quantity) }}</p>
              </td>
              <td>KES {{ $number.format(item.price) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-7">
        <div class="card card-themed">
          <div class="card-header">
            <h4 class="card-title">Order Information</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <p><strong>Order Number:</strong> #{{ details.reference }}</p>
                <p><strong>Date:</strong> {{ details.created }}</p>
                <p>
                  <strong>Payment Method:</strong>
                  {{ details.payment }}
                </p>
              </div>
              <div class="col-6">
                <p><strong>Customer Details:</strong></p>
                {{ details.user.name }}, <br />
                {{ details.user.phone_number }}, <br />
                {{ details.address }} <br />
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
  mounted() {
    this.fetch();
  },

  data() {
    return {
      details: {
        user: {}
      },
      is_loaded: false,
    };
  },

  methods: {
    fetch() {
      this.$axios
        .get("/api/v1/orders/" + this.$route.params.id)
        .then((response) => {
          this.is_loaded = true;
          this.details = response.data;
        });
    },
  },

  computed: {
    user() {
      return this.$store.getters.getAuthUser;
    },
  },
};
</script>
