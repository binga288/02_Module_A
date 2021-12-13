<template>
<<<<<<< HEAD
  <div>
    <div class="d-flex ml-3 mt-4 align-items-center">
      <input
        type="text"
        v-model="searchWord"
        class="form-control px-3 rounded-pill"
        style="width:400px;"
        placeholder="輸入關鍵字"
      />
      <span class="text-white ml-3" v-if="count">共 {{count}} 歌曲</span>
    </div>
    <div class="songlist px-5 py-3" v-for="(song,key) in searchResult" :key="song.id">
      <img @click="play(song[0])" class="ui mt-2" :src="require(`@/assets/img/play.png`)" alt />
      <div @click="join(song[0])" class="ui text-white" style="font-size:50px;">+</div>
      <div class="text-white text-center" style="font-size:20px;">{{ key+1 }}</div>
      <div
        :class="{'searched': song[1].indexOf(`title`) != -1}"
        class="text-white"
      >{{ song[0].title }}</div>
      <div
        :class="{'searched': song[1].indexOf(`artist`) != -1}"
        class="text-white-50"
      >{{ song[0].artist }}</div>
      <div
        :class="{'searched': song[1].indexOf(`composer`) != -1}"
        class="text-white-50"
      >{{ song[0].composer }}</div>
      <div
        :class="{'searched': song[1].indexOf(`album`) != -1}"
        class="text-white-50"
      >{{ song[0].album_title }}</div>
      <div class="text-white-50">{{ AudioPlayer.formatDate(song[0].duration) }}</div>
=======
    <div class="wrapper">
        <input type="text" v-model="searchWord" class="form-control ml-3 mt-3 px-4 rounded-pill" style="width:20%;" placeholder="輸入關鍵字">
>>>>>>> parent of 64212ad ([down]0820)
    </div>
</template>
<style scoped>
.songlist {
  display: grid;
  grid-template-columns: repeat(3, 50px) 4fr repeat(4, 1fr);
  align-items: center;
  grid-column-gap: 10px;
}
.searched {
  color: green !important;
}
.ui:hover {
  opacity: 0.5;
  cursor: pointer;
}
</style>
<script>
export default {
<<<<<<< HEAD
  props: {
    albums: Array,
    AudioPlayer: Object,
  },
  data() {
    return {
      searchWord: "",
      searchResult: [],
      searchKey: [],
    };
  },
  computed: {
    count: function () {
      return this.searchResult.length;
    },
  },
  watch: {
    searchWord: function (str) {
      this.searchKey = [];
      this.searchResult = [];
      let normal = str.match(/(title|composer|artist|album):\w{3,}/g);
      let hard = str.match(/(title|composer|artist|album):"(\w|.){3,}"/g);
      let searchArray = [];
      if (normal != null || hard != null) {
        searchArray = searchArray.concat(normal, hard);
        searchArray = searchArray.filter((x) => x);
        searchArray.forEach((x) => {
          let array = x.split(":");
          array[1] = array[1].replace(/"/g, "");
          this.searchKey.push(array);
        });
      }
      this.result();
    },
  },
  methods: {
    result() {
      this.albums.forEach((album) => {
        album.songlist.forEach((song) => {
          let key_array = [];
          let verify = false;
          this.searchKey.forEach((key) => {
            console.log(song.album_title)
            if (
              key[0] == "album" &&
              song.album_title.toLocaleLowerCase().indexOf(key[1].toLocaleLowerCase()) != -1
            ) {
              key_array.push(key[0]);
              verify = true;
            }
            if (song[key[0]].toLocaleLowerCase().indexOf(key[1].toLocaleLowerCase()) != -1) {
              key_array.push(key[0]);
              verify = true;
            }
          });
          if (verify) this.searchResult.push([song, key_array]);
        });
      });
    },
    play(song) {
      let result = this.AudioPlayer.playList.findIndex((x) => x.id == song.id);
      if (result != -1) {
        this.AudioPlayer.setCurrentAudio(result);
        this.AudioPlayer.play();
      } else {
        this.AudioPlayer.addPlayList(song);
        this.AudioPlayer.setCurrentAudio(this.AudioPlayer.playList.length - 1);
        this.AudioPlayer.play();
      }
      this.AudioPlayer.listShow = true;
    },
    join(song) {
      let result = this.AudioPlayer.playList.findIndex((x) => x.id == song.id);
      if (result != -1) {
        alert("歌曲已在播放清單");
      } else {
        this.AudioPlayer.addPlayList(song);
        this.AudioPlayer.setCurrentAudio(this.AudioPlayer.playList.length - 1);
        this.AudioPlayer.play();
      }
      this.AudioPlayer.listShow = true;
    },
  },
};
=======
    props:{
        Albums:Array
    },
    data(){
        return{
            searchWord:""
        }
    },
    watch:{
        searchWord:function(str){
            let normal = str.match(/(title|artist|composer|album):\w{3}/g);
            console.log(normal)
        }
    }
}
>>>>>>> parent of 64212ad ([down]0820)
</script>