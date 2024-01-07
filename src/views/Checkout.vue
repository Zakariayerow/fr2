<template>
  <div class="nav-margin">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-md-7">
          <h3 class="mt-4 mb-3">Checkout</h3>
          <form @submit.prevent="">
            <div class="form-row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" class="form-control" placeholder="Name" v-model="user.name">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="phone-number">Phone Number</label>
                  <input type="text" class="form-control" placeholder="Phone Number" v-model="user.phone_number">
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="address">Delivery Address</label>
                  <textarea class="form-control" rows="4" placeholder="Your Address" v-model="user.address"></textarea>
                </div>
              </div>
              <div class="col-md-12">
                <h5 class="mt-4 mb-3">Select Payment Method</h5>
                <div class="form-group">
                  <input type="radio" name="payment" id="mpesa" class="mr-3" value="mpesa" v-model="user.payment"> <label for="mpesa">Pay Online with MPESA</label>
                </div>
                <div class="form-group">
                  <input type="radio" name="payment" id="cod" class="mr-3" value="cod" v-model="user.payment"> <label for="cod">Cash On Delivery</label>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-3">
          <div class="card shadow mt-5">
            <div class="card-body">
              <h4 class="card-title">Your Books</h4>
              <table class="table">
                <tbody>
                  <tr v-for="(item, i) in cart_items" :key="`cart-item-${i}`" style="border-bottom: solid 1px #ddd">
                    <td width="150px">
                      <img :src="item.image" :alt="item.title" height="150px">
                    </td>
                    <td>
                      <h4>{{ item.title }}</h4>
                      <h5 class="text-primary mb-1">KES {{ $number.format(item.price) }}</h5>
                      <p>Quantity: {{ item.quantity }}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">Total: KES <span style="font-size: 26px">{{ $number.format(cart_items_total) }}</span></td>
                  </tr>
                </tbody>
              </table>
              <div class="text-right">
                <a href="#" class="btn btn-primary" @click.prevent="proceed"><i class="lni-cart mr-2"></i> Place Order</a>
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
    if (!this.$auth.hasToken()) {
      this.$router.push({ name: "login", query: { next: "checkout" } });
    }
  },

  mounted() {
    if(this.cart_items_count == 0) {
      this.$router.push({ name: 'cart' })
    }
  },

  data() {
    return {
      user: {
        name: this.$store.getters.getAuthUser.name,
        phone_number: this.$store.getters.getAuthUser.phone_number,
        payment: 'mpesa'
      }
    };
  },

  methods: {
    proceed() {
      let data = this.user
      data.books = this.cart_items.map(item => {
        return {
          id: item.id,
          quantity: item.quantity,
        }
      })

      this.$axios.post('/api/v1/orders', data).then(response => {
        this.$cart.empty()
        this.$store.dispatch('setCartItems', [])
        this.$router.push({ name:'thank-you', params: { id: response.data }})
      })
    }
  },

  computed: {
    cart_items() {
      return this.$store.getters.getCartItems;
    },

    cart_items_count() {
      let total = 0;

      this.cart_items.forEach((item) => {
        total += item.quantity;
      });

      return total;
    },

    cart_items_total() {
      let total = 0;

      this.cart_items.forEach((item) => {
        total += item.quantity * item.price;
      });

      return total;
    },
  },
};
</script>
