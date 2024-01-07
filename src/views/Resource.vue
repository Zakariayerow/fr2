<template>
  <div>
    <template v-if="component == 'category'">
      <category
        :content="content"
        @goToPage="goToPage"
        @sortBy="sortBy"
        @filterPrice="filterPrice"
        @filterBrands="filterBrands"
      />
    </template>
    <template v-if="component == 'book'">
      <book :content="content" />
    </template>
  </div>
</template>


<script>
import Category from "./category/Index";
import Book from "./book/Index";

export default {
  components: {
    Category,
    Book,
  },

  mounted() {
    this.fetch();
  },

  data() {
    return {
      component: '',
      content: {},
      page: 1,
      sort: "popularity",
      filter_price: {
        min: 0,
        max: 0,
      },
      filter_brands: [],
    };
  },

  methods: {
    fetch() {
      this.$axios
        .get(
          `/api/v1/resource/${this.$route.params.slug}?page=${this.page}&sort=${this.sort}&min_price=${this.filter_price.min}&max_price=${this.filter_price.max}&brands=${this.filter_brands}`
        )
        .then((response) => {
          this.component = response.data.type;
          this.content = response.data.content;
        })
    },

    goToPage(data) {
      this.page = data;
      this.fetch();
    },

    sortBy(data) {
      this.sort = data;
      this.fetch();
    },

    filterPrice(price_range) {
      this.filter_price.min = price_range[0];
      this.filter_price.max = price_range[1];
      this.fetch();
    },

    filterBrands(selected_brands) {
      this.filter_brands = selected_brands
        .map((brand) => {
          return brand.id;
        })
        .join(",");

      this.fetch();
    },
  },

  computed: {
    current() {
      return this.$route.params.slug;
    },
  },

  watch: {
    current() {
      this.fetch();
    },
  },
};
</script>