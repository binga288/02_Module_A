<template>
  <div id="app">
    <div class="main">
      <div class="left">
        <Controll :playStatus="AudioPlayer.playStatus" :audio="AudioPlayer" />
      </div>
      <div class="center">
        <songList
          v-if="listShow"
          @setSong="setNextSong"
          class="songList"
          :audio="AudioPlayer"
          :playList="playList"
        />
        <transition name="fade" mode="out-in">
          <router-view @albumList="albumList" @songPlay="songPlay" />
        </transition>
      </div>
      <div class="player">
        <Footer
          @playBtn="playBtn"
          @scheduleCha="scheduleCha"
          @setSong="setNextSong"
          @songListShow="songListShow"
          :currentTime="currentTime * 1"
          :durationTime="durationTime * 1"
          :audio="AudioPlayer"
          :playList="playList"
          :lyric_file="lyric_file"
          :lyric_type="lyric_type"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Controll from "@/components/controll.vue";
import Footer from "@/components/footer.vue";
import songList from "@/components/playlist.vue";
import audio from "@/audio.js";

export default {
  name: "App",
  components: {
    Controll,
    Footer,
    songList,
  },
  data() {
    return {
      AudioPlayer: audio(),
      currentTime: localStorage.getItem("currentTime") || 0,
      durationTime: localStorage.getItem("durationTime") || 0,
      soundBar: null,
      scheduleBar: null,
      playList: [],
      songName: "",
      songArtist: "",
      listShow: false,
      lyric_file: "",
      lyric_type: "",
    };
  },
  methods: {
    songListShow() {
      this.listShow = !this.listShow;
    },
    defaultEvent() {
      this.AudioPlayer.on("ended", () => {
        let index = this.AudioPlayer.playIndex + 1;
        this.AudioPlayer.stop();

        if (index >= this.playList.length) {
          this.AudioPlayer = audio();
          this.defaultPre(this.playList);
          this.AudioPlayer.setCurrentAudio(0);
        } else {
          this.AudioPlayer.setCurrentAudio(index);
          this.AudioPlayer.play();
        }
        this.AudioPlayer.audioEffect();
      });
      this.AudioPlayer.on("canplaythrough", () => {
        this.durationTime = this.AudioPlayer.getDurationTime();
        let song = this.playList[this.AudioPlayer.playIndex];
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: song.titlw,
          album: song.album_name,
          artist: song.artist,
          artwork: [
            {
              src: require(`@/assets/${song.img_path}`),
              sizes: "320x180",
            },
          ],
        });
        navigator.mediaSession.setActionHandler("play", () => {
          this.AudioPlayer.play();
        });
        navigator.mediaSession.setActionHandler("pause", () => {
          this.AudioPlayer.stop();
        });
        navigator.mediaSession.setActionHandler("previoustrack", () => {
          if (this.AudioPlayer.playIndex - 1 >= 0)
            this.setNextSong(this.AudioPlayer.playIndex - 1);
        });
        navigator.mediaSession.setActionHandler("nexttrack", () => {
          if (this.AudioPlayer.playIndex + 1 < this.playList.length)
            this.setNextSong(this.AudioPlayer.playIndex + 1);
        });
        this.lyric_file = "";
        this.lyric_type = "";
        if (song.lyric_path) {
          fetch(`${process.env.BASE_URL}${song.lyric_path}`)
            .then((res) => res.text())
            .then((res) => {
              this.lyric_file = res;
              this.lyric_type = song.lyric_path.match(/(\w{3})$/g)[0];
            });
        }
      });

      this.AudioPlayer.on("timeupdate", () => {
        this.currentTime = this.AudioPlayer.getCurrentTime();
        this.scheduleBar.style.width = `${
          (this.currentTime / this.durationTime) * 100
        }%`;
        localStorage.setItem("currentTime", this.currentTime);
        localStorage.setItem("durationTime", this.durationTime);
      });
    },
    defaultPre(obj) {
      let index = localStorage.getItem("playIndex") | 0;
      this.AudioPlayer.setSonglist(obj);
      this.AudioPlayer.setCurrentAudio(index);      
      this.defaultEvent();
    },
    playBtn() {
      if (
        !this.AudioPlayer.playStatus &&
        this.playList &&
        this.AudioPlayer.playing
      ) {
        this.AudioPlayer.play();
      } else {
        this.AudioPlayer.stop();
      }
    },
    scheduleCha(e, type) {
      const schedule = e.offsetX / e.target.clientWidth;
      if (type == "playBar") {
        this.scheduleBar.style.width = `${schedule * 100}%`;
        this.AudioPlayer.setCurrentTime(this.durationTime * schedule);
      } else {
        this.soundBar.style.width = `${schedule * 100}%`;
        this.AudioPlayer.chaSound(schedule);
      }
    },
    setNextSong(index) {
      this.AudioPlayer.setCurrentAudio(index);
      this.AudioPlayer.play();
    },
    songPlay(song, type) {
      if (this.AudioPlayer.requireTry(song)) {
        return false;
      }
      if (this.playList.some((e) => e.title == song.title)) {
        type == "join"
          ? alert("歌曲已被加入")
          : this.setNextSong(
              this.playList.findIndex((e) => e.title == song.title)
            );
      } else {
        this.playList.push(song);
        this.AudioPlayer.playlist = this.playList;
        this.listShow = true;
        if (!this.AudioPlayer.playing) {
          this.PrePlay();
        } else {
          type == "join" ? "" : this.setNextSong(this.playList.length - 1);
          localStorage.setItem("list", JSON.stringify(this.playList));
        }
      }
    },
    albumList(album) {
      if (window.confirm("是否要取代目前播放清單")) {
        this.playList = album.songlist;
        this.AudioPlayer.stop();
        this.AudioPlayer = audio();
        this.PrePlay();
      }
    },
    PrePlay() {
      localStorage.clear();
      this.defaultPre(this.playList);
      this.AudioPlayer.play();

      localStorage.setItem("playing", true);
    },
  },
  created() {
    let list = JSON.parse(localStorage.getItem("list"));
    this.playList = list ? list : [];
    list ? this.defaultPre(this.playList) : "";
  },
  mounted() {
    document.addEventListener("keypress", (e) => {
      if (e.code == "Space") {
        this.playBtn();
      }
    });

    this.soundBar = document.getElementById("sound");
    this.scheduleBar = document.getElementById("schedule");
    if (localStorage.getItem("sound")) {
      this.soundBar.style.width = `${localStorage.getItem("sound") * 100}%`;
      this.AudioPlayer.chaSound(localStorage.getItem("sound"));
    } else {
      this.soundBar.style.width = "100%";
      this.AudioPlayer.chaSound(1);
    }

    if (localStorage.getItem("playing")) {
      this.AudioPlayer.setCurrentTime(this.currentTime);
      this.scheduleBar.style.width = `${
        (this.currentTime / this.durationTime) * 100
      }%`;
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
  grid-template-rows: 90vh 10vh;
  grid-template-columns: 20% 80%;
  grid-template-areas:
    "left center center"
    "player player player";
}

.left {
  position: fixed;
  width: 20%;
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

button,
input {
  outline: none;
}

.songList {
  position: fixed;
  right: 0;
}
</style>
