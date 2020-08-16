<template>
  <div class="wrapper">
    <div class="top d-flex">
      <div class="alubm_img mr-5">
        <img
          style="width:200px;height:200px;object-fit:cover;"
          :src="require(`@/assets/${album.img_path}`)"
          alt
        />
      </div>
      <div class="d-flex flex-column justify-content-around" style="width:600px;">
        <h3 class="text-white">{{ album.title }}</h3>
        <div class="text-white-50">{{ album.artist }}</div>
        <div class="text-white-50 text-break mt-2">{{ album.description }}</div>
        <button
          @click="chaAlbumList(album.songlist)"
          class="btn btn-success mt-3 d-flex justify-content-center align-items-center"
          style="width:90px;height:60px;"
        >
          <img :src="require(`@/assets/img/play.png`)" alt />
        </button>
      </div>
    </div>
    <div class="list_main my-4">
      <div class="list_content px-5 py-3" v-for="(song,key) in album.songlist" :key="song.id">
        <img @click.stop="play_song(song)" :src="require(`@/assets/img/play.png`)" class="play" />
        <div @click.stop="join_song(song)" style="font-size:40px;font-weight:bold;" class="join text-white">+</div>
        <div class="text-white">{{ key+1 }}</div>
        <div class="text-white">{{ song.title }}</div>
        <div class="text-white-50">{{ song.artist }}</div>
        <div class="text-white-50">{{ song.composer }}</div>
        <div class="text-white-50">{{ song.album_title }}</div>
        <div class="text-white-50 text-right">00:00</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    Albums: Array,
    id: [String, Number],
    AudioPlay: Object,
  },
  computed: {
    album: function () {
      return this.Albums.find((i) => i.id == this.id);
    },
  },
  methods: {
    chaAlbumList: function (list) {
      if (confirm("是否取代目前播放清單")) {
        this.AudioPlay.reset();
        this.AudioPlay.setPlayList(list);
        this.AudioPlay.setCurrentAudio(0);
        this.AudioPlay.play();
      }
    },
    join_song(song){
      if(this.AudioPlay.PlayList.findIndex(e=>e.id == song.id) == -1){
        this.AudioPlay.addPlayList(song);
      }else{
        alert("歌曲已在播放清單內");
      }
      this.AudioPlay.listShow = true;
    },
    play_song(song){
      if(this.AudioPlay.PlayList.findIndex(e=>e.id == song.id) == -1){
        this.AudioPlay.addPlayList(song);
        this.AudioPlay.setCurrentAudio(this.AudioPlay.PlayList.length - 1);
        this.AudioPlay.play();
      }else{
        this.AudioPlay.setCurrentAudio(this.AudioPlay.PlayList.findIndex(e=>e.id == song.id));
        this.AudioPlay.play();
      }
      this.AudioPlay.listShow = true;
    }
  },
};
</script>
<style scoped>
.top {
  background: #1d1d1d;
  width: 100%;
  padding: 50px 200px;
}
.list_content {
  display: grid;
  grid-template-columns: repeat(3, 50px) 5fr repeat(4, 1fr);
  grid-column-gap: 10px;
  align-items: center;
}
.list_content:hover {
  background: rgba(255, 255, 255, 0.2);
}
.play:hover,
.join:hover {
  opacity: 0.5;
  cursor: pointer;
}
</style>