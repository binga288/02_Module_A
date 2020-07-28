<template>
  <div class="container">
    <section class="albums">
      <div v-for="album in albums" :key="album.name">
        <router-link :to="{name:'album',params:{albumName:album.name}}" class="text-decoration-none">
          <div class="album">
            <img :src="require(`@/assets/img/${album.img_path}`)" :alt="album.name" />
            <div class="meta">
              <h3 class="title">{{ album.name }}</h3>
              <div class="artist">{{ album.artist }}</div>
              <br />
              <div class="des">{{ album.description }}</div>
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
.container {
  margin: 40px auto;
  width: 100%;
}

.albums {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-row-gap: 30px;
  grid-column-gap: 50px;
  width: 100%;
}
.album {
  display: flex;
  flex-direction: row;
  background: #1d1d1d;
  padding: 20px 20px 16px;
  border-radius: 10px;
}

.album img {
  width: 120px;
  height: 120px;
  margin-right: 20px;
}
.title {
  color: white;
}
.meta {
  display: flex;
  flex-direction: column;
}
.artist,
.des,
.stats {
  color: gray;
  width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
}
</style>