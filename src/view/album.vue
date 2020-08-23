<template>
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
  </div>
</template>
<script>
export default {
  props: {
    albums: Array,
  },
};
</script>
<style scoped>
.wrapper {
  width: 90%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 20px;
}
.album {
  background: #1d1d1d;
  border-radius: 10px;
}
.album img {
  width: 140px;
  height: 140px;
  object-fit: cover;
}
</style>