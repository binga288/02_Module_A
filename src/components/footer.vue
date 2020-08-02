<template>
  <div class="footer-content px-4">
    <div class="footer-left d-flex align-items-center" v-if="audio.playing && playList">
      <img v-if="albumImg" class="left_img" :src="require(`@/assets/${albumImg}`)" />
      <div class="song-title ml-3">
        <span class="text-white">{{ songName }}</span>
        <span class="text-white-50 ml-1" style="font-size:15px;">{{ songArtist }}</span>
        <div class="text-white-50" style="font-size:15px;">
          <div v-if="audio.lyrics[audio.lyric_index]">{{ audio.lyrics[audio.lyric_index][1] }}</div>
        </div>
      </div>
    </div>
    <div class="footer-center d-flex justify-content-center align-items-center flex-column">
      <div class="center-img d-flex justify-content-between mb-2">
        <img
          v-if="prevVerify"
          @click="setSong(audio.playIndex - 1)"
          :src="require('@/assets/img/back.png')"
          alt
        />
        <img v-else style="opacity: 0.5;cursor:auto;" :src="require('@/assets/img/back.png')" alt />

        <img
          v-if="!audio.playStatus"
          @click="$emit('playBtn')"
          :src="require('@/assets/img/play.png')"
          alt
        />
        <img v-else @click="$emit('playBtn')" :src="require('@/assets/img/pause.png')" alt />

        <img
          v-if="nextVerify"
          @click="setSong(audio.playIndex + 1)"
          :src="require('@/assets/img/next.png')"
          alt
        />
        <img v-else style="opacity: 0.5;cursor:auto;" :src="require('@/assets/img/next.png')" alt />
      </div>
      <div class="d-flex align-items-center" style="width:100%;">
        <div class="progress" style="height: 5px;width: 100%;cursor:pointer;" @click="scheduleCha">
          <div class="progress-bar bg-success" style="pointer-events:none;" id="schedule"></div>
        </div>
        <div class="text-white-50 ml-2">{{ currentStr }}/{{ durationStr }}</div>
      </div>
    </div>
    <div class="footer-right d-flex justify-content-end align-items-center">
      <div class="lyrics"></div>
      <div @click="$emit('songListShow')" class="listBtn" style="cursor:pointer;">
        <img :src="require('@/assets/img/playlist.png')" alt />
      </div>
      <div class="sound d-flex align-items-center">
        <img :src="require('@/assets/img/sound.png')" alt />
        <div class="progress" style="width: 100%;height: 5px;cursor:pointer;" @click="soundCha">
          <div class="progress-bar bg-success" id="sound" style="pointer-events:none;"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    durationTime: {
      type: Number,
    },
    currentTime: {
      type: Number,
    },
    audio: {
      type: Object,
    },
    playList: {
      type: Array,
    },
    lyric_file: {
      type: String,
    },
    lyric_type: {
      type: String,
    },
  },
  computed: {
    nextVerify() {
      return this.audio.playIndex + 1 < this.playList.length;
    },
    prevVerify() {
      return this.audio.playIndex - 1 >= 0;
    },
    songName() {
      return this.playList[this.audio.playIndex].title;
    },
    songArtist() {
      return this.playList[this.audio.playIndex].artist;
    },
    albumImg() {
      return this.playList[this.audio.playIndex].img_path;
    },
    currentStr() {
      return this.audio.formatTime(this.currentTime) || "00:00";
    },
    durationStr() {
      return this.durationTime
        ? this.audio.formatTime(this.durationTime)
        : "00:00";
    },
  },
  methods: {
    soundCha(e) {
      this.$emit("soundCha", e);
    },
    scheduleCha(e) {
      this.$emit("scheduleCha", e);
    },
    setSong(index) {
      if (this.nextVerify || this.prevVerify) {
        this.$emit("setSong", index);
      }
    },
  },
  watch: {
    lyric_file: function () {
      if (this.lyric_file) {
        this.audio.setLyricIndex(localStorage.getItem("lyrics_index") * 1 || 0);
        if (this.lyric_type == "lrc") {
          let match = this.lyric_file.split("\r\n");
          match.forEach((x) => {
            if (/(\[\d{2}):(\d{2}.\d{2}\])+/.test(x)) {
              let time = x.match(/(\d{2}):(\d{2}.\d{2})/g);
              time.forEach((i) => {
                let time_str = i.split(":");
                this.audio.lyrics.push([
                  time_str[0] * 60 + time_str[1] * 1,
                  x.split("]")[time.length],
                ]);
              });
            }
          });
        } else if (this.lyric_type == "srt") {
          let match = this.lyric_file.split("\r\n\r\n");
          match.forEach((k) => {
            let array = k.match(/((\w|.)+)/g);
            if (array != null) {
              var time = array[1].match(/(\d+:)+\d+,\d+/g);
              time = time[0].replace(",", ".").split(":");
              this.audio.lyrics.push([
                time[0] * 3600 + time[1] * 60 + time[2] * 1,
                array.slice(2, array.length).join(" "),
              ]);
            }
          });
        }
        this.audio.lyrics.sort((i, x) => i[0] - x[0]);
      }
    },
    currentTime: function () {
      if (this.lyric_file) {
        var lyric = 0;
        this.audio.lyrics.forEach((v, i) => {
          if (v[0] < this.currentTime) {
            lyric = i;
          }
        });
        this.audio.setLyricIndex(lyric);
      }
    },
  },
};
</script>

<style scoped>
.footer-content {
  display: grid;
  grid-template-columns: 32% 38% 30%;
  grid-template-areas: "footer-left footer-center footer-right";
  height: 100%;
}
.footer-left {
  grid-area: footer-left;
}
.left_img {
  height: 80px;
  width: 80px;
}
.footer-center {
  grid-area: footer-center;
}
.center-img {
  width: 160px;
}
.center-img img {
  height: 20px;
  cursor: pointer;
}
.footer-right {
  grid-area: footer-right;
}
.listBtn {
  width: 40px;
}
.listBtn img {
  height: 15px;
}
.sound {
  width: 150px;
}
.sound img {
  height: 25px;
  margin-right: 10px;
}
</style>