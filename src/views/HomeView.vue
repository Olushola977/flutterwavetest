<script setup>
import ArrowIcon from "../components/icons/ArrowIcon.vue";
import CardItem from "../components/CardItem.vue";
import axios from "axios";
import { uuid } from 'vue-uuid';
// import router from "../router";
</script>

<script>
export default {
  data() {
    return {
      bannerPost: {},
      posts: [],
      loading: false,
      error: false,
      payment: {},
    };
  },
  methods: {
    async postsCall() {
      this.loading = true;
      await axios
        .get("https://techcrunch.com/wp-json/wp/v2/posts?per_page=6&offset=1")
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => {
          this.error = true;
          this.posts = error;
        });
      this.loading = false;
    },
    async bannerPostsCall() {
      await axios
        .get("https://techcrunch.com/wp-json/wp/v2/posts?per_page=1")
        .then((response) => {
          this.bannerPost = response.data[0];
        })
        .catch((error) => {
          this.bannerPost = error;
          this.error = true;
        });
    },
    makePayment() {
      FlutterwaveCheckout({
        public_key: "FLWPUBK_TEST-c231b931f2d7971e686c330d7a25874b-X",
        tx_ref: uuid.v1(),
        amount: 10385,
        currency: "NGN",
        payment_options: "card",
        callback: (payment) => {
          if (payment?.status === "successful") {
            setTimeout(
              window.location.replace("https://fluttertesttest.netlify.app/"),
              10000
            );
          } else {
            window.location.replace("https://fluttertesttest.netlify.app/");
          }
        },
        meta: {
          consumer_id: uuid.v1(),
          consumer_mac: "92a3-912ba-1192a",
        },
        customer: {
          email: "adeyeyeolushola977@gmail.com",
          phone_number: "08081806271",
          name: "Olushola Adeyeye Ebenezer",
        },
        customizations: {
          title: "DasDas",
          description: "Payment for premium contents",
          logo: "https://i.pinimg.com/736x/f7/d9/e4/f7d9e44087a551af6db03a9e31395071.jpg",
        },
      });
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
  mounted() {
    this.postsCall();
    this.bannerPostsCall();
    this.scrollToTop();
  },
};
</script>

<template>
  <main>
    <div v-if="loading" class="loading">
      <h1>Please wait, Blog posts is loading....</h1>
    </div>
    <div v-if="error" class="error">
      <h1>
        Error loading blog posts, please refresh this page or try again later...
      </h1>
    </div>
    <section v-if="!loading && !error" id="top-banner">
      <div class="banner-post-img">
        <img :src="`${bannerPost?.jetpack_featured_media_url}`" />
      </div>
      <div class="banner-post-cont">
        <div class="post-timeline">
          <span class="category">Front-end - </span>
          <span class="posted">1 Hour Ago</span>
        </div>
        <h4 v-html="bannerPost?.title?.rendered" class="title"></h4>
        <p v-html="bannerPost?.excerpt?.rendered" class="excerpt"></p>
        <div class="more-info">
          <span>3 Min Read</span>
          <RouterLink
            :to="{ name: 'postDetail', params: { id: bannerPost?.id || 0 } }"
            class="read"
            >Read Full <ArrowIcon
          /></RouterLink>
        </div>
      </div>
    </section>
    <section v-if="!loading && !error" id="blog-posts">
      <CardItem
        v-for="post in posts"
        v-bind:key="post?.id"
        category="Frontend"
        posted="1 Hour Ago"
        :title="post?.title?.rendered"
        :imageName="post?.jetpack_featured_media_url"
        :excerpt="post?.excerpt?.rendered"
        :postId="post?.id"
        readTime="3 Min Read"
      />
    </section>
    <footer>
      <div class="footer-content">
        <h3 class="join-us">Join our Team of Writers</h3>
        <p>
          On dasdas, writers earn a living doing what they love.<br />
          Getting started is easy. Just pay a one time <span>$25</span> fee and
          everything is ready to go.
        </p>
        <button @click="makePayment" class="join-button">JOIN US</button>
      </div>
    </footer>
  </main>
</template>

<style scoped>
.loading, .error {
  text-align: center;
  width: 100%;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
#top-banner {
  border: 1px solid #F5F5F5;
  border-radius: 5px;
  padding: 8px;
  margin: 20px 0px 40px;
  gap: 10px;
}
#blog-posts {
  flex-wrap: wrap;
  justify-content: space-between;
}
section {
  display: flex;
  background: #FFFFFF;
  height: auto;
  width: 100%;
}
.banner-post-img {
  width: 40%;
  height: auto;
}
.banner-post-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.banner-post-cont {
  width: 60%;
}
.category {
  font-weight: 700;
  font-size: 12px;
}
.posted {
  font-weight: 500;
  font-size: 12px;
}
.title {
  color: #2C2C2C;
  font-weight: 900;
  font-size: 22px;
  margin: 10px 0px;
}
.excerpt {
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 20px;
}
.more-info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}
.read {
  display: flex;
  align-items: center;
  color: #1473E6;
}
.join-us {
  font-weight: 500;
  font-size: 32px;
  color: #2C2C2C;
}
footer {
  display: flex;
  justify-content: center;
  margin: 20px 0 40px;
}
.footer-content {
  width: 55%;
  text-align: center;
}
.footer-content p {
  font-weight: 400;
  font-size: 22px;
  margin-bottom: 30px;
}
.footer-content p span {
  font-weight: 600;
}
.join-button {
  font-weight: 500;
  font-size: 18px;
  background: #000000;
  padding: 12px 55px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
}
@media (min-width: 320px) {
  #top-banner {
    flex-direction: column;
  }
  section {
    width: 100%;
  }
  .banner-post-img {
    width: 100%;
  }
  .banner-post-cont {
    width: 100%;
  }
  .footer-content {
    width: 80%;
  }
}
@media (min-width: 999px) {
  section,
  #top-banner {
    flex-direction: row;
  }
}
@media (min-width: 1400px) {
  .more-info {
    margin-top: 70px;
  }
}
</style>
