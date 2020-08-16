<template>
  <div class="wrapper">
    <div class="menu ml-5 mt-5">
      <router-link :to="{name:'home'}" class="d-flex align-items-center mb-4">
        <img style="width:50px;object-fit:cover;" :src="require(`@/assets/img/home.png`)" alt />
        <div class="text-white ml-3" style="font-size:25px;">首頁</div>
      </router-link>
      <router-link :to="{name:'search'}" class="d-flex align-items-center mb-4">
        <img style="width:50px;object-fit:cover;" :src="require(`@/assets/img/search.png`)" alt />
        <div class="text-white ml-3" style="font-size:25px;">搜尋</div>
      </router-link>
    </div>
  </div>
</template>
<style scoped>
.router-link-exact-active div {
  color: rgba(255, 255, 255, 0.5) !important;
}
</style>