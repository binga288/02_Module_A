<template>
<<<<<<< HEAD
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
=======
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
>>>>>>> parent of 64212ad ([down]0820)
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
<<<<<<< HEAD
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
=======
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
>>>>>>> parent of 64212ad ([down]0820)
      }
      this.AudioPlayer.listShow = true;
    },
<<<<<<< HEAD
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
=======
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
>>>>>>> parent of 64212ad ([down]0820)
  },
};
</script>
<style scoped>
<<<<<<< HEAD
.header {
  padding: 80px 250px;
=======
.top {
>>>>>>> parent of 64212ad ([down]0820)
  background: #1d1d1d;
  width: 100%;
  padding: 50px 200px;
}
<<<<<<< HEAD
.songlist {
  display: grid;
  grid-template-columns: repeat(3, 50px) 4fr repeat(3, 1fr);
  align-items: center;
  grid-column-gap: 10px;
}
.ui:hover {
=======
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
>>>>>>> parent of 64212ad ([down]0820)
  opacity: 0.5;
  cursor: pointer;
}
</style>