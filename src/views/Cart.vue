<template>
  <div class="cart-page">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-md-7">
          <h3>My Shopping Cart</h3>
          <table class="cart-table" v-if="cart_items_count > 0">
            <thead>
              <tr>
                <th>
                  {{ cart_items_count }} item{{
                    cart_items_count == 1 ? "" : "s"
                  }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in cart_items" :key="`cart-item-${i}`">
                <td>
                  <img :src="item.image" :alt="item.title" />
                </td>
                <td>
                  <p class="title">{{ item.title }}</p>
                  <p class="author">by {{ item.author.name }}</p>
                  <rating />
                  <p class="price">
                    KES <span>{{ $number.format(item.price) }}</span>
                  </p>
                  <p class="seller">
                    Sold By:
                    <router-link
                      :to="{
                        name: 'resource',
                        params: { slug: item.seller.slug },
                      }"
                      >{{ item.seller.name }}</router-link
                    >
                  </p>
                </td>
                <td>
                  <input
                    type="number"
                    class="form-control"
                    v-model="item.quantity"
                    @focusout="updateCart(item)"
                  />
                  <a
                    href="#"
                    class="remove text-danger"
                    @click.prevent="removeItem(item)"
                    ><i class="lni-trash mr-2"></i>Remove</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="cart_items_count == 0">
            <div class="alert alert-info text-center my-5">
              There are no items in your cart
            </div>
            <div class="text-center">
              <router-link to="/" class="btn btn-primary"
                ><i class="lni-home mr-2"></i> Go Home</router-link
              >
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="order-summary">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Order Summary</h4>
                <table class="table">
                  <tbody>
                    <tr>
                      <td>Subtotal ({{ cart_items_count }} item{{ cart_items_count == 1 ? '' : 's' }})</td>
                      <td>
                        KES {{ $number.format(cart_items_total) }}
                      </td>
                    </tr>
                    <tr class="total">
                      <td>Total</td>
                      <td>KES {{ $number.format(cart_items_total) }}</td>
                    </tr>
                  </tbody>
                </table>
                <router-link class="btn btn-primary btn-block" :to="{ name: 'checkout' }">Proceed to checkout</router-link>
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
  methods: {
    removeItem(item) {
      let my_cart = this.$cart.remove(item.id);
      this.$store.dispatch("setCartItems", my_cart);
    },

    updateCart(item) {
      if (!item.quantity > 0) {
        item.quantity = 1;
      }

      let my_cart = this.$cart.updateItem(item);
      this.$store.dispatch("setCartItems", my_cart);
    },
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
