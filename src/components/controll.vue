<template>
  <div class="d-flex flex-column">
    <router-link :to="{name:'home'}" class="text-decoration-none text-white-50 mx-5 mt-4">
      <div class="option">
        <img :src="require('@/assets/img/Home-img.png')" alt="Home" />
        首頁
      </div>
    </router-link>
    <router-link :to="{name:'search'}" class="text-decoration-none text-white-50 mx-5 mt-4">
      <div class="option">
        <img :src="require('@/assets/img/Search-img.png')" alt="Home" />
        搜尋
      </div>
    </router-link>
  </div>
</template>
<style scoped>
.option {
  font-size: 25px;
}
.option img {
  height: 25px;
}
a:hover,
.router-link-exact-active {
  color: #eee !important;
}
</style>