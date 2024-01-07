<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <img src="/sell.png" alt="sell with us" class="img-top" />
        <h2 class="mt-4 text-center">Start selling on werezi today</h2>
        <p class="text-center">
          Sign up and start selling your books in very simple steps. We serve
          both businesses and individuals, established and start ups. Werezi
          provides you with all the resources to grow your business.
        </p>
        <p class="text-center">
          <router-link
            :to="{ name: 'sell.register' }"
            class="btn btn-primary mt-3"
            ><i class="lni-pencil mr-2"></i> Register</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
