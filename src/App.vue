<script setup>
import { RouterView } from "vue-router";
// import HelloWorld from "./components/HelloWorld.vue";
import HeaderView from "./partials/HeaderView.vue";
</script>

<template>
  <div class="page">
    <HeaderView />
    <RouterView />
  </div>
</template>

<style scoped></style>
