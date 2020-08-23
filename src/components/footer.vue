<template>
  <div class="wrapper mx-4">
    <div class="d-flex">
      <img
        v-if="AudioPlayer.nowPlay.img_path"
        style="width:90px;height:80px;object-fit:cover;"
        :src="require(`@/assets/${AudioPlayer.nowPlay.img_path}`)"
      />
      <div class="ml-3 d-flex align-items-center">
        <span class="text-white">{{AudioPlayer.nowPlay.title}}</span>
        <span class="text-white-50 ml-1" style="font-size:15px;">{{AudioPlayer.nowPlay.artist}}</span>
      </div>
    </div>
    <div class="d-flex flex-column">
      <div class="ui d-flex justify-content-center mb-3">
        <img
          :class="{'disabled':AudioPlayer.playIndex - 1 < 0}"
          @click="chaAudio(-1)"
          :src="require(`@/assets/img/prev.png`)"
          alt
        />
        <img
          v-if="!AudioPlayer.playing"
          @click="play()"
          class="mx-5"
          :src="require(`@/assets/img/play.png`)"
          alt
        />
        <img v-else @click="pause()" class="mx-5" :src="require(`@/assets/img/pause.png`)" alt />
        <img
          :class="{'disabled':AudioPlayer.playIndex + 1 >= AudioPlayer.playList.length}"
          @click="chaAudio(1)"
          :src="require(`@/assets/img/next.png`)"
          alt
        />
      </div>
      <div class="d-flex align-items-center">
        <div
          @click="chaPlaybar($event)"
          class="progress"
          style="height:8px;cursor:pointer;width:100%;"
        >
          <div class="progress-bar bg-success" style="width:0%;pointer-events: none;"></div>
        </div>
        <div class="text-white ml-2" id="time"></div>
      </div>
    </div>
    <div class="d-flex justify-content-end align-items-center">
      <img
        style="height:30px;cursor:pointer;"
        @click="showList()"
        :src="require(`@/assets/img/playlist.png`)"
        alt
      />
      <img :src="require(`@/assets/img/sound.png`)" class="mx-4" alt />
      <div
        class="progress"
        @click="chaSoundbar($event)"
        style="height:8px;cursor:pointer;width:35%;"
      >
        <div class="progress-bar bg-success" style="width:0%;pointer-events: none;"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    AudioPlayer: Object,
  },
  computed: {
    duration: function () {
      return this.AudioPlayer.nowPlay.duration
        ? this.AudioPlayer.formatDate(this.AudioPlayer.nowPlay.duration)
        : "00:00";
    },
  },
  methods: {
    chaPlaybar(e) {
      let schadule = e.offsetX / e.target.offsetWidth;
      e.target.children[0].style.width = schadule * 100 + "%";
      this.AudioPlayer.chaCurrentTime(schadule);
    },
    chaSoundbar(e) {
      let schadule = e.offsetX / e.target.offsetWidth;
      e.target.children[0].style.width = schadule * 100 + "%";
      this.AudioPlayer.chaSound(schadule);
    },
    pause() {
      this.AudioPlayer.pause();
    },
    play() {
      this.AudioPlayer.play();
    },
    chaAudio(num) {
      let result = this.AudioPlayer.playIndex + num;
      console.log(result);
      if (result >= 0 && result < this.AudioPlayer.playList.length) {
        this.AudioPlayer.setCurrentAudio(result);
        this.AudioPlayer.play();
      }
    },
    showList() {
      this.AudioPlayer.listShow = !this.AudioPlayer.listShow;
    },
  },
};
</script>
<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  align-items: center;
  height: 100%;
}
.ui img {
  cursor: pointer;
}
.disabled {
  cursor: auto;
  opacity: 0.5;
}
</style>