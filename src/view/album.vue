<template>
<<<<<<< HEAD
  <div class="d-flex justify-content-center my-5">
    <div class="wrapper">
      <router-link class="album p-4 d-flex align-items-center" v-for="(album,key) in albums" :key="key" :to="{name:'album_content',params:{id:album.id}}">
        <img :src="require(`@/assets/${album.img_path}`)" alt />
        <div class="ml-4" style="width: 70%;">
          <h3 class="text-white">{{album.title}}</h3>
          <br />
          <div class="text-white-50 text-truncate mb-3">{{ album.description }}</div>
          <div class="text-white-50 d-flex justify-content-between">
            <span>演唱者：{{ album.artist }}</span>
          </div>
        </div>
      </router-link>
    </div>
=======
  <div class="wrapper">
    <router-link :to="{name:'album_content',params:{id:album.id}}" class="album_main d-flex align-items-center p-4" v-for="album in Albums" :key="album.id">
      <div class="album_img">
        <img :src="require(`@/assets/${album.img_path}`)" alt />
      </div>
      <div class="album_content ml-4" style="width:60%;">
        <h4 class="text-white">{{album.title}}</h4>
        <br />
        <div class="album_des text-white-50 text-truncate">{{ album.description }}</div>
      </div>
    </router-link>
>>>>>>> parent of 64212ad ([down]0820)
  </div>
</template>
<script>
export default {
  props: {
    Albums: {
      type:Array,
    },
  },
<<<<<<< HEAD
=======
  mounted: function () {
    console.log(this.Albums);
  },
>>>>>>> parent of 64212ad ([down]0820)
};
</script>
<style scoped>
.wrapper {
<<<<<<< HEAD
  width: 90%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 20px;
=======
  max-width: 70vw;
  margin: 30px auto;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-column-gap: 40px;
  grid-row-gap: 30px;  
>>>>>>> parent of 64212ad ([down]0820)
}
.album {
  background: #1d1d1d;
<<<<<<< HEAD
  border-radius: 10px;
}
.album img {
  width: 140px;
  height: 140px;
=======
  border-radius: 10px;  
}
.album_img img {
  width: 120px;
  height: 120px;
>>>>>>> parent of 64212ad ([down]0820)
  object-fit: cover;
}
</style>