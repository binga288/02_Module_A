<template>
  <div>
    <div class="header">
      <div class="album-main-des">
        <div class="meta">
          <h1 class="title">{{ album.name }}</h1>
          <div class="artist">{{ album.artist }}</div>
          <div class="stats">{{ album.playlist.length }}首歌曲 | X小時XX分鐘</div>
          <br />
          <div class="des">{{ album.description }}</div>
        </div>
        <img class="img" :src="require(`@/assets/img/${album.img_path}`)" :alt="album.name" />
        <div class="action">
          <button type="button" @click="albumList(album)" class="btn btn-primary btn-lg btn-success">
            <img :src="require('@/assets/img/play.png')" alt />
          </button>
        </div>
      </div>
    </div>
    <div class="song-list">
      <div class="song-bg" v-for="(song, index) in album.playlist" :key="song.name">
        <div class="song">
          <div class="song-left">
            <span>{{ index+1 }}</span>
          </div>
          <div class="song-center">
            <div>{{ song.name }}</div>
            <div style="color:gray;font-size:14px;">{{ album.artist }}</div>
          </div>
          <div class="song-right" style="color:gray;text-align:right;">
            <span>00:00</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import all_album from "@/albums";

export default {
  props: {
    albumName: {
      type: String,
      required: true,
    },
  },
  computed: {
    album: function () {
      return all_album.albums.find((album) => album.name == this.albumName);
    },
  },
  methods: {
    albumList: function (play,album) {
      this.$emit('albumList',play,album);
    },
  },
};
</script>

<style scoped>
.header {
  overflow: hidden;
  background: #1d1d1d;
  padding: 20px 0 0;
}
.album-main-des {
  display: grid;
  grid-template-areas:
    "img meta"
    "img action";
  grid-template-columns: 250px 1fr;
  width: 1000px;
  margin: 48px auto;
  grid-row-gap: 10px;
}
.img {
  width: 220px;
  height: 220px;
  grid-area: img;
}
.meta {
  grid-area: meta;
  width: 600px;
}
.title {
  color: white;
  margin: 0;
}
.artist,
.des,
.stats {
  word-break: break-all;
  color: gray;
}
.action {
  grid-area: action;
}
.addBtn {
  width: 50px;
  height: 50px;
  background-color: green;
  border-radius: 500px;
}
.song-list {
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
}
.song {
  margin: 10px 150px;
  display: grid;
  grid-template-columns: 30px 1fr 1fr;
}
.song-bg {
  width: 100%;
}
.song-bg:hover {
  transition: 0.5s;
  background: rgba(255, 255, 255, 0.1);
}
</style>