<template>
  <div id="app">
<<<<<<< HEAD
    <div class="left">
      <Control :AudioPlayer="AudioPlayer" />
    </div>
    <div class="center">
      <router-view :AudioPlayer="AudioPlayer"></router-view>
    </div>
    <div class="right" v-if="AudioPlayer.listShow">
      <Playlist :AudioPlayer="AudioPlayer"/>
=======
    <div class="control">
      <Control />
    </div>
    <div class="center">
      <transition name="fade" mode="out-in">
        <router-view :AudioPlay="AudioPlay" />
      </transition>
    </div>
    <div class="right" v-if="AudioPlay.listShow">
      <SongList :AudioPlay="AudioPlay" />
>>>>>>> parent of 64212ad ([down]0820)
    </div>
    <div class="player">
      <Footer :AudioPlayer="AudioPlayer" />
    </div>
  </div>
</template>
<script>
import Control from "@/components/control.vue";
import Footer from "@/components/footer.vue";
<<<<<<< HEAD
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
=======
import AudioPlay from "@/audio.js";
import SongList from "@/components/PlayList.vue";
export default {
  components: {
    Control,
    Footer,
    SongList,
  },
  data() {
    return {
      AudioPlay: new AudioPlay()
    };
  },
  computed: {
    PlayList: function () {
      return this.AudioPlay.PlayList;
>>>>>>> parent of 64212ad ([down]0820)
    },
    played: function () {
      return this.AudioPlayer.played;
    },
    nowPlay: function () {
      return this.AudioPlayer.nowPlay;
    },
  },
  watch: {
<<<<<<< HEAD
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
=======
    PlayList: function () {
      localStorage.setItem("playlist", JSON.stringify(this.PlayList));
>>>>>>> parent of 64212ad ([down]0820)
    },
    PlayIndex: function () {
      localStorage.setItem("playindex", JSON.stringify(this.PlayIndex));
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
<<<<<<< HEAD
  text-decoration: none !important;
=======
  font-family: "微軟正黑體";
>>>>>>> parent of 64212ad ([down]0820)
  user-select: none;
  text-decoration: none !important;
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
    "control center right"
    "player player player";
}
<<<<<<< HEAD
.left {
=======
.control {
  grid-area: control;
>>>>>>> parent of 64212ad ([down]0820)
  background: black;
  grid-area: "left";
}
.center {
  background: #111;
<<<<<<< HEAD
  grid-area: center;
=======
  overflow-y: scroll;
>>>>>>> parent of 64212ad ([down]0820)
  grid-column-end: span 2;
}
.right {
  grid-area: right;
  background: rgba(0, 0, 0, 0.7);
  overflow-y: scroll;
  z-index: 3;
}
<<<<<<< HEAD
.right {
  background: rgba(0, 0, 0, 0.5);
  grid-area: right;
  z-index: 99;
  overflow-y: scroll;
=======
.player {
  grid-area: player;
  background: #1d1d1d;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.1s;
>>>>>>> parent of 64212ad ([down]0820)
}
.player {
  background: #1d1d1d;
  grid-area: player;
}
</style>
