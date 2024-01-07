export default {
  install(Vue) {
    Vue.cart = {
      local_cart: `${process.env.VUE_APP_LOCAL_STORAGE_PREFIX}_cart_items`,
      
      add(item) {
        let my_cart = this.all();

        if (this.find(item.id)) {
          my_cart.map(current => {
            if (current.id == item.id) {
              current.quantity = current.quantity + 1;
            }

            return current;
          });
        } else {
          let item_data = {
            quantity: 1,
            id: item.id,
            slug: item.slug,
            title: item.title,
            price: item.price,
            image: item.image,
            seller: item.seller,
            author: item.author,
            rating: item.rating
          }

          my_cart.push(item_data);
        }

        localStorage.setItem(this.local_cart, JSON.stringify(my_cart));

        return my_cart;
      },

      find(id) {
        let cart_items = this.all();

        return cart_items.filter(item => {
          return item.id == id;
        })[0];
      },

      remove(id) {
        let cart_items = this.all();

        let position = 0;

        cart_items.forEach((item, index) => {
          if (item.id == id) {
            position = index;
          }
        });

        cart_items.splice(position, 1);

        localStorage.setItem(this.local_cart, JSON.stringify(cart_items));

        return cart_items;
      },

      all() {
        let cart = localStorage.getItem(this.local_cart);
        let my_cart = {};

        if (cart == undefined || cart == null) {
          my_cart = [];
        } else {
          my_cart = JSON.parse(cart);
        }

        return my_cart;
      },

      empty() {
        let my_cart = [];

        localStorage.setItem(this.local_cart, JSON.stringify(my_cart));
      },

      updateItem(item) {
        let my_cart = this.all();

        if (this.find(item.id)) {
          my_cart.map(current => {
            if (current.id == item.id) {
              current.quantity = item.quantity;
            }

            return current;
          });
        } else {
          item.quantity = 1;
          my_cart.push(item);
        }

        localStorage.setItem(this.local_cart, JSON.stringify(my_cart));

        return my_cart;
      }
    };

    Object.defineProperties(Vue.prototype, {
      $cart: {
        get() {
          return Vue.cart;
        }
      }
    });
  }
};
