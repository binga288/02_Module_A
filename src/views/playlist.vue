<template>
  <div class="song-list">
    <div
      class="song-bg"
      v-for="(song, index) in playList"
      :class="{'song-now':index == audio.playIndex}"
      :key="song.name"
    >
      <div class="song" @click="songPlay(index)">
        <div class="song-left">
          <span>{{ index+1 }}</span>
        </div>
        <div class="song-center">
          <div>{{ song.name }}</div>
          <div style="color:gray;font-size:14px;">{{ album.artist }}</div>
        </div>
        <div class="song-right" style="color:gray;text-align:right;">
          <span>00:00</span>&emsp;
        </div>
        <div v-if="index != audio.playIndex" class="song-remove" @click.stop="songRemove(index)">X</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    album: {
      type: Object,
    },
    playList: {
      type: Array,
    },
    audio: {
      type: Object,
    },
  },
  methods: {
    songRemove(index) {
      let old = this.playList[this.audio.playIndex];
      this.playList.splice(index, 1);
      this.audio.playlist.splice(index, 1);
      this.audio.playIndex = this.playList.findIndex((e) => e.name == old.name);
      localStorage.setItem("playIndex", this.audio.playIndex);
      localStorage.setItem("list", JSON.stringify(this.playList));
    },
    songPlay(index) {
      if (this.audio.playIndex != index) {
        this.audio.setCurrentAudio(index);
        this.audio.play();
      }
    },
  },
};
</script>

<style scoped>
.song-list {
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}
.song-bg {
  width: 100%;
  cursor: pointer;
}
.song-bg:hover {
  transition: 0.5s;
  background: rgba(255, 255, 255, 0.1);
}
.song-now {
  background: rgba(255, 255, 255, 0.1);
  cursor: auto;
}
.song-now div {
  color: rgba(255, 255, 255, 0.8) !important;
}
.song {
  margin: 15px 150px;
  display: grid;
  grid-template-columns: 30px 1fr 1fr 30px;
}
.song-remove {
  color: darkgray;
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}
.song-remove:hover {
  color: rgba(255, 0, 0, 0.6);
  z-index: 100;
}
</style>