<template>
  <div class="wrapper">
    <div class="d-flex ml-3 align-items-center">
      <img
        v-if="img_exist"
        :src="require(`@/assets/${AudioPlay.NowPlay.album_img}`)"
        style="width:80px;height:80px;object-fit:cover;"
        alt
      />
      <div class=" ml-3">
        <span class="text-white" style="font-size:17px;">{{ AudioPlay.NowPlay.title }}</span>
        <span class="text-white-50 ml-2">{{ AudioPlay.NowPlay.album_artist }}</span>
      <div class="text-white-50" v-if="AudioPlay.LyricResult[AudioPlay.LyricIndex]">{{ AudioPlay.LyricResult[AudioPlay.LyricIndex][1] }}</div>
      </div>
    </div>
    <div>
      <div class="text-center mb-3">
        <img
          @click="chaAudio(-1)"
          :src="require(`@/assets/img/prev.png`)"
          style="cursor:pointer;"
          :class="{'disable':AudioPlay.PlayIndex - 1 < 0}"
        />
        <img
          @click="chaPlay()"
          :src="AudioPlay.Playing?require(`@/assets/img/pause.png`):require(`@/assets/img/play.png`)"
          style="cursor:pointer;"
          class="mx-5"
          alt
        />
        <img
          @click="chaAudio(+1)"
          :src="require(`@/assets/img/next.png`)"
          style="cursor:pointer;"
          :class="{'disable':AudioPlay.PlayIndex + 1 >= AudioPlay.PlayList.length}"
        />
      </div>
      <div class="progress" @click.stop="chaPlayBar($event)" style="height:7px;cursor:pointer;">
        <div class="progress-bar bg-success" style="width:0%;pointer-events:none;"></div>
      </div>
    </div>
    <div class="d-flex mr-4 justify-content-end align-items-center">
      <img
        @click="AudioPlay.ListShow = !AudioPlay.ListShow"
        :src="require(`@/assets/img/list.png`)"
        style="width:30px;height:30px;object-fit:cover;cursor:pointer;"
        alt
      />
      <img
        :src="require(`@/assets/img/sound.png`)"
        style="width:40px;height:40px;object-fit:cover;cursor:pointer;"
        class="mx-3"
        alt
      />
      <div
        class="progress"
        @click.stop="chaSoundBar($event)"
        style="width:35%;height:7px;cursor:pointer;"
      >
        <div class="progress-bar bg-success" style="width:1%;pointer-events:none;"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    AudioPlay: Object,
  },
  computed: {
    img_exist: function () {
      return this.AudioPlay.NowPlay.album_img;
    }
  },
  data() {
    return {
      LyricResult: [],
      LyricIndex: 0,
    };
  },

  methods: {
    chaPlayBar(e) {
      let schadule = e.offsetX / e.target.offsetWidth;
      e.target.children[0].style.width = schadule * 100 + "%";
      this.AudioPlay.chaCurrentTime(schadule);
    },
    chaSoundBar(e) {
      let schadule = e.offsetX / e.target.offsetWidth;
      e.target.children[0].style.width = schadule * 100 + "%";
      this.AudioPlay.chaSound(schadule);
    },
    chaPlay() {
      if (this.AudioPlay.Playing) {
        this.AudioPlay.pause();
      } else {
        this.AudioPlay.play();
      }
    },
    chaAudio(next) {
      if (
        this.AudioPlay.PlayIndex + next >= 0 &&
        this.AudioPlay.PlayIndex + next < this.AudioPlay.PlayList.length
      ) {
        this.AudioPlay.pause();
        this.AudioPlay.SetCurrentAudio(this.AudioPlay.PlayIndex + next);
        this.AudioPlay.play();
      }
    },
  },
};
</script>
<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 30% 40% 30%;
  height: 100%;
  align-items: center;
}
.disable {
  cursor: auto !important;
  opacity: 0.5;
}
</style>