<template>
  <div id="wrapper" class="inner_page contacts_page">
    <section id="Contact_form">
      <div class="container mt-5">
        <div class="row py-5">
          <div class="col-lg-4 col-sm-4 col-xs-12">
            <div class="about_info">
              <h2>Contact Info</h2>
              <p>
                <i class="lni-envelope" aria-hidden="true"></i> info@werezi.co.ke
              </p>
              <p>
                <i class="lni-phone" aria-hidden="true"></i> +254 20 8000251 | +254 799 626 359
              </p>
            </div>
          </div>
          <div class="col-lg-8 col-sm-8 col-xs-12">
            <div class="contact-form">
              <div class="server-msg" v-if="email_sent">
                <p>We have received your message and will get in touch with you soon.</p>
              </div>
              <div class="">
                <div class="row">
                  <form @submit.prevent="submit" id="contact-form">
                    <div class="form-group col-lg-12">
                      <h2>Get in touch</h2>
                    </div>
                    <div class="form-group col-lg-6 col-sm-6 col-xs-12">
                      <input
                        class="form-control"
                        v-model="data.name"
                        id="name"
                        name="name"
                        placeholder="Full Name"
                        type="text"
                      />
                    </div>
                    <div class="form-group col-lg-6 col-sm-6 col-xs-12">
                      <input
                        class="form-control"
                        v-model="data.email"
                        id="Email"
                        name="Email"
                        placeholder="Email"
                        type="text"
                      />
                    </div>
                    <div class="form-group col-lg-6 col-sm-6 col-xs-12">
                      <input
                        class="form-control"
                        v-model="data.subject"
                        id="Subject"
                        name="Subject"
                        placeholder="Subject*"
                        type="text"
                      />
                    </div>
                    <div class="form-group col-lg-6 col-sm-6 col-xs-12">
                      <input
                        class="form-control"
                        v-model="data.phone_number"
                        id="Phone_number"
                        name="Phone_number"
                        placeholder="Phone Number"
                        type="text"
                      />
                    </div>
                    <div class="form-group col-lg-12 col-sm-12 col-xs-12">
                      <div class="input-group">
                        <textarea
                          class="form-control"
                          rows="6"
                          v-model="data.message"
                          placeholder="Message"
                        ></textarea>
                      </div>
                    </div>
                    <div class="form-group col-lg-6 col-sm-6 col-xs-12">
                      <button
                        class="btn btn-primary btn-skin"
                        name="submit"
                        type="submit"
                      >Send Message</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email_sent: false,
      data: {
        name: "",
        email: "",
        phone_number: "",
        subject: "",
        message: ""
      }
    };
  },
  methods: {
    submit() {
      this.$axios.post("/api/v1/contact-us", this.data).then(() => {
        this.email_sent = true;
        setTimeout(() => {
          this.email_sent = false;
        }, 20000);
      })
    }
  }
};
</script>