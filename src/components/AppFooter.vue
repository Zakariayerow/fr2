<template>
  <div class="footer">
    <div class="menus">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-4">
            <h2>Werezi</h2>
            <ul>
              <li>
                <router-link :to="{ name: 'pages', params: { page: 'about-us' }}"
                  >About Us</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'pages', params: { page: 'our-brands' }}"
                  >Our Brands</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'register' }"
                  >Join Us</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'pages', params: { page: 'privacy-policy' }}"
                  >Privacy Policy</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'pages', params: { page: 'sitemap' }}"
                  >Sitemap</router-link>
              </li>
            </ul>
          </div>
          <div class="col-md-4">
            <h2>Customer Service</h2>
            <ul>
              <li>
                <router-link :to="{ name: 'contact-us' }"
                  >Contact Us</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'pages', params: { page: 'faqs' }}"
                  >FAQs</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'pages', params: { page: 'shipping' }}"
                  >Shipping Info</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'pages', params: { page: 'return-policy' }}"
                  >Return Policy</router-link>
              </li>
            </ul>
          </div>
          <div class="col-md-4 newsletter-subscribe">
            <h2>Newsletter</h2>
            <p>Submit your email address to receive Werezi's offers & updates. You can view <router-link to="">Werezi's’s Privacy Policy</router-link>. Unsubscribe from our emails at any time.</p>
            <form>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="newsletter-email"
                />
                <div class="input-group-append">
                  <span class="input-group-text" id="newsletter-email"
                    ><i class="lni-envelope mr-2"></i
                  >Subscribe</span>
                </div>
              </div>
            </form>
            <div class="socials">
              <ul class="social-icons">
                <li>
                  <a href="https://www.facebook.com/werezi">
                    <i class="lni-facebook-filled"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/bnbuzz">
                    <i class="lni-twitter-filled"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/werezi/">
                    <i class="lni-instagram-filled"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">
      <div class="container-fluid">
        <div class="copyright-terms">
          <div class="text-right">©2020 e-commerce</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>