<template>
  <div class="container">
    <section class="albums">
      <div v-for="album in albums" :key="album.name">
        <router-link :to="{name:'album',params:{albumName:album.name}}">
          <div class="album">
            <img :src="require(`@/assets/img/${album.img_path}`)" :alt="album.name" />
            <div class="meta">
              <h1 class="title">{{ album.name }}</h1>
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
  display: grid;
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
  display: flex;
  flex-direction: row;
  background: #1d1d1d;
  padding: 20px 20px 16px;
  border-radius: 10px;
}

a {
  color: white;
  text-decoration: none;
}

.album img {
  width: 120px;
  height: 120px;
  margin-right: 20px;
}

.title {
  color: white;
  margin: 0 0 10px;
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