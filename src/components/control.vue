<template>
<<<<<<< HEAD
  <div>
    <div class="wrapper ml-5 mt-5">
      <router-link :to="{name:'home'}" class="d-flex align-items-center mb-4">
        <img :src="require('@/assets/img/home.png')" alt />
        <span style="font-size:30px;" class="text-white ml-3">首頁</span>
      </router-link>
      <router-link :to="{name:'search'}" class="d-flex align-items-center">
        <img :src="require('@/assets/img/search.png')" alt />
        <span style="font-size:30px;" class="text-white ml-3">搜尋</span>
      </router-link>
    </div>
    <div
      id="effect"
      style="height: 60vh;"
      class="d-flex align-items-center overflow-hidden"
    ></div>
  </div>
</template>
<script>
export default {
  props: {
    AudioPlayer: Object,
  },
  mounted() {
    let effect = document.getElementById("effect");
    let width = effect.offsetWidth / 80 * 200;
    for (let i = 0; i < 80; i++) {
      let div = document.createElement("div");
      div.style.background = "rgba(0,255,0,0.5)";
      div.style.width = `${width}px`;
      div.style.height = "10px";
      effect.appendChild(div);
    }
    this.AudioPlayer.effectEvent();
  }
};
</script>
<style scoped>
.router-link-exact-active span {
  color: #aaa !important;
}
</style>
=======
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
>>>>>>> parent of 64212ad ([down]0820)
