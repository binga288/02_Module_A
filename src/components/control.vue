<template>
  <div>
    <div class="wrapper mt-5 ml-4">
      <router-link :to="{name:'home'}" class="d-flex align-items-center">
        <img
          :src="require('@/assets/img/home.png')"
          style="width:50px;height:50px;object-fit:cover;"
          alt
        />
        <div class="text-white ml-4" style="font-size:30px;">首頁</div>
      </router-link>
      <router-link :to="{name:'search'}" class="d-flex align-items-center mt-4">
        <img
          :src="require('@/assets/img/search.png')"
          style="width:50px;height:50px;object-fit:cover;"
          alt
        />
        <div class="text-white ml-4" style="font-size:30px;">搜尋</div>
      </router-link>
    </div>
    <div id="effect" class="d-flex align-items-center " style="height:600px;"></div>
  </div>
</template>
<style scoped>
.router-link-exact-active div {
  color: rgba(255, 255, 255, 0.5) !important;
}
</style>
<script>
export default {
  props: {
    AudioPlay: Object,
  },
  mounted: function () {
    let effect = document.querySelector("#effect");
    let width = effect.offsetWidth / 80 * 500;
    for (let i = 0; i < 80; i++) {
      let div = document.createElement("div");
      div.style.width = width + "px";
      div.style.height = "1px";
      div.style.background = "rgba(0,255,0,0.7)";
      effect.appendChild(div);
    }
    this.audioEffect();
  },
  methods: {
    audioEffect() {
      let divs = document.querySelectorAll("#effect div");
      let source = this.AudioPlay.context.createMediaElementSource(this.AudioPlay.audio);
      let ana = this.AudioPlay.context.createAnalyser();

      source.connect(ana);
      ana.connect(this.AudioPlay.context.destination);
      ana.fftSize = 256;
      let buffer = ana.frequencyBinCount;
      let dataArray = new Uint8Array(buffer);

      function render(){
          ana.getByteFrequencyData(dataArray);
          divs.forEach((v,i)=>{
              v.style.transform = `scale(1,${dataArray[i]})`
          })
          requestAnimationFrame(render);
      }

      render();
    },
  },
};
</script>
