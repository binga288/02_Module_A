<template>
  <div class="footer-content">
    <div class="footer-left" v-if="playIndex >= 0 && playList">
      <img :src="require(`@/assets/img/${albumImg}`)" />
      <div class="song-title" style="margin: 0 20px;">
        <div style="color:white;">{{ songName }}</div>
        <div style="color:gray;font-size:15px;">{{ songArtist }}</div>
      </div>
    </div>
    <div class="footer-center">
      <div class="center-img">
        <img v-if="prevVerify" @click="setSong(-1)" :src="require('@/assets/img/back.png')" alt />
        <img v-else style="opacity: 0.5;" :src="require('@/assets/img/back.png')" alt />
        <span>
          <img
            v-if="!playStatus"
            @click="$emit('playBtn')"
            :src="require('@/assets/img/play.png')"
            alt
          />
          <img v-else @click="$emit('playBtn')" :src="require('@/assets/img/pause.png')" alt />
        </span>
        <img v-if="nextVerify" @click="setSong(1)" :src="require('@/assets/img/next.png')" alt />
        <img v-else style="opacity: 0.5;" :src="require('@/assets/img/next.png')" alt />
      </div>
      <div class="play-bar-contain">
        <div class="play-bar" style="cursor:pointer;" @click="scheduleCha" data-child="schedule">
          <div class="bar-body">
            <div class="bar-view" id="schedule"></div>
          </div>
        </div>
        <div class="time">{{ currentTime }}/{{ durationTime }}</div>
      </div>
    </div>
    <div class="footer-right">
      <div class="lyrics"></div>
      <div class="listBtn">
        <router-link :to="{name:'playlist'}">
          <img :src="require('@/assets/img/playlist.png')" alt />
        </router-link>
      </div>
      <div class="sound">
        <img :src="require('@/assets/img/sound.png')" alt />
        <div class="play-bar-contain">
          <div class="play-bar" @click="soundCha" data-child="sound" style="cursor:pointer;">
            <div class="bar-body">
              <div class="bar-view" id="sound"></div>
            </div>
          </div>
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
    }
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
  padding: 0 20px;
}
.footer-left {
  display: flex;
  align-items: center;
  grid-area: footer-left;
}
.footer-left img {
  height: 60px;
}
.footer-center {
  grid-area: footer-center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.center-img {
  width: 160px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.center-img img {
  height: 20px;
  cursor: pointer;
}
.play-bar-contain {
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
}
.play-bar {
  position: relative;
  width: 100%;
  height: 10px;
  overflow: hidden;
}
.bar-body {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: gray;
  border-radius: 2px;
  height: 4px;
  width: 100%;
  pointer-events: none;
}
.bar-view {
  width: 100%;
  background-color: green;
  height: 4px;
  transform-origin: left;
  transform: scaleX(0);
  pointer-events: none;
}
.time {
  text-align: center;
  color: gray;
  min-width: 100px;
  font-size: 13px;
}
.footer-right {
  grid-area: footer-right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.listBtn {
  width: 40px;
}
.listBtn img {
  height: 15px;
}

.sound {
  width: 150px;
  display: flex;
}
.sound img {
  height: 25px;
  margin-right: 10px;
}
</style>