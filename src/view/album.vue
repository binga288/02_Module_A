<template>
  <div class="wrapper">
    <div
      v-for="album in albums"
      :key="album.id"
    >
      <router-link :to="{name:'album',params:{album_id:album.id}}" class="album_main py-4 px-4 d-flex align-items-center">
        <img
          :src="require(`@/assets/${album.img_path}`)"
          style="height:130px;width:130px;object-fit:cover;"
          alt
        />
        <div class="content ml-4">
          <div class="d-flex align-items-center">
            <h4 class="text-white">{{album.title}}</h4>
            <div class="text-white-50 ml-3 text-truncate">{{album.artist}}</div>
          </div>
          <br />
          <div class="text-white-50 text-truncate">{{album.description}}</div>
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
  mounted() {
    console.log(this.albums);
  },
};
</script>
<style scoped>
.wrapper {
  display: grid;
  margin: 40px auto;
  max-width: 90%;
  grid-template-columns: 50% 50%;
  grid-row-gap: 30px;
  grid-column-gap: 30px;
}
.album_main {
  background: #1d1d1d;
  border-radius: 20px;
}
.content {
  width: 70%;
}
</style>