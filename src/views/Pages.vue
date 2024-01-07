<template>
  <div>
    <div v-html="content"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.fetch()
  },

  data() {
    return {
      content: ''
    }
  },

  methods: {
    fetch() {
      this.$axios.get(`/api/v1/pages/${this.page}`).then(response => {
        this.content = response.data
      })
    }
  },

  computed: {
    page() {
      return this.$route.params.page
    }
  },

  watch: {
    page() {
      this.fetch()
    }
  }
}
</script>