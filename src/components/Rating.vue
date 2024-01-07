<template>
  <div class="rating-component">
    <template v-if="the_rating.average > 0">
      <span v-for="i in the_rating.average" :key="`filled-star-${i}`" class="rating-star lni-star-filled"></span>
    </template>
    <span v-for="i in (5 - the_rating.average)" :key="`star-${i}`" class="rating-star lni-star"></span>
    <span class="count" v-if="showCount">{{ the_rating.total_ratings }} ratings</span>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      default() { return ''}
    },
    showCount: {
      default() { return false }
    }
  },

  computed: {
    the_rating() {
      if(typeof(this.rating) == 'object') {
        return this.rating
      } else if(typeof(this.rating) == 'number') {
        return {
          average: this.rating
        }
      }

      return {
        average: 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.rating-star {
  font-size: 14px;
  margin-right: 3px;
  opacity: .7;

  @media(max-width: 567px) {
    font-size: 5px !important;
  }
}
</style>