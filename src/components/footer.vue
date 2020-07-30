<template>
  <div class="footer-content px-4">
    <div class="footer-left d-flex align-items-center" v-if="playIndex >= 0 && playList">
      <img :src="require(`@/assets/${albumImg}`)" />
      <div class="song-title ml-3">
        <span class="text-white">{{ songName }}</span>
        <span class="text-white-50 ml-1" style="font-size:15px;">{{ songArtist }}</span>
        <div class="text-white-50">lyrics</div>
      </div>
    </div>
    <div class="footer-center d-flex justify-content-center align-items-center flex-column">
      <div class="center-img d-flex justify-content-between mb-2">
        <img v-if="prevVerify" @click="setSong(-1)" :src="require('@/assets/img/back.png')" alt />
        <img v-else style="opacity: 0.5;" :src="require('@/assets/img/back.png')" alt />

        <img
          v-if="!playStatus"
          @click="$emit('playBtn')"
          :src="require('@/assets/img/play.png')"
          alt
        />
        <img v-else @click="$emit('playBtn')" :src="require('@/assets/img/pause.png')" alt />

        <img v-if="nextVerify" @click="setSong(1)" :src="require('@/assets/img/next.png')" alt />
        <img v-else style="opacity: 0.5;" :src="require('@/assets/img/next.png')" alt />
      </div>
      <div class="d-flex align-items-center" style="width:100%;">
        <div class="progress" style="height: 5px;width: 100%;cursor:pointer;" @click="scheduleCha">
          <div class="progress-bar bg-success" style="pointer-events:none;" id="schedule"></div>
        </div>
        <div class="text-white-50 ml-2">{{ currentTime }}/{{ durationTime }}</div>
      </div>
    </div>
    <div class="footer-right d-flex justify-content-end align-items-center">
      <div class="lyrics"></div>
      <div @click="$emit('songListShow')" class="listBtn" style="cursor:pointer;">
        <img :src="require('@/assets/img/playlist.png')" alt />
      </div>
      <div class="sound d-flex align-items-center">
        <img :src="require('@/assets/img/sound.png')" alt />
        <div class="progress" style="width: 100%;height: 5px;cursor:pointer;" @click="soundCha">
          <div class="progress-bar bg-success" id="sound" style="pointer-events:none;"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    durationTime: {
      type: String,
    },
    currentTime: {
      type: String,
    },
    playStatus: {
      type: Boolean,
    },
    playIndex: {
      type: Number,
    },
    listLength: {
      type: Number,
    },
    playList: {
      type: Array,
    },
    album: {
      type: Object,
    },
  },
  computed: {
    nextVerify() {
      return this.playIndex + 1 < this.listLength;
    },
    prevVerify() {
      return this.playIndex - 1 >= 0;
    },
    songName() {
      return this.playList ? this.playList[this.playIndex].name : " ";
    },
    songArtist() {
      return this.playList ? this.playList[this.playIndex].artist : " ";
    },
    albumImg() {
      return this.album ? this.album.img_path : " ";
    },
  },
  methods: {
    soundCha(e) {
      this.$emit("soundCha", e);
    },
    scheduleCha(e) {
      this.$emit("scheduleCha", e);
    },
    setSong(index) {
      if (
        this.playIndex + index >= 0 &&
        this.playIndex + index < this.listLength
      ) {
        this.$emit("setSong", index);
      }
    },
  },
};
</script>

<style scoped>
.footer-content {
  display: grid;
  grid-template-columns: 30% 40% 30%;
  grid-template-areas: "footer-left footer-center footer-right";
  height: 100%;
}
.footer-left {
  grid-area: footer-left;
}
.footer-left img {
  height: 80px;
  width: 80px;
  object-fit: cover;
}
.footer-center {
  grid-area: footer-center;
}
.center-img {
  width: 160px;
}
.center-img img {
  height: 20px;
  cursor: pointer;
}
.footer-right {
  grid-area: footer-right;
}
.listBtn {
  width: 40px;
}
.listBtn img {
  height: 15px;
}
.sound {
  width: 150px;
}
.sound img {
  height: 25px;
  margin-right: 10px;
}
</style>