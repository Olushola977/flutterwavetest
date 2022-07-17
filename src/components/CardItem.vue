<script setup>
import ArrowIcon from "./icons/ArrowIcon.vue";
</script>
<script>
export default {
  props: {
    category: String,
    posted: String,
    title: String,
    excerpt: String,
    imageName: String,
    readTime: String,
    postId: Number,
  },
};
</script>

<template>
  <div class="blog-card">
    <div class="container">
      <div class="blog-post-thumbnail">
        <img :src="imageName" />
      </div>
      <div class="post-cont">
        <div>
          <span class="category"> {{ category }} - </span>
          <span class="posted"> {{ posted }} </span>
        </div>
        <h4 v-html="title" class="title"></h4>
        <div v-html="excerpt" class="excerpt"></div>
        <div class="more-info">
          <span> {{ readTime }} </span>
          <RouterLink
            :to="{ name: 'postDetail', params: { id: postId } }"
            class="read"
          >
            Read Full
            <ArrowIcon />
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-card {
  border: 1px solid #F5F5F5;
  border-radius: 5px;
  background: #FFFFFF;
  height: auto;
  margin-bottom: 40px;
  width: 31%;
  padding: 8px;
  position: relative;
}
.container {
  height: auto;
  width: 100%;
}
.blog-post-thumbnail {
  width: 100%;
  height: 150px;
  object-fit: contain;
}

.blog-post-thumbnail img {
  height: 100%;
}

.post-cont {
  width: 100%;
  padding: 10px 0px;
  height: 50%;
  display: flex;
  flex-direction: column;
  gap: 5px;
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
  font-weight: 700;
  font-size: 18px;
}

.excerpt {
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 10px;
}

.more-info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  margin-top: 10px;
  font-size: 12px;
  color: #6E6E6E;
}

.read {
  display: flex;
  align-items: center;
  color: #1473E6;
  font-weight: 700;
  font-size: 12px;
}

@media (min-width: 320px) {
  .blog-card {
    width: 100%;
  }
  .blog-post-thumbnail img {
    width: 100%;
  }
}

@media (min-width: 768px) {
  .blog-card {
    width: 45%;
  }
}

@media (min-width: 1024px) {
  .blog-card {
    width: 31%;
  }
  .blog-post-thumbnail {
    height: 250px;
  }
}
</style>
