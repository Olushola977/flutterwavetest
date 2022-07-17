<script setup>
import { RouterLink } from "vue-router";
import TwitterIcon from "../components/icons/TwitterIcon.vue";
import DribbleIcon from "../components/icons/DribbleIcon.vue";
import FigmaIcon from "../components/icons/FigmaIcon.vue";
import GithubIcon from "../components/icons/GithubIcon.vue";
</script>

<template>
  <header>
    <nav class="header">
      <div class="brand-image">
        <RouterLink to="/" class="brand-link">
          <img src="../assets/images/dasdas.png" />
        </RouterLink>
      </div>
      <div class="links">
        <ul class="nav-link">
          <li class="nav-item">
            <a href="#">
              <TwitterIcon />
            </a>
          </li>
          <li class="nav-item">
            <a href="#">
              <DribbleIcon />
            </a>
          </li>
          <li class="nav-item">
            <a href="#">
              <FigmaIcon />
            </a>
          </li>
          <li class="nav-item">
            <a href="#">
              <GithubIcon />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  padding: 10px 0px;
}
.brand-image {
  height: 100%;
}
.brand-image .brand-link {
  display: block;
}
.brand-image .brand-link img {
  height: 100%;
}
.links {
  width: 20%;
}
@media (max-width: 375px) {
  .links {
    width: 55%;
  }
}
@media (width: 425px) {
  .links {
    width: 45%;
  }
}
@media (width: 768px) {
  .links {
    width: 25%;
  }
}
.nav-link {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
}
.nav-item {
  padding: 0;
  margin: 10px;
  list-style-type: none;
}
.nav-item::before {
  content: "";
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #6E6E6E;
  position: absolute;
  left: -7px;
  top: 25%;
  bottom: 25%;
}
.nav-item:first-child::before {
  display: none;
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }
}
</style>
