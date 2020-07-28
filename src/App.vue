<template>
  <div id="app">
    <div class="main">
      <div class="left">
        <Controll />
      </div>
      <div class="center">
        <transition name="fade" mode="out-in">
          <router-view @albumList="albumList" :album="album" :audio="AudioPlayer" :playList="playList"/>
        </transition>
      </div>
      <div class="player">
        <Footer
          @playBtn="playBtn"
          @soundCha="soundCha"
          @scheduleCha="scheduleCha"
          @setSong="setSong"
          :currentTime="currentTime"
          :durationTime="durationTime"
          :playStatus="AudioPlayer.playStatus"
          :playIndex="AudioPlayer.playIndex"
          :listLength="AudioPlayer.playlist.length"
          :playList="playList"
          :album="album"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Controll from "@/components/controll.vue";
import Footer from "@/components/footer.vue";
import audio from "@/audio.js";

export default {
  name: "App",
  components: {
    Controll,
    Footer,
  },
  data() {
    return {
      AudioPlayer: audio(),
      currentTime: "00:00",
      durationTime: "00:00",
      soundBar: null,
      scheduleBar: null,
      playList: null,
      songName: "",
      songArtist: "",
      album: null,
    };
  },
  methods: {
    defaultEvent() {
      this.AudioPlayer.on("ended", () => {
        let index = this.AudioPlayer.playIndex + 1;
        this.AudioPlayer.stop();

        if (index >= this.AudioPlayer.playlist.length) {
          this.AudioPlayer = audio();
          this.defaultPre(Array.from(this.playList, (x) => x.path));
          this.AudioPlayer.setCurrentAudio(0);
        } else {
          this.AudioPlayer.setCurrentAudio(index);
          this.AudioPlayer.play();
        }
      });

      this.AudioPlayer.on("canplaythrough", () => {
        let array = this.playList[this.AudioPlayer.playIndex];
        
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: array.name,
          album: this.album.name,
          artist: array.artist,
          artwork: [{ src: require(`@/assets/img/${this.album.img_path}`) }],
        });
        navigator.mediaSession.setActionHandler("previoustrack", () => {
          if (this.AudioPlayer.playIndex - 1 >= 0) {
            this.setSong(-1);
          }
        });
        navigator.mediaSession.setActionHandler("nexttrack", () => {
          if (this.AudioPlayer.playIndex + 1 < this.playList.length) {
            this.setSong(1);
          }
        });
      });

      this.AudioPlayer.on("timeupdate", () => {
        const current = this.AudioPlayer.getCurrentTime() | "00:00";
        const duration = this.AudioPlayer.getDuration() | "00:00";
        this.currentTime = this.AudioPlayer.formatTime(current);
        this.durationTime = this.AudioPlayer.formatTime(duration);

        this.scheduleBar.style.width = `${current / duration * 100}%`;
        localStorage.setItem("currentTime", current);
        localStorage.setItem("durationTime", duration);
      });
    },
    defaultPre(array) {
      let index = localStorage.getItem("playIndex") | 0;
      this.AudioPlayer.setSonglist(array);
      this.AudioPlayer.setCurrentAudio(index);
      this.defaultEvent();
    },
    playBtn() {
      if (!this.AudioPlayer.playStatus && this.playList) {
        this.AudioPlayer.play();
      } else {
        this.AudioPlayer.stop();
      }
    },
    soundCha(e) {
      const sound = e.offsetX / e.target.clientWidth;
      this.soundBar.style.width = `${sound*100}%`;
      this.AudioPlayer.chaSound(sound);
    },
    scheduleCha(e) {
      const schedule = e.offsetX / e.target.clientWidth;
      
      this.scheduleBar.style.width = `${schedule*100}%`;
      this.AudioPlayer.setCurrentTime(
        this.AudioPlayer.getDuration() * schedule
      );
    },
    setSong(index) {
      let nextIndex = this.AudioPlayer.playIndex + index;
      this.AudioPlayer.setCurrentAudio(nextIndex);
      this.AudioPlayer.play();
    },
    albumList(album) {
      if (window.confirm("是否要取代目前播放清單")) {
        this.playList = album.playlist;
        this.album = album;
        this.AudioPlayer.stop();
        this.AudioPlayer = audio();
        localStorage.clear();
        this.defaultPre(Array.from(album.playlist, (x) => x.path));
        this.AudioPlayer.play();

        localStorage.setItem("list", JSON.stringify(album.playlist));
        localStorage.setItem("album", JSON.stringify(album));
        localStorage.setItem("playing", true);

        this.$router.push({name:"playlist"});
      }
    },
  },
  created() {
    if (localStorage.getItem("playing")) {
      this.playList = JSON.parse(localStorage.getItem("list"));
      this.album = JSON.parse(localStorage.getItem("album"));
      this.defaultPre(Array.from(this.playList, (x) => x.path));
    }
  },
  mounted() {
    document.addEventListener("keypress", (e) => {
      if (e.code == "Space") {
        this.playBtn();
      }
    });

    this.soundBar = document.getElementById("sound");
    this.scheduleBar = document.getElementById("schedule");
    if (localStorage.getItem("playing")) {
      this.soundBar.style.width = `${localStorage.getItem(
        "sound"
      )*100}%`;
    } else {
      this.soundBar.style.width = "100%";
      this.AudioPlayer.chaSound(1);
    }

    if (localStorage.getItem("playing")) {
      let current = localStorage.getItem("currentTime");
      let duration = localStorage.getItem("durationTime");

      this.AudioPlayer.setCurrentTime(current);
      this.currentTime = this.AudioPlayer.formatTime(current);
      this.durationTime = this.AudioPlayer.formatTime(duration);

      this.scheduleBar.style.width = `${current / duration * 100}%`;
    }
  },
};
</script>

<style>
* {
  font-family: "微軟正黑體";
  user-select: none;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  width: 100vw;
  height: 100vh;
}

.main {
  display: grid;
  grid-template-columns: 10vw 70vw 20vw;
  grid-template-rows: 90vh 10vh;
  grid-template-areas:
    "left center center"
    "player player player";
}

.left {
  position: fixed;
  width: 10%;
  height: 100%;
  background: black;
  grid-area: left;
}

.center {
  overflow-y: scroll;
  background: #111;
  grid-area: center;
}

.player {
  background: #333;
  grid-area: player;
  width: 100%;
  z-index: 3;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s;
}

button,input {
  outline: none;
}
</style>
