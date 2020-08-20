<template>
  <div class="wrapper">
    <div class="top d-flex">
      <img
        :src="require(`@/assets/${album.img_path}`)"
        style="width:230px;height:230px;object-fit:cover;"
        alt
      />
      <div class="ml-4 d-flex justify-content-around flex-column">
        <h3 class="text-white">{{album.title}}</h3>
        <div class="text-white-50">{{album.artist}}</div>
        <div class="text-white-50">{{album.description}}</div>
        <button
          @click="album_play(album.songlist)"
          class="btn bg-success d-flex justify-content-center align-items-center"
          style="width:100px;height:60px;"
        >
          <img :src="require(`@/assets/img/play.png`)" alt />
        </button>
        <div class="text-white-50">總時間00:00&emsp;歌曲數量{{ album.songlist.length }}</div>
      </div>
    </div>
    <div class="content my-3 ml-4">
      <div class="song_main px-5 py-4" v-for="(song,key) in album.songlist" :key="song.id">
        <img @click="play(song)" class="ui" :src="require(`@/assets/img/play.png`)" alt />
        <div
          @click="join(song)"
          class="text-white pb-2 ui"
          style="font-size:50px;font-weight:bold;"
        >+</div>
        <div class="text-white" style="font-size:20px;font-weight:bold;">{{ key+1 }}</div>
        <div class="text-white">{{song.title}}</div>
        <div class="text-white-50">{{ song.artist }}</div>
        <div class="text-white-50">{{ song.composer }}</div>
        <div class="text-white-50">00:00</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    albums: Array,
    album_id: [String, Number],
    AudioPlay: Object,
  },
  data() {
    return {
      album: this.albums.find((x) => x.id == this.album_id),
    };
  },
  methods: {
    album_play(song_list) {
        if(confirm("是否取代目前播放清單")){
            this.AudioPlay.reset();
            this.AudioPlay.SetPlayList(song_list);
            this.AudioPlay.SetCurrentAudio(0);
            this.AudioPlay.play();
        }
    },
    join(song) {
      if (this.AudioPlay.PlayList.findIndex((e) => e.id == song.id) == -1) {
        this.AudioPlay.AddPlayList(song);
        this.AudioPlay.SetCurrentAudio(this.AudioPlay.PlayList.length - 1);
        this.AudioPlay.play();
        this.AudioPlay.ListShow = true;
      } else {
        alert("歌曲已存在");
      }
    },
    play(song) {
      if (this.AudioPlay.PlayList.findIndex((e) => e.id == song.id) == -1) {
        this.AudioPlay.AddPlayList(song);
        this.AudioPlay.SetCurrentAudio(this.AudioPlay.PlayList.length - 1);
        this.AudioPlay.play();
      } else {
        this.AudioPlay.SetCurrentAudio(
          this.AudioPlay.PlayList.findIndex((e) => e.id == song.id)
        );
        this.AudioPlay.play();
      }
    },
  },
};
</script>
<style scoped>
.top {
  padding: 60px 300px;
  background: #1d1d1d;
}
.song_main {
  display: grid;
  grid-template-columns: repeat(3, 50px) 5fr repeat(3, 1fr);
  align-items: center;
  grid-gap: 10px;
}
.ui:hover {
  cursor: pointer;
  opacity: 0.5;
}
</style>