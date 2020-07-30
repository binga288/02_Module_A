<template>
  <div class="contain">
    <section class="albums">
      <div v-for="album in all_album" :key="album.title">
        <router-link :to="{name:'album',params:{albumId:album.id}}" class="text-decoration-none">
          <div class="d-flex album">
            <img class="mr-3" :src="require(`@/assets/${album.img_path}`)" :alt="album.title" />
            <div class="d-flex flex-column col-9">
              <h3 class="text-white">{{ album.title }}</h3>
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
export default {
  props: {
    all_album: {
      type: Array,
      required: true,
    },
  }
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
  object-fit: cover;
}
</style>