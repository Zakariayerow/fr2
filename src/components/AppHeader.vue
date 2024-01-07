<template>
  <div class="header">
    <header class="top">
      <div class="container-fluid">
        <div class="logo">
          <a href="#" class="mr-2 mobile-menu-toggle" @click.prevent="toggleNav"
            ><i class="lni-menu"></i
          ></a>
          <router-link to="/"><img src="/logo.png" alt="logo"/></router-link>
        </div>
        <div class="search">
          <form @submit.prevent="goToSearch">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Search Titile, author or ISBN"
                aria-label="Search Titile, author or ISBN"
                aria-describedby="top-search-icon"
                v-model="search_term"
              />
              <div class="search-results shadow" v-if="search_term.length > 0">
                <ul>
                  <li v-for="(book, i) in filteredRows" :key="`book-${i}`">
                    <a href="#" @click.prevent="goToBook(book)">
                      <img
                        :src="book.image"
                        height="50px"
                        alt="image"
                        class="mr-3"
                      />
                      {{ book.name }}
                    </a>
                  </li>
                </ul>
              </div>
              <div class="input-group-append">
                <span class="input-group-text" id="top-search-icon"
                  ><i class="lni-search"></i
                ></span>
              </div>
            </div>
          </form>
        </div>
        <div class="cart">
          <div class="account">
            <div class="hello">
              <router-link
                :to="{ name: is_authenticated ? 'account.profile' : 'login' }"
                >Hello,
                {{ is_authenticated ? first_name : "Sign in" }}</router-link
              >
            </div>
            <div class="my-account">
              <a href="#"
                >My Account <i class="lni lni-chevron-down ml-2"></i
              ></a>
              <ul class="sub-menu">
                <li>
                  <router-link :to="{ name: 'orders.index' }"
                    ><i class="lni-package mr-2"></i> My Orders</router-link
                  >
                </li>
                <li>
                  <router-link :to="{ name: 'orders.index' }"
                    ><i class="lni-package mr-2"></i> My Account</router-link
                  >
                </li>
                <li v-if="is_authenticated">
                  <a href="#" @click.prevent="logout"
                    ><i class="lni-cog mr-2"></i> Logout</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="my-cart">
            <router-link :to="{ name: 'cart' }" class="cart-icon">
              <i class="lni-cart"></i>
              <span class="cart-counter" v-if="cart_items_count > 0">{{
                cart_items_count
              }}</span>
            </router-link>
          </div>
        </div>
        <div class="mobile-search">
          <form @submit.prevent="goToSearch">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Search Titile, author or ISBN"
                aria-label="Search Titile, author or ISBN"
                aria-describedby="top-search-icon"
                v-model="search_term"
                @input="search"
              />
              <div class="search-results shadow" v-if="search_term.length > 0">
                <ul>
                  <li v-for="(book, i) in books" :key="`book-${i}`">
                    <a href="#" @click.prevent="goToBook(book)">
                      <div class="row">
                        <div class="col-md-4">
                          <img
                            :src="book.image"
                            height="50px"
                            alt="image"
                            class="mr-3"
                          />
                        </div>
                        <div class="col-md-8">
                          {{ book.name }}
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="input-group-append">
                <span class="input-group-text" id="top-search-icon"
                  ><i class="lni-search"></i
                ></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </header>
    <div class="container-fluid">
      <div
        class="row justify-content-end"
        style="border-bottom: solid 1px #ddd"
      >
        <div class="col-md-8">
          <div class="navbar hidden" id="main-nav-bar">
            <ul class="justify-content-between">
              <li class="image">
                <a
                  href="#"
                  @click.prevent="toggleNav"
                  class="float-right mobile-only"
                  ><i class="lni-close"></i
                ></a>
                <img src="/logo.png" alt="logo" height="100px" />
              </li>
              <li v-for="(nav, i) in navs" :key="`nav-${i}`">
                <router-link
                  :to="{ name: 'resource', params: { slug: nav.slug } }"
                  >{{ nav.name }}</router-link
                >
                <div class="dropdown" v-if="nav.children.length > 0">
                  <div class="row">
                    <div
                      class="col-md-6"
                      v-for="(child, j) in nav.children"
                      :key="`${j}-submenu`"
                    >
                      <router-link
                        :to="{ name: 'resource', params: { slug: child.slug } }"
                        >{{ child.name }}</router-link
                      >
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <router-link :to="{ name: 'sell.index' }"
                  >Sell on Werezi</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    navs: {
      default() {
        return [];
      },
    },
  },

  mounted() {
    this.search();
  },

  data() {
    return {
      search_term: "",
      books: [],
    };
  },

  methods: {
    toggleNav() {
      document.getElementById("main-nav-bar").classList.toggle("hidden");
    },

    goToSearch() {
      this.$router.push({
        name: "search",
        query: { search: this.search_term },
      });
      this.search_term = "";
    },

    goToBook(book) {
      this.$router.push({ name: "resource", params: { slug: book.slug } });
      this.search_term = "";
    },

    search() {
      this.$axios
        .post("/api/v1/search", { term: this.search_term })
        .then((response) => {
          this.books = response.data.books;
        });
    },

    logout() {
      this.$axios.post("/api/v1/logout").then(() => {
        window.location.reload(true);
      });
    },
  },

  computed: {
    is_authenticated() {
      return this.$store.getters.getAuthUser.name == null ? false : true;
    },

    first_name() {
      return this.$store.getters.getAuthUser.first_name;
    },

    cart_items_count() {
      let total = 0;

      this.$store.getters.getCartItems.forEach((item) => {
        total += item.quantity;
      });

      return total;
    },
    filteredRows() {
      return this.books.filter((book) => {
        const bookTitle = book.name.toString().toLowerCase();
        const searchTerm = this.search_term.toLowerCase();

        return bookTitle.includes(searchTerm);
      });
    },
  },
};
</script>
