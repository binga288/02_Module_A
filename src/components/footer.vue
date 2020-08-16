<template>
  <div class="wrapper align-items-center">
    <div class="footer-left d-flex align-items-center">
      <img
        v-if="img_exist"
        class="ml-3"
        style="width:80px;height:80px;object-fit:cover;"
        :src="require(`@/assets/${AudioPlay.NowPlaying.album_img}`)"
        alt
      />
      <div class="song_data ml-4">
        <div>
          <span class="text-white">{{AudioPlay.NowPlaying.title}}</span>
          <span class="text-white-50 ml-2" style="font-size:15px;">{{AudioPlay.NowPlaying.artist}}</span>
        </div>
      </div>
    </div>
    <div class="footer-center text-center">
      <div class="ui mb-3">
        <img
          :class="{'disabled':AudioPlay.PlayIndex -1 < 0}"
          :src="require(`@/assets/img/prev.png`)"
          @click="setCurrentAudio(-1)"
        />
        <img
          @click="chaPlay"
          :src="AudioPlay.Playing?require(`@/assets/img/pause.png`):require(`@/assets/img/play.png`)"
          class="mx-5"
          alt
        />
        <img
          :class="{'disabled':AudioPlay.PlayIndex + 1 >= AudioPlay.PlayList.length}"
          :src="require(`@/assets/img/next.png`)"
          @click="setCurrentAudio(1)"
        />
      </div>
      <div @click.stop="chaPlayBar($event)" class="progress" style="height:7px;cursor:pointer;">
        <div class="progress-bar bg-success" style="pointer-events: none;width:0%;"></div>
      </div>
    </div>
    <div class="footer-right mr-4 d-flex align-items-center justify-content-end">
      <img @click="AudioPlay.listShow = !AudioPlay.listShow;" :src="require(`@/assets/img/list.png`)" style="height:20px;cursor:pointer;" class="mr-4"  alt />
      <img :src="require(`@/assets/img/sound.png`)" style="height:30px;cursor:pointer;" class="mr-3" alt />
      <div
        @click.stop="chaSoundBar($event)"
        class="progress"
        style="height:7px;width:30%;cursor:pointer;"
      >
        <div class="progress-bar bg-success" style="pointer-events: none;width:0%;"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    AudioPlay: Object,
  },
  computed: {
    img_exist: function () {
      return this.AudioPlay.NowPlaying.album_img;
    },
  },
  methods: {
    chaPlayBar(e) {
      let schadule = e.offsetX / e.target.clientWidth;
      e.target.children[0].style.width = schadule * 100 + "%";
      this.AudioPlay.setCurrentTime(schadule);
    },
    chaSoundBar(e) {
      let schadule = e.offsetX / e.target.clientWidth;
      e.target.children[0].style.width = schadule * 100 + "%";
      this.AudioPlay.setVolume(schadule);
    },
    chaPlay() {
      this.AudioPlay.Playing ? this.AudioPlay.pause() : this.AudioPlay.play();
    },
    chaAudio(index) {
      this.AudioPlay.setCurrentAudio(index);
    },
    setCurrentAudio(next) {
      if (
        this.AudioPlay.PlayIndex + next < this.AudioPlay.PlayList.length &&
        this.AudioPlay.PlayIndex + next >= 0
      ) {
        this.AudioPlay.setCurrentAudio(this.AudioPlay.PlayIndex + next);
        this.AudioPlay.play();
      }
    },
  },
};
</script>
<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 30% 40% 30%;
  height: 100%;
}
.ui img {
  cursor: pointer;
  width: 25px;
  height: 25px;
}
.disabled {
  cursor: auto !important;
  opacity: 0.5;
}
</style>