<template>
  <div id="app">
    <div class="left">
      <Control :AudioPlayer="AudioPlayer" />
    </div>
    <div class="center">
      <router-view :AudioPlayer="AudioPlayer"></router-view>
    </div>
    <div class="right" v-if="AudioPlayer.listShow">
      <Playlist :AudioPlayer="AudioPlayer"/>
    </div>
    <div class="player">
      <Footer :AudioPlayer="AudioPlayer" />
    </div>
  </div>
</template>

<script>
import Control from "@/components/control.vue";
import Footer from "@/components/footer.vue";
import Playlist from "@/components/playlist.vue";
import AudioPlayer from "@/audio.js";

export default {
  name: "App",
  data() {
    return {
      AudioPlayer: new AudioPlayer(),
    };
  },
  computed: {
    playIndex: function () {
      return this.AudioPlayer.playIndex;
    },
    playList: function () {
      return this.AudioPlayer.playList;
    },
    played: function () {
      return this.AudioPlayer.played;
    },
    nowPlay: function () {
      return this.AudioPlayer.nowPlay;
    },
  },
  watch: {
    playList: function () {
      localStorage.setItem("playList", JSON.stringify(this.playList));
    },
    playIndex: function () {
      localStorage.setItem("playIndex", this.playIndex);
    },
    played: function () {
      localStorage.setItem("played", this.played);
    },
    nowPlay: function () {
      window.navigator.mediaSession.metadata = new window.MediaMetadata({
        title: this.nowPlay.title,
        artist: this.nowPlay.artist,
        album: this.nowPlay.album_title,
        artwork: [
          {
            src: require(`@/assets/${this.nowPlay.img_path}`),
            sizes: "360x180",
          },
        ],
      });
    },
  },
  components: {
    Control,
    Footer,
    Playlist,
  },
  mounted() {
    this.AudioPlayer.defauleEvent();
    window.navigator.mediaSession.setActionHandler(
      "play",
      function () {
        this.AudioPlayer.play();
      }.bind(this)
    );
    window.navigator.mediaSession.setActionHandler(
      "pause",
      function () {
        this.AudioPlayer.pause();
      }.bind(this)
    );
    window.navigator.mediaSession.setActionHandler(
      "nexttrack",
      function () {
        if (this.playIndex + 1 < this.playList.length)
          this.AudioPlayer.setCurrentAudio(this.playIndex + 1);
          this.AudioPlayer.play();
      }.bind(this)
    );
    window.navigator.mediaSession.setActionHandler(
      "previoustrack",
      function () {
        if (this.playIndex - 1 >= 0)
          this.AudioPlayer.setCurrentAudio(this.playIndex - 1);
          this.AudioPlayer.play();
      }.bind(this)
    );
    window.addEventListener("keypress",function(e){
      if(e.code == "Space"){
        if(this.AudioPlayer.playing){
          this.AudioPlayer.pause();
        }else{
          this.AudioPlayer.play();
        }
      }
    }.bind(this));
  },
};
</script>

<style>
* {
  text-decoration: none !important;
  user-select: none;
}
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "微軟正黑體";
  display: grid;
  grid-template-columns: 20vw 45vw 35vw;
  grid-template-rows: 90vh 10vh;
  grid-template-areas:
    "left center right"
    "player player player";
}
.left {
  background: black;
  grid-area: "left";
}
.center {
  background: #111;
  grid-area: center;
  grid-column-end: span 2;
  overflow-y: scroll;
}
.right {
  background: rgba(0, 0, 0, 0.5);
  grid-area: right;
  z-index: 99;
  overflow-y: scroll;
}
.player {
  background: #1d1d1d;
  grid-area: player;
}
</style>
