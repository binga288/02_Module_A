<template>
  <div id="app">
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
    </div>
    <div class="player">
      <Footer :AudioPlay="AudioPlay" />
    </div>
  </div>
</template>
<script>
import Control from "@/components/control.vue";
import Footer from "@/components/footer.vue";
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
    },
    PlayIndex: function () {
      return this.AudioPlay.PlayIndex;
    },
  },
  watch: {
    PlayList: function () {
      localStorage.setItem("playlist", JSON.stringify(this.PlayList));
    },
    PlayIndex: function () {
      localStorage.setItem("playindex", JSON.stringify(this.PlayIndex));
    },
  },
  mounted() {
    this.AudioPlay.defaultEvent();
  },
};
</script>
<style>
body {
  margin: 0;
  padding: 0;
}
* {
  font-family: "微軟正黑體";
  user-select: none;
  text-decoration: none !important;
}
#app {
  display: grid;
  grid-template-columns: 20vw 50vw 30vw;
  grid-template-rows: 90vh 10vh;
  grid-template-areas:
    "control center right"
    "player player player";
}
.control {
  grid-area: control;
  background: black;
}
.center {
  grid-area: center;
  background: #111;
  overflow-y: scroll;
  grid-column-end: span 2;
}
.right {
  grid-area: right;
  background: rgba(0, 0, 0, 0.7);
  overflow-y: scroll;
  z-index: 3;
}
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
}
</style>
