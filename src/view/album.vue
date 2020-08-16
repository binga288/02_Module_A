<template>
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
  </div>
</template>
<script>
export default {
  props: {
    Albums: {
      type:Array,
    },
  },
  mounted: function () {
    console.log(this.Albums);
  },
};
</script>
<style scoped>
.wrapper {
  max-width: 70vw;
  margin: 30px auto;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-column-gap: 40px;
  grid-row-gap: 30px;  
}
.album_main {
  background: #1d1d1d;
  border-radius: 10px;  
}
.album_img img {
  width: 120px;
  height: 120px;
  object-fit: cover;
}
</style>