<template>
  <div>
    <div class="search-main">
      <div class="search-input">
        <input type="text" class="rounded-pill px-3 py-2 border-0 m-2" v-model="keyword" />
      </div>
      <div class="search-show">
        <div class="song-list text-white d-flex flex-column">
          <div class="song-bg" v-for="(song, index) in song_array" :key="song.title">
            <div class="song my-3 mx-5">
              <div class="d-flex align-items-center">
                <img
                  class="songPlay"
                  style="width: 20px;object-fit:cover;"
                  :src="require('@/assets/img/play.png')"
                  @click="$emit('searchPlay',song)"
                />
              </div>
              <div class="songJoin text-left" style="font-size:35px;" @click="$emit('join',song)">+</div>
              <div>
                <span>{{ index+1 }}</span>
              </div>
              <div>
                <div>{{ song.title }}</div>
                <div class="text-white-50" style="font-size:14px;">
                  <span>{{ song.artist }}</span>
                  <span class="ml-3">{{ song.composer }}</span>
                </div>
              </div>
              <div class="text-white-50 d-flex align-items-center justify-content-end">
                <span>00:00</span>
              </div>
            </div>
          </div>
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
      search_key:["title","album","compoer","artist"]
    };
  },
  watch: {
    keyword: function (k) {
      var result = [];
      var array = k.split(" ");
      array.forEach((e) => {
        let condition = e.split(":");
        if (condition.length == 2 && condition[1].length > 2 && this.search_key.some(x => x==condition[0])) {
          if(condition[0] == "album"){
            result.unshift(condition);
          }else{
            result.push(condition);
          }
        }
      });
      console.log(result)
      if(result.length > 0) this.song_array = this.select(result,0,this.all_album);    
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
    select(){
      
    }
  },
};
</script>

<style scoped>
.search-main {
  width: 100%;
}
.song-list {
  width: 100%;
}
.song {
  display: grid;
  grid-template-columns: 50px 50px 30px 1fr 1fr;
}
.song-bg {
  width: 100%;
}
.song-bg:hover {
  transition: 0.5s;
  background: rgba(255, 255, 255, 0.1);
}
.songJoin:hover {
  color: green;
  cursor: pointer;
}
.songPlay:hover {
  opacity: 0.5;
  cursor: pointer;
}
</style>