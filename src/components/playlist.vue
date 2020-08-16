<template>
  <div class="wrapper text-white">
    <div class="list_main">
      <div
        class="list_content px-5 py-4"
        @click.stop="change(song.id)"
        :class="{'now':song.id == AudioPlay.NowPlaying.id}"
        v-for="(song,key) in AudioPlay.PlayList"
        :key="song.id"
      >
        <div class="text-white">{{ key+1 }}</div>
        <div>
          <div class="text-white">{{ song.title }}</div>
          <div class="text-white-50">{{ song.artist }}</div>
        </div>
        <div class="text-white-50">{{ song.album_title }}</div>
        <div class="text-white-50 text-right">00:00</div>
        <div
          @click.stop="remove(song.id)"
          style="font-size:20px;font-weight:bold;"
          v-if="song.id != AudioPlay.NowPlaying.id"
          class="remove text-white text-right"
        >X</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.list_content {
  display: grid;
  grid-template-columns: 50px 2fr 1fr 50px 50px;
  grid-column-gap: 5px;
  cursor: pointer;
}
.list_content:hover {
  background: rgba(255, 255, 255, 0.2);
}
.remove:hover {
  color: red !important;
  cursor: pointer;
}
.now {
  cursor: auto;
  background: rgba(255, 255, 255, 0.2);
}
</style>
<script>
export default {
  props: {
    AudioPlay: Object,
  },
  methods: {
    remove(id) {
      this.AudioPlay.PlayList = this.AudioPlay.PlayList.filter(
        (song) => song.id != id
      );
      this.AudioPlay.PlayIndex = this.AudioPlay.PlayList.findIndex(
        (song) => song.id == this.AudioPlay.NowPlaying.id
      );
    },
    change(id) {
      if (id != this.AudioPlay.NowPlaying.id) {
        this.AudioPlay.setCurrentAudio(
          this.AudioPlay.PlayList.findIndex((song) => song.id == id)
        );
        this.AudioPlay.play();
      }
    },
  },
};
</script>