<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2 desktop-only">
        <div class="filters">
          <h4 class="filter-title"></h4>
          <ul>
            <li
              v-for="(category, i) in content.filters.categories"
              :key="`category-${i}`"
            >
              <router-link
                :to="{ name: 'resource', params: { slug: category.slug } }"
                >{{ category.name }}</router-link
              >
            </li>
          </ul>
          <h4 class="filter-title mt-5">Authors</h4>
          <ul>
            <li
              v-for="(author, i) in content.filters.authors"
              :key="`author-${i}`"
            >
              <router-link
                :to="{ name: 'resource', params: { slug: author.slug } }"
                >{{ author.name }}</router-link
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-10">
        <div class="categories-list">
          <h4
            style="letter-spacing: 1px; text-transform: uppercase; font-size: 16px;"
            class="section-title"
          >
            {{ content.title }}
          </h4>
          <div class="row">
            <div
              class="col-md-3 mb-4"
              v-for="(item, i) in content.books"
              :key="`item-list-${i}`"
            >
              <!-- here -->
              <div class="card shadow border-0">
                <div class="card-img-top card-img">
                  <router-link
                    :to="{ name: 'resource', params: { slug: item.slug } }"
                    ><img :src="item.image" :alt="item.name"
                  /></router-link>
                </div>
                <div class="card-body text-center">
                  <div class="title">
                    <router-link
                      :to="{ name: 'resource', params: { slug: item.slug } }"
                      >{{ item.name }}</router-link
                    >
                  </div>
                  <div class="author">
                    <router-link
                      :to="{
                        name: 'resource',
                        params: { slug: item.author.slug },
                      }"
                      >{{ item.author.name }}</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <paginate
          v-model="content.pagination.current_page"
          :page-count="content.pagination.total_pages"
          :page-range="3"
          :margin-pages="2"
          :click-handler="clickCallback"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination float-right'"
          :page-class="'page-item'"
          :page-link-class="'page-link'"
          :prev-class="'page-item'"
          :next-class="'page-item'"
          :prev-link-class="`page-link`"
          :next-link-class="`page-link`"
        ></paginate>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      added_to_cart: false,
      show_filter: false,
      show_sort: false,
      pagination: {
        total_pages: 1,
        current_page: 1,
      },
      sort_by: "popularity",
      items: [],
      item_added_name: "",
    };
  },

  props: {
    content: {
      default() {
        return {
          data: {
            pagination: {},
          },
        };
      },
    },
  },

  methods: {
    clickCallback() {
      this.$emit("goToPage", this.content.data.pagination.current_page);
    },

    toggleSort() {
      document.getElementById("sort-items-section").classList.toggle("open");
    },

    toggleFilter() {
      document.getElementById("list-filters").classList.toggle("open");
    },

    addToCart(item) {
      let my_cart = this.$cart.add(item);
      this.$store.dispatch("setCartItems", my_cart);
      this.added_to_cart = true;
      this.item_added_name = item.name;
    },

    filterPrice(price_range) {
      this.$emit("filterPrice", price_range);
    },

    filterBrands(selected_authors) {
      this.$emit("filterBrands", selected_authors);
    },
  },
};
</script>
<style scoped>
.card-img {
  transition: 0.5s all ease-in-out;
}
.card-img:hover {
  transform: scale(1.2);
  z-index: 999;
}
</style>
