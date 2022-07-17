<script setup>
import CardItem from "../components/CardItem.vue";
import axios from "axios";
</script>

<script>
export default {
  data() {
    return {
      morePosts: [],
      post: {},
      loadingPost: false,
      loadingMorePosts: false,
      error: false,
      postId: this.$route.params.id,
    };
  },
  methods: {
    async postCall(id) {
      this.loadingPost = true;
      await axios
        .get(`https://techcrunch.com/wp-json/wp/v2/posts/${id || this.postId}`)
        .then((response) => {
          this.post = response.data;
        })
        .catch((error) => {
          this.error = true;
          this.post = error;
        });
      this.loadingPost = false;
    },
    async morePostCall() {
      await this.axios
        .get("https://techcrunch.com/wp-json/wp/v2/posts?per_page=6")
        .then((response) => {
          const shufflePost = response?.data?.sort(() => 0.5 - Math.random());
          let selectedPosts = shufflePost.slice(0, 3);
          this.morePosts = selectedPosts;
        })
        .catch((error) => {
          this.morePosts = error;
          this.error = true;
        });
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
  mounted() {
    const postId = this.$route.params.id;
    this.postCall(postId);
    this.morePostCall();
    this.scrollToTop();
  },
  watch: {
    "$route.params.id"(newId, oldId) {
      this.postCall(newId);
      this.morePostCall();
      this.scrollToTop();
    },
  },
};
</script>

<template>
  <div class="blog-post">
    <div v-if="loadingPost" class="loading">
      <h1>Please wait while the Post is loading...</h1>
    </div>
    <section v-if="!loadingPost && post != {}" class="full-post">
      <div class="postProp">
        <span class="author"
          >By {{ post?.parsely?.meta?.author[0]?.name }}
        </span>
        <span class="datePosted"> 2 Month Ago </span>
      </div>
      <div class="post-content">
        <h4 v-html="post?.title?.rendered" class="post-title"></h4>
        <p v-html="post?.content?.rendered" class="content"></p>
      </div>
    </section>
    <section class="related-posts">
      <h4 class="more-article-title">More Articles</h4>
      <div v-if="!loadingMorePosts" class="more-article-posts">
        <CardItem
          v-for="post in morePosts"
          v-bind:key="post?.id"
          category="Frontend"
          posted="1 Hour Ago"
          :title="post?.title?.rendered"
          :imageName="post?.jetpack_featured_media_url"
          :excerpt="post?.excerpt?.rendered"
          :postId="post?.id"
          readTime="3 Min Read"
        />
      </div>
    </section>
  </div>
</template>

<style>
.wp-caption img {
  width: 100vw;
  height: auto;
  object-fit: contain;
}
.loading {
  text-align: center;
  width: 100%;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.blog-post {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.full-post {
  max-width: 90%;
  overflow: hidden;
}
.related-posts {
  width: 100%;
  margin-top: 40px;
}
.postProp {
  font-weight: 500;
  font-size: 12px;
}
.author {
  color: #4b4b4b;
}
.post-title {
  font-weight: 900;
  font-size: 32px;
  color: #2c2c2c;
  line-height: 38px;
  margin: 10px 0 20px;
}
.content {
  font-weight: 400;
  font-size: 14px;
  line-height: 27px;
}
.more-article-title {
  font-weight: 900;
  font-size: 24px;
  color: #2c2c2c;
}
.more-article-posts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}
@media (min-width: 768px) {
  .full-post {
    max-width: 70%;
  }
}
</style>
