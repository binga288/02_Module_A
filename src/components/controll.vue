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
    <div class="effect" v-show="playStatus"></div>
  </div>
</template>
<style >
.partical {
  position: absolute;
  width: 4px;
  height: 4px;
  animation-name: shoot, fade;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;
}

@keyframes shoot {
  0% {
    transform: translate(10vw, 40vh);
  }
}

@keyframes fade {
  to {
    opacity: 0;
  }
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
    playStatus:{
      type:Boolean
    }
  },
  mounted() {
    var main = document.querySelector(".effect");

    for (let i = 0; i < 100; i++) {
      let div = document.createElement("div");
      div.style.transform = `translate(${Math.floor(
        Math.random() * 20
      )}vw,${Math.floor(Math.random() * 100)}vh)`;
      div.style.background = `hsl(${Math.floor(Math.random() * 360)},100%,65%)`;
      div.style.animationDelay = Math.random() * -0.01 + "s";
      div.style.animationDuration = Math.random() + 1 + "s";
      div.classList = ["partical"];
      main.appendChild(div);
    }
  },
};
</script>