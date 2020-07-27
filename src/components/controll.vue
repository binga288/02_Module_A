<template>
  <div class="left_In">
    <router-link :to="{name:'home'}">
      <div class="option">
        <img :src="require('@/assets/img/Home-img.png')" alt="Home" />
        首頁
      </div>
    </router-link>
    <router-link :to="{name:'search'}">
      <div class="option">
        <img :src="require('@/assets/img/Search-img.png')" alt="Home" />
        搜尋
      </div>
    </router-link>
  </div>
</template>
<style scoped>
.left_In {
  display: flex;
  flex-direction: column;
}
.option {
  padding: 0 40px;
  font-size: 20px;
  margin-top: 40px;
}
.option img {
  height: 25px;
}

a {
  text-decoration: none;
  color: #aaa;
  cursor: pointer;
}

a:hover,
.router-link-exact-active {
  color: #eee;
}

</style>