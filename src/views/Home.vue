<template>
  <div class="home">
    <div class="slider">
      <div class="container-fluid">
        <hooper
          class="home-page-slider"
          :autoPlay="false"
          :infiniteScroll="true"
          :wheelControl="false"
        >
          <slide v-for="(slide, i) in slider" :key="`slide-${i}`">
            <router-link
              :to="{ name: 'resource', params: { slug: slide.target } }"
            >
              <img :src="slide.image" :alt="slide.name" />
            </router-link>
          </slide>
          <hooper-navigation slot="hooper-addons" />
        </hooper>
      </div>
    </div>
    <div
      class="featured"
      v-for="(feature, j) in featured"
      :key="`feature-row-${j}`"
    >
      <div class="container-fluid">
        <div class="featured-card">
          <div class="featured-header">
            <router-link
              class="see-all"
              :to="{ name: 'resource', params: { slug: feature.target } }"
              >See All</router-link
            >
            <h3 class="title">{{ feature.title }}</h3>
          </div>
          <div class="featured-body">
            <hooper :settings="slider_settings">
              <slide v-for="(item, i) in feature.books" :key="`item-${i}`">
                <div class="card shadow-hover border-0 card-main">
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
              </slide>
            </hooper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$axios.get("/api/v1/home").then((response) => {
      this.slider = response.data.slider;
      this.featured = response.data.featured;
    });
  },

  data() {
    return {
      slider: [],
      featured: [],
      slider_settings: {
        wheelControl: false,
        infiniteScroll: true,
        centerMode: true,
        autoPlay: true,
        itemsToShow: 2,
        breakpoints: {
          900: {
            itemsToShow: 7,
          },
        },
      },
    };
  },
};
</script>

<style scoped>
.featured-body {
  overflow: visible;
}
.card-main {
  overflow: visible;
}
.card-img {
  overflow: visible;
}
.card-img {
  transition: 0.5s all ease-in-out;
}
.card-img:hover {
  transform: scale(1.5);
  z-index: 999;
}
</style>
