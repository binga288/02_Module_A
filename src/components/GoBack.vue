<template>
  <div class="btn-group">
    <button class="goBtn" type="button" @click="goBack">
      <!-- <img :src="require(`@/assets/img/back.png`)" /> -->
    </button>
    <button class="goBtn" type="button" @click="goNext">
      <!-- <img :src="require(`@/assets/img/next.png`)" /> -->
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    goBack: function () {
        console.log(window.history.length);
      return this.$router.go(-1);
    },
    goNext: function () {
        console.log(window.history.length);
      return this.$router.go(1);
    },
  },
};
</script>

<style scoped>
.btn-group {
  margin: 10px;
}
.goBtn {
  background: black;
  margin: 1px;
  border: 0;
  border-radius: 50%;
}
</style>