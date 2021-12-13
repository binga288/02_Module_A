<template>
<<<<<<< HEAD
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
=======
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
>>>>>>> parent of 64212ad ([down]0820)
          class="mx-5"
          :src="require(`@/assets/img/play.png`)"
          alt
        />
        <img v-else @click="pause()" class="mx-5" :src="require(`@/assets/img/pause.png`)" alt />
        <img
<<<<<<< HEAD
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
=======
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
>>>>>>> parent of 64212ad ([down]0820)
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
<<<<<<< HEAD
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
=======
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
>>>>>>> parent of 64212ad ([down]0820)
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
<<<<<<< HEAD
  grid-template-columns: 1fr 1.5fr 1fr;
  align-items: center;
  height: 100%;
}
.ui img {
  cursor: pointer;
}
.disabled {
  cursor: auto;
=======
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
>>>>>>> parent of 64212ad ([down]0820)
  opacity: 0.5;
}
</style>