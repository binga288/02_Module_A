<template>
  <div class="content">
    <div
      :class="{'now':AudioPlay.NowPlay.id == song.id}"
      @click="AudioPlay.NowPlay.id != song.id?play(song):''"
      class="song_main px-3 py-4"
      v-for="(song,key) in AudioPlay.PlayList"
      :key="song.id"
    >
      <div class="text-white" style="font-size:20px;font-weight:bold;">{{ key+1 }}</div>
      <div>
        <div class="text-white">{{song.title}}</div>
        <div class="text-white-50">{{ song.artist }}</div>
      </div>
      <div class="text-white-50">{{ song.album_title }}</div>
      <div class="text-white-50">{{ song.composer }}</div>
      <div class="text-white-50">00:00</div>
      <div
        v-if="AudioPlay.NowPlay.id != song.id"
        @click.stop="remove(song)"
        class="remove text-right mr-3"
        style="font-size:20px;color:white"
      >X</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    AudioPlay: Object,
  },
  methods: {
    play(song) {
      this.AudioPlay.SetCurrentAudio(
        this.AudioPlay.PlayList.findIndex((e) => e.id == song.id)
      );
      this.AudioPlay.play();
    },
    remove(song) {
      this.AudioPlay.PlayList = this.AudioPlay.PlayList.filter(
        (x) => x.id != song.id
      );
      this.AudioPlay.PlayIndex = this.AudioPlay.PlayList.findIndex(
        (x) => x.id == this.AudioPlay.NowPlay.id
      );
      console.log(this.AudioPlay.PlayIndex)
    },
  },
};
</script>
<style scoped>
.song_main {
  display: grid;
  grid-template-columns: 50px 4fr repeat(4, 1fr);
  grid-gap: 10px;
}
.song_main:hover {
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
}
.remove:hover {
  cursor: pointer;
  color: red !important;
}
.now {
  cursor: auto !important;
  background: rgba(255, 255, 255, 0.1);
}
</style>