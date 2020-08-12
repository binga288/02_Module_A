<template>
  <div>
    <div class="d-flex flex-column">
      <router-link :to="{name:'home'}" class="text-decoration-none text-white-50 mx-5 mt-4">
        <div class="option">
          <img :src="require('@/assets/img/Home-img.png')" alt="Home" />
          音樂播放器
        </div>
      </router-link>
      <router-link :to="{name:'search'}" class="text-decoration-none text-white-50 mx-5 mt-4">
        <div class="option">
          <img :src="require('@/assets/img/Search-img.png')" alt="Home" />
          搜尋
        </div>
      </router-link>
    </div>
    <div id="effect" class="d-flex align-items-end justify-content-center"></div>
  </div>
</template>
<style>
#effect{
  height: 50vh;
}
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
<script>
export default {
  props:{
    audio:{
      type:Object
    }
  },
  mounted(){
    var eff = document.getElementById("effect");
    var width = eff.offsetWidth / 80 * 100;
    for (let i = 0; i < 80; i++) {
      var div = document.createElement("div");
      div.style.width = `${width}px`;
      div.style.height = "10px";
      eff.appendChild(div);
    }
    this.audio.audioEffect();
  }
};
</script>