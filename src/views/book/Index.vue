<template>
  <div class="single-product">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <zoomer
            :main_image="content.book.main_image"
            :other_images="content.book.other_images"
            class="zoomer"
          />
          <div class="details">
            <h4 style="letter-spacing: 1px; text-transform: uppercase;">
              Book Details
            </h4>
            <ul>
              <u
                ><li><strong>Title:</strong> {{ content.book.name }}</li></u
              >
              <u
                ><li><strong>ISBN: </strong> {{ content.book.isbn }}</li></u
              >
              <u>
                <li>
                  <strong>Publisher: </strong>
                  <router-link
                    :to="{
                      name: 'resource',
                      params: { slug: content.book.author.slug },
                    }"
                    >{{ content.book.author.name }}</router-link
                  >
                </li>
              </u>
              <u
                ><li><strong>Date: </strong> {{ content.book.date }}</li></u
              >
              <u
                ><li>
                  <strong>Length: </strong> {{ content.book.length }} pages
                </li></u
              >
            </ul>
          </div>
        </div>
        <div class="col-md-7">
          <div class="product-details">
            <h1 class="product-title">{{ content.book.name }}</h1>
            <h2 class="author">
              by
              <router-link
                :to="{
                  name: 'resource',
                  params: { slug: content.book.author.slug },
                }"
                >{{ content.book.author.name }}</router-link
              >
              <small class="text-muted ml-2">(Author)</small>
            </h2>
            <rating :rating="content.book.rating" :showCount="true" />
            <div class="formats">
              <h4>Formats</h4>
              <div
                :class="`format ${current_format == item.name ? 'active' : ''}`"
                v-for="(item, i) in content.book.formats"
                :key="`item-${i}`"
                @click.prevent="changeFormat(item)"
              >
                <p class="title">{{ item.name }}</p>
                <p class="price">
                  from KES <span>{{ $number.format(item.price) }}</span>
                </p>
              </div>
            </div>
            <div class="overview">
              <h4 style="letter-spacing: 1px; text-transform: uppercase;">
                Book Description
              </h4>
              <div v-html="content.book.synopsis"></div>
            </div>
          </div>
        </div>
        <div class="col-md-2">
          <div class="side-card">
            <p class="share">
              <span>Share</span>
              <a href="#"><i class="lni-envelope"></i></a>
              <a href="#"><i class="lni-facebook-filled"></i></a>
              <a href="#"><i class="lni-twitter-filled"></i></a>
            </p>
            <div class="card shadow content">
              <div class="card-body">
                <h4 class="card-title">
                  Best Offer
                  <span class="price"
                    >KES
                    {{ $number.format(content.book.best_offer.price) }}</span
                  >
                </h4>
                <p class="discount" v-if="content.book.best_offer.savings > 0">
                  Save up to KES
                  {{ $number.format(content.book.best_offer.savings) }}
                </p>
                <p class="discount" style="opacity: 0" v-else>.</p>
                <h4 class="type">{{ content.book.best_offer.name }}</h4>
                <p class="delivery">
                  <i class="lni-map mr-2"></i> Delivery countrywide
                </p>
                <p class="in-stock">In Stock.</p>
                <p class="in-stock-content">
                  Buy this book today and have it delivered right to you.
                </p>
                <hr />
                <div class="seller">
                  <h4 class="seller-name">
                    Sold By
                    <router-link
                      :to="{
                        name: 'resource',
                        params: { slug: content.book.best_offer.seller.slug },
                      }"
                      >{{ content.book.best_offer.seller.name }}</router-link
                    >
                  </h4>
                </div>
                <div class="add-to-cart mt-4 mb-4">
                  <a
                    href="#"
                    class="btn btn-primary btn-block btn-sm"
                    @click.prevent="addToCart(content.book.best_offer)"
                    ><i class="lni-cart float-left"></i> Add to your cart</a
                  >
                </div>
                <div class="more-options">
                  <a href="#" @click.prevent="fetchOffers">More Options</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-3"></div>
        <div class="col-md-7">
          <div class="product-details">
            <div class="excerpt">
              <b-button variant="success" v-b-modal.modal-scrollable
                >View Excerpt</b-button
              >
              <b-modal
                id="modal-scrollable"
                scrollable
                title="EXCERPT"
                hide-footer
              >
                <p class="my-4">{{ content.book.excerpt }}</p>
              </b-modal>
            </div>
          </div>
        </div>
        <div class="col-md-2 side-card">
          <div class="payment">
            <img src="/payment.png" alt="Logo" />
          </div>
          <div class="become-a-seller mt-5">
            <router-link to="" class="btn btn-primary btn-block"
              ><i class="lni-user mr-2"></i> Have one to sell? Sell it on werezi
            </router-link>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-7">
          <div class="suggested">
            <h4
              style="letter-spacing: 1px; text-transform: uppercase; font-size: 16px;"
              class="section-title"
            >
              Customers who viewed this item also viewed
            </h4>
            <hooper
              :itemsToShow="7"
              :autoPlay="true"
              :infiniteScroll="true"
              :wheelControl="false"
            >
              <slide v-for="(item, i) in content.suggested" :key="`item-${i}`">
                <div class="card shadow-hover">
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
              </slide>
            </hooper>
          </div>
        </div>
      </div>
    </div>
    <div class="all-offers" v-if="show_offers">
      <div class="close">
        <a href="#" @click.prevent="show_offers = false"
          ><i class="lni-close"></i
        ></a>
      </div>
      <div class="offers">
        <div class="header">
          <div class="row">
            <div class="col-md-3">
              <div class="image">
                <img :src="content.book.main_image" :alt="content.book.name" />
              </div>
            </div>
            <div class="col-md-9">
              <div class="brief">
                <h4 class="name">{{ content.book.name }}</h4>
                <p class="type">{{ current_format }}</p>
                <rating :rating="content.book.rating" :showCount="true" />
                <p class="author">
                  by
                  <router-link to="">{{
                    content.book.author.name
                  }}</router-link>
                  (Author)
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <h6 class="mb-3">
          {{ all_offers.length }} Offer{{ all_offers.length == 1 ? "" : "s" }}
        </h6>
        <table class="table table-striped">
          <tbody>
            <tr v-for="(offer, i) in all_offers" :key="`offer-item-${i}`">
              <td class="price">
                <sup>KES</sup>{{ $number.format(offer.price) }}
              </td>
              <td class="seller">
                Sold by
                <router-link
                  :to="{
                    name: 'resource',
                    params: { slug: offer.seller.slug },
                  }"
                  >{{ offer.seller.name }}</router-link
                >
                <rating />
              </td>
              <td class="cart">
                <a
                  href="#"
                  class="btn btn-primary btn-sm"
                  @click.prevent="addToCart(offer)"
                  ><i class="lni-cart mr-2"></i> Add to cart</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Zoomer from "./Zoomer";

export default {
  components: {
    Zoomer,
  },

  data() {
    return {
      added_to_cart: false,
      item_added: {},
      show_offers: false,
      current_format: this.content.book.main_format,
      all_offers: [],
    };
  },

  props: {
    content: {
      default() {
        return {};
      },
    },
  },

  methods: {
    addToCart(offer) {
      let item = {
        title: this.content.book.name,
        slug: this.content.book.slug,
        format: offer.name,
        price: offer.price,
        id: offer.id,
        seller: offer.seller,
        image: offer.image,
        author: this.content.book.author,
        rating: this.content.book.rating,
      };

      let my_cart = this.$cart.add(item);
      this.$store.dispatch("setCartItems", my_cart);
      this.added_to_cart = true;
      this.item_added = item;
      this.show_offers = false;
    },

    fetchOffers() {
      let data = {
        slug: this.$route.params.slug,
        format: this.current_format,
      };

      this.$axios.post(`/api/v1/books/offers`, data).then((response) => {
        this.content.book.best_offer = response.data.best_offer;
        this.all_offers = response.data.offers;
        this.show_offers = true;
      });
    },

    changeFormat(item) {
      this.current_format = item.name;
      this.fetchOffers();
    },
  },
};
</script>
