<template>
  <div id="app">
    <div class="left">
      <Control  :AudioPlay="AudioPlay"/>
    </div>
    <div class="center">
      <router-view :AudioPlay="AudioPlay"></router-view>
    </div>
    <div class="right" v-if="AudioPlay.ListShow">
      <PlayList :AudioPlay="AudioPlay"/>
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
import PlayList from "@/components/list.vue";
export default {
  name: "App",
  components: {
    Control,
    Footer,
    PlayList
  },
  data() {
    return {
      AudioPlay: new AudioPlay(),
    };
  },
  computed: {
    Played: function () {
      return this.AudioPlay.Played;
    },
    PlayIndex: function () {
      return this.AudioPlay.PlayIndex;
    },
    PlayList: function () {
      return this.AudioPlay.PlayList;
    }
  },
  watch: {
    Played: function () {
      localStorage.setItem("played", this.Played);
    },
    PlayIndex: function () {
      localStorage.setItem("playindex", this.PlayIndex);
    },
    PlayList: function () {
      localStorage.setItem("playlist", JSON.stringify(this.PlayList));
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
  text-decoration: none !important;
  font-family: "微軟正黑體" !important;;
  user-select: none;
}
#app {
  display: grid;
  grid-template-columns: 20vw 50vw 30vw;
  grid-template-rows: 90vh 10vh;
  grid-template-areas:
    "left center right"
    "player player player";
}
.left {
  grid-area: left;
  background: black;
}
.center {
  grid-area: center;
  background: #111;
  grid-column-end: span 2;
  overflow-y: scroll;
}
.player {
  grid-area: player;
  background: #1d1d1d;
}
.right {
  grid-area: right;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
  overflow-y: scroll;
}
</style>
