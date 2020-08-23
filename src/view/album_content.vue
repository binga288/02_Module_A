<template>
  <div>
    <div class="header d-flex">
      <img
        :src="require(`@/assets/${album.img_path}`)"
        style="width:200px;height:200px;object-fit:cover;"
        alt
      />
      <div class="ml-4 py-2" style="width:55%;">
        <h3 class="text-white mb-3">{{ album.title }}</h3>
        <div class="text-white-50 mb-3" style="overflow-wrap: break-word;">{{album.description}}</div>
        <div class="text-white-50 mb-3">
          <span class="mr-3">共 {{ album.songlist.length }} 首歌曲</span>
          <span class="mr-3">專輯總時間：{{countDuration}}</span>
        </div>
        <div class="d-flex">
          <div class="text-white-50">發表日期：{{ album.created_at.split("T")[0] }}</div>
          <button
            @click="albumPlay(album.songlist)"
            class="btn bg-success px-4 py-2 text-right ml-5"
            style="z-index:99;"
          >
            <img :src="require(`@/assets/img/play.png`)" alt />
          </button>
        </div>
      </div>
    </div>
    <div class="my-3">
      <div class="songlist px-5 py-3" v-for="(song,key) in album.songlist" :key="song.id">
        <img @click="play(song)" class="ui mt-2" :src="require(`@/assets/img/play.png`)" alt />
        <div @click="join(song)" class="ui text-white" style="font-size:50px;">+</div>
        <div class="text-white text-center" style="font-size:20px;">{{ key+1 }}</div>
        <div class="text-white">{{ song.title }}</div>
        <div class="text-white-50">{{ song.artist }}</div>
        <div class="text-white-50">{{ song.composer }}</div>
        <div class="text-white-50">{{ AudioPlayer.formatDate(song.duration) }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    albums: Array,
    id: [String, Number],
    AudioPlayer: Object,
  },
  computed: {
    album: function () {
      return this.albums[this.albums.findIndex((x) => x.id == this.id)];
    },
    countDuration: function(){
      let time = 0;
      this.album.songlist.forEach(song=>{
        time += song.duration;
      })
      return this.AudioPlayer.formatDate(time);
    }
  },
  methods: {
    albumPlay(list) {
      if (confirm("是否切換當前播放清單")) {
        this.AudioPlayer.reset();
        this.AudioPlayer.chaPlayList(list);
        this.AudioPlayer.setCurrentAudio(0);
        this.AudioPlayer.play();
      }
      this.AudioPlayer.listShow = true;
    },
    play(song) {
      let result = this.AudioPlayer.playList.findIndex((x) => x.id == song.id);
      if (result != -1) {
        this.AudioPlayer.setCurrentAudio(result);
        this.AudioPlayer.play();
      } else {
        this.AudioPlayer.addPlayList(song);
        this.AudioPlayer.setCurrentAudio(this.AudioPlayer.playList.length - 1);
        this.AudioPlayer.play();
      }
      this.AudioPlayer.listShow = true;
    },
    join(song) {
      let result = this.AudioPlayer.playList.findIndex((x) => x.id == song.id);
      if (result != -1) {
        alert("歌曲已在播放清單");
      } else {
        this.AudioPlayer.addPlayList(song);
        this.AudioPlayer.setCurrentAudio(this.AudioPlayer.playList.length - 1);
        this.AudioPlayer.play();
      }
      this.AudioPlayer.listShow = true;
    },
  },
};
</script>
<style scoped>
.header {
  padding: 80px 250px;
  background: #1d1d1d;
}
.songlist {
  display: grid;
  grid-template-columns: repeat(3, 50px) 4fr repeat(3, 1fr);
  align-items: center;
  grid-column-gap: 10px;
}
.ui:hover {
  opacity: 0.5;
  cursor: pointer;
}
</style>