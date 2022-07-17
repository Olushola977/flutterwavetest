import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BlogPostView from "../views/BlogPostView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/post-detail/:id",
      name: "postDetail",
      // route level code-splitting
      // this generates a separate chunk (Post.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: BlogPostView,
    },
  ],
});

export default router;
