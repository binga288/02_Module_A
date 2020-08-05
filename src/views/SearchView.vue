<template>
  <div>
    <div class="search-input">
      <input type="text" class="rounded-pill px-3 py-2 border-0 m-2" v-model="keyword" />
    </div>
    <div
      class="song-list text-white d-flex flex-column"
      v-for="(song, index) in song_array"
      :key="song.title"
    >
      <div class="song my-3 mx-5">
        <div class="d-flex align-items-center">
          <img
            class="songPlay"
            style="width: 20px;object-fit:cover;"
            :src="require('@/assets/img/play.png')"
            @click="$emit(`songPlay`,song,`play`)"
          />
        </div>
        <div class="songJoin text-left" style="font-size:35px;" @click="$emit(`songPlay`,song,`join`)">+</div>
        <div>
          <span>{{ index+1 }}</span>
        </div>
        <div>
          <div :class='{"search":song.search.indexOf("title") > -1}'>{{ song.title }}</div>
          <div class="text-white-50" style="font-size:14px;">
            <span :class='{"search":song.search.indexOf("artist") > -1}'>演唱：{{ song.artist }}</span>
            <span
              :class='{"search":song.search.indexOf("composer") > -1}'
              class="ml-3"
            >作曲：{{ song.composer }}</span>
            <span
              :class='{"search":song.search.indexOf("album") > -1}'
              class="ml-3"
            >{{ song.album_name }}</span>
          </div>
        </div>
        <div class="text-white-50 d-flex align-items-center justify-content-end">
          <span>00:00</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    all_album: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      keyword: "",
      song_array: [],
    };
  },
  watch: {
    keyword: function (k) {
      var result = [];
      var array = [];
      var space = k.match(/(title|artist|composer|album):"(\w|\s){3,}"/g);
      var word = k.match(/(title|artist|composer|album):\w{3,}/g);
      if (space != null || word != null) {
        array = array.concat(word, space);
        array = array.filter((x) => x);
        array.forEach((e) => {
          let condition = e.split(":");
          condition[1] = condition[1].replace(/"/g, "");
          if (condition[0] == "album") {
            result.unshift(condition);
          } else {
            result.push(condition);
          }
        });
      }
      this.song_array =
        result.length > 0 ? this.select(result, this.all_album) : [];
    },
  },
  methods: {
    // select(array,index, data) { HARD SELECT MODE
    //   var result = [];
    //   var set = new Set();
    //   if(index < array.length){
    //     if(array[0][0] == "album" || index > 0){
    //       let key = array[index][0] == "album" ? "title" : array[index][0];
    //       data.forEach(album=>{
    //         if(album[key].indexOf(array[index][1]) > -1){
    //           result = index > 0? result.concat(album) : result.concat(album.songlist);
    //         }
    //       })
    //     }else{
    //       data.forEach(album=>{
    //         album.songlist.forEach(song=>{
    //           if(song[array[index][0]].indexOf(array[index][1]) > -1){
    //             result = result.concat(song);
    //           }
    //         })
    //       })
    //     }

    //     result = result.filter(x=>set.has(x.title)?false:set.add(x.title));
    //     return this.select(array,index+1,result);
    //   }else{
    //     return data;
    //   }
    // }
    select(search_array, data) {
      var result = [];
      data.forEach((album) => {
        album.songlist.forEach((song) => {
          let verify = false;
          song.search = [];
          search_array.forEach((key) => {
            if(key[0] == "album"){
              if (song.album_name.toLowerCase().indexOf(key[1].toLowerCase()) > -1) {
                song.search.push(key[0]);
                verify = true;
              }
            }else{
              if (song[key[0]].toLowerCase().indexOf(key[1].toLowerCase()) > -1) {
                song.search.push(key[0]);
                verify = true;
              }
            }
          });
          if (verify) result = result.concat(song);          
        });
      });
      return result;
    },
  },
};
</script>

<style scoped>
.song-list {
  width: 100%;
}
.song-list:hover {
  transition: 0.5s;
  background: rgba(255, 255, 255, 0.1);
}
.song {
  display: grid;
  grid-template-columns: 50px 50px 30px 1fr 1fr;
}
.songJoin:hover {
  color: green;
  cursor: pointer;
}
.songPlay:hover {
  opacity: 0.5;
  cursor: pointer;
}
.search {
  color: green;
}
</style>