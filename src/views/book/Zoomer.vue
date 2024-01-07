<template>
  <div class="row">
    <div class="col-md-2 image-previews desktop-only">
      <a href="" :class="main_image == spotlight ? 'active' : ''" @click.prevent="spotlight = main_image">
        <img :src="main_image" alt="tv"/>
      </a>
      <a href="" v-for="(image, i) in other_images" :key="`other-image-${i}`" :class="image == spotlight ? 'active' : ''" @click.prevent="spotlight = image">
        <img :src="image" :alt="image"/>
      </a>
    </div>
    <div class="col-md-10">
      <v-zoom :img="spotlight" :width="350" target="#prodImage"></v-zoom>
    </div>
  </div>
</template>

<script>
import vZoom from 'vue-zoom';

export default {
  components: {
    vZoom
  },

  data() {
    return {
      spotlight: this.main_image,
    }
  },

  props: {
    main_image: {
      required: true
    },
    other_images: {
      required: true
    }
  },

  methods: {
    
  },

  watch: {
    main_image(newval) {
      this.spotlight = newval
    }
  }
}
</script>