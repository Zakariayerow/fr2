<template>
  <div class="container-fluid">
    <div class="row" v-if="books.length > 0">
      <div class="col-md-2">
        <div class="filters">
          <h4 class="filter-title">Categories</h4>
          <ul>
            <li
              v-for="(category, i) in filters.categories"
              :key="`category-${i}`"
            >
              <router-link
                :to="{ name: 'resource', params: { slug: category.slug } }"
                >{{ category.name }}</router-link
              >
            </li>
          </ul>
          <h4 class="filter-title mt-5"></h4>
          <ul>
            <li v-for="(author, i) in filters.authors" :key="`author-${i}`">
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
          <h4 class="section-title">Search: {{ search_term }}</h4>
          <div class="row">
            <div
              class="col-md-2 mb-4"
              v-for="(item, i) in books"
              :key="`item-list-${i}`"
            >
              <div class="card shadow">
                <div class="card-img-top">
                  <router-link
                    :to="{ name: 'resource', params: { slug: item.slug } }"
                    ><img :src="item.image" :alt="item.name"
                  /></router-link>
                  <div class="excerpt">
                    <router-link
                      :to="{ name: 'resource', params: { slug: item.slug } }"
                      >{{ item.excerpt }}</router-link
                    >
                  </div>
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
      <div class="col-md-12">
        <paginate
          v-model="pagination.current_page"
          :page-count="pagination.total_pages"
          :page-range="3"
          :margin-pages="2"
          :click-handler="changePage"
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
    <h4 class="section-title mt-5">Search: {{ search_term }}</h4>
    <div class="alert alert-info" v-if="books.length == 0">
      0 Books Found
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.search();
  },

  data() {
    return {
      pagination: {
        total_pages: 1,
        current_page: 1,
      },
      books: [],
      filters: {
        authors: [],
        categories: [],
      },
    };
  },

  methods: {
    search() {
      this.$axios
        .post("/api/v1/full-search", { search: this.search_term })
        .then((response) => {
          this.books = response.data.books;
          this.pagination = response.data.pagination;
          this.filters = response.data.filters;
        });
    },

    changePage() {},
  },

  computed: {
    search_term() {
      return this.$route.query.search;
    },
  },

  watch: {
    search_term() {
      this.search();
    },
  },
};
</script>
