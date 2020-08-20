<template>
  <div>
    <input
      type="text"
      v-model="keyword"
      class="form-control ml-3 mt-3 px-3 rounded-pill"
      style="width:300px;"
      placeholder="輸入關鍵字"
    />
    <div class="content my-3 ml-4">
      <div class="song_main px-5 py-4" v-for="(result,key) in searchResult" :key="result[0].id">
        <img @click="play(result[0])" class="ui" :src="require(`@/assets/img/play.png`)" alt />
        <div
          @click="join(result[0])"
          class="text-white pb-2 ui"
          style="font-size:50px;font-weight:bold;"
        >+</div>
        <div class="text-white" style="font-size:20px;font-weight:bold;">{{ key+1 }}</div>
        <div
          class="text-white"
          :class="{'searched':result[1].indexOf('title') != -1}"
        >{{result[0].title}}</div>
        <div
          class="text-white-50"
          :class="{'searched':result[1].indexOf('album') != -1}"
        >{{ result[0].album_title }}</div>
        <div
          class="text-white-50"
          :class="{'searched':result[1].indexOf('artist') != -1}"
        >{{ result[0].artist }}</div>
        <div
          class="text-white-50"
          :class="{'searched':result[1].indexOf('composer') != -1}"
        >{{ result[0].composer }}</div>
        <div class="text-white-50">00:00</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    albums: Array,
    AudioPlay: Object,
  },
  data() {
    return {
      keyword: "",
      searchList: [],
      searchResult: [],
    };
  },
  watch: {
    keyword: function (str) {
      this.searchList = [];
      this.searchResult = [];
      let result = [];
      let normal = str.match(/(title|composer|artist|album):(\w){3,}/g);
      let hard = str.match(/(title|composer|artist|album):"(\w|.){3,}"/g);
      if (normal != null || hard != null) {
        result = result.concat(normal, hard);
        result = result.filter((x) => x);
        result.forEach((e) => {
          let split = e.split(":");
          this.searchList.push([split[0], split[1].replace(/"/, "")]);
        });
      }
      this.getResult(this.searchList, this.albums);
      console.log(this.searchResult)
    },
  },
  methods: {
    getResult(searchList, data) {
      data.forEach((album) => {
        album.songlist.forEach((song) => {
          let verify = false;
          let fix = [];
          searchList.forEach((search) => {
            if (search[0] == "album") {
              if (album.title.toLocaleLowerCase().indexOf(search[1]) != -1) {
                verify = true;
                fix.push(search[0]);
              }
            } else if (search[0] == "artist") {
              if (album.artist.toLocaleLowerCase().indexOf(search[1]) != -1) {
                verify = true;
                fix.push(search[0]);
              }
            } else {
              if (song[search[0]].toLocaleLowerCase().indexOf(search[1]) != -1) {
                verify = true;
                fix.push(search[0]);
              }
            }
          });          
          if(verify)this.searchResult.push([song,fix]);
        });
      });
    },
    join(song) {
      if (this.AudioPlay.PlayList.findIndex((e) => e.id == song.id) == -1) {
        this.AudioPlay.AddPlayList(song);
        this.AudioPlay.SetCurrentAudio(this.AudioPlay.PlayList.length - 1);
        this.AudioPlay.play();
      } else {
        alert("歌曲已存在");
      }
      this.AudioPlay.ListShow = true;
    },
    play(song) {
      if (this.AudioPlay.PlayList.findIndex((e) => e.id == song.id) == -1) {
        this.AudioPlay.AddPlayList(song);
        this.AudioPlay.SetCurrentAudio(this.AudioPlay.PlayList.length - 1);
        this.AudioPlay.play();
      } else {
        this.AudioPlay.SetCurrentAudio(
          this.AudioPlay.PlayList.findIndex((e) => e.id == song.id)
        );
        this.AudioPlay.play();
      }
      this.AudioPlay.ListShow = true;
    },
  },
};
</script>
<style scoped>
.song_main {
  display: grid;
  grid-template-columns: repeat(3, 50px) 5fr repeat(4, 1fr);
  align-items: center;
  grid-gap: 10px;
}
.ui:hover {
  cursor: pointer;
  opacity: 0.5;
}
.searched {
  color: green !important;
}
</style>