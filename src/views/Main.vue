<template>
  <div class="contain">
    <section class="albums">
      <div v-for="album in albums" :key="album.name">
        <router-link :to="{name:'album',params:{albumName:album.name}}" class="text-decoration-none">
          <div class="d-flex album">
            <img class="mr-3" :src="require(`@/assets/img/${album.img_path}`)" :alt="album.name" />
            <div class="d-flex flex-column col-9">
              <h3 class="text-white">{{ album.name }}</h3>
              <!-- <div class="text-body">{{ album.artist }}</div> -->
              <br />
              <div class="text-truncate text-white-50">{{ album.description }}</div>
            </div>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import Album from "@/albums";

export default {
  data() {
    return {
      albums: Album.albums,
    };
  },
};
</script>

<style scoped>
.contain {
  margin: 40px 0 60px 60px;
}
.albums {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-row-gap: 30px;
  grid-column-gap: 50px;
  width: 90%;
}
.album {
  background: #1d1d1d;
  padding: 20px 20px 16px;
  border-radius: 10px;
}
.album img {
  width: 120px;
  height: 120px;
}
</style>