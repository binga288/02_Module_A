<template>
  <div>
    <div class="header text-hidden overflow-hidden">
      <div class="album-main-des">
        <div class="meta text-break text-white-50">
          <h1 class="text-white m-0">{{ album.title }}</h1>
          <div>{{ album.artist }}</div>
          <div>{{ album.songlist.length }}首歌曲 | X小時XX分鐘</div>
          <br />
          <div>{{ album.description }}</div>
        </div>
        <img class="img" :src="require(`@/assets/${album.img_path}`)" :alt="album.title" />
        <div class="action">
          <button
            type="button"
            @click="albumList(album)"
            class="btn btn-primary btn-lg btn-success"
          >
            <img :src="require('@/assets/img/play.png')" style="width:20px;" alt />
          </button>
        </div>
      </div>
    </div>
    <div class="song-list text-white d-flex flex-column" v-for="(song, index) in album.songlist" :key="song.title">
      <div class="song my-3 mx-5">
        <div class="d-flex align-items-center">
          <img
            class="songPlay"
            style="width: 20px;object-fit:cover;"
            :src="require('@/assets/img/play.png')"
            @click="$emit(`songPlay`,song,`play`)"
          />
        </div>
        <div class="songJoin text-left" style="font-size:35px;" @click="$emit(`songPlay`,song,`join`)">+</div>
        <div>
          <span>{{ index+1 }}</span>
        </div>
        <div>
          <div>{{ song.title }}</div>
          <div class="text-white-50" style="font-size:14px;">
            <span>演唱：{{ album.artist }}</span>
            <span class="ml-3">作曲：{{ song.composer }}</span>
            <span class="ml-3">{{ album.title }}</span>
          </div>
        </div>
        <div class="text-white-50 d-flex align-items-center justify-content-end">
          <span>00:00</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    albumId: {
      type: Number,
      required: true,
    },
    album: {
      type: Object,
      required: true,
    },
  },
  methods: {
    albumList: function (album) {
      this.$emit("albumList", album);
    },
  },
};
</script>


<style scoped>
.header {
  background: #1d1d1d;
}
.album-main-des {
  width: 1000px;
  display: grid;
  grid-template-areas:
    "img meta"
    "img action";
  grid-template-columns: 250px 1fr;
  grid-row-gap: 10px;
  margin: 48px auto;
}
.img {
  width: 220px;
  height: 220px;
  object-fit: cover;
  grid-area: img;
}
.meta {
  grid-area: meta;
  width: 600px;
}
.action {
  grid-area: action;
}
.song-list {
  width: 100%;
}
.song-list:hover {
  transition: 0.5s;
  background: rgba(255, 255, 255, 0.1);
}
.song {
  display: grid;
  grid-template-columns: 50px 50px 30px 1fr 1fr;
}
.songJoin:hover {
  color: green;
  cursor: pointer;
}
.songPlay:hover {
  opacity: 0.5;
  cursor: pointer;
}
</style>