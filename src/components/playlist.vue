<template>
<<<<<<< HEAD
  <div>
    <div @click.stop="chaAudio(key)" class="songlist pl-3 pr-4 py-4" :class="{'playing':song.id == AudioPlayer.nowPlay.id}" v-for="(song,key) in AudioPlayer.playList" :key="song.id">
      <div class="text-white text-center" style="font-size:20px;">{{ key+1 }}</div>
      <div>
        <div class="text-white">{{ song.title }}</div>
        <div class="text-white-50">{{ song.artist }}</div>
      </div>
      <div class="text-white-50 text-right">{{song.album_title}}</div>
      <div class="text-white-50 text-right">{{ song.composer }}</div>
      <div class="text-white-50 text-right">00:00</div>
      <div v-if="song.id != AudioPlayer.nowPlay.id" @click.stop="remove(song.id)" class="remove text-white-50 text-right">X</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    AudioPlayer: Object,
  },
  methods:{
      remove(id){
          this.AudioPlayer.playList = this.AudioPlayer.playList.filter(x=>x.id != id);
          this.AudioPlayer.playIndex = this.AudioPlayer.playList.findIndex((x) => x.id == this.AudioPlayer.nowPlay.id);
      },
      chaAudio(key){
          if(this.AudioPlayer.playIndex != key){
              this.AudioPlayer.setCurrentAudio(key);
              this.AudioPlayer.play();
          }
      }
  }
};
</script>
<style scoped>
.songlist {
  display: grid;
  grid-template-columns: 50px 4fr repeat(4, 1fr);
  align-items: center;
  grid-column-gap: 5px;
  cursor: pointer;
}
.songlist:hover{
    background: rgba(255, 255, 255, 0.1);
}
.remove{
    font-size: 20px;
    z-index: 100;
}
.remove:hover{
    color: red !important;
    cursor: pointer;
}
.playing{
    background: rgba(255, 255, 255, 0.1);
    cursor: auto !important;
}
</style>
=======
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
>>>>>>> parent of 64212ad ([down]0820)
