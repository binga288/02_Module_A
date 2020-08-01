<template>
  <div class="song-list text-white d-flex flex-column">
    <div
      class="song-bg"
      v-for="(song, index) in playList"
      :class="{'song-now':index == audio.playIndex}"
      :key="song.title"
    >
      <div class="song px-4 py-3" @click="songPlay(index)">
        <div>
          <span>{{ index+1 }}</span>
        </div>
        <div>
          <div>{{ song.title }}</div>
          <div class="text-white-50" style="font-size:14px;">{{ song.artist }}</div>
        </div>
        <div class="text-white-50 text-right">
          <span>00:00</span>&emsp;
        </div>
        <div v-if="index != audio.playIndex" class="song-remove text-right" @click.stop="songRemove(index)">X</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
      this.audio.playlist = this.playList;
      this.audio.playIndex = this.playList.findIndex((e) => e.title == old.title);
      localStorage.setItem("playIndex", this.audio.playIndex);
      localStorage.setItem("list", JSON.stringify(this.playList));
    },
    songPlay(index) {
      if (this.audio.playIndex != index) {
        this.$emit('setSong',index);
      }
    },
  },
};
</script>

<style scoped>
.song-list {
  height: 90%;
  width: 450px;
  background: black;
  z-index: 10;
  overflow-y: scroll;
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
  display: grid;
  grid-template-columns: 30px 1fr 1fr 30px;
}
.song-remove {
  font-size: 20px;
  cursor: pointer;
}
.song-remove:hover {
  color: rgba(255, 0, 0, 0.6);
  z-index: 100;
}
</style>