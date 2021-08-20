<script>
import { computed, inject, ref } from "vue";

export default {
  name: "BannerCarousel",
  async setup() {
    const axios = inject("axios");
    const banners = await axios.get("/banner").then((res) => {
      return res.banners;
    });
    const curBanner = ref(0);

    const styleBg = computed(() => {
      return {
        backgroundImage:
          banners.length == 0
            ? ""
            : `url('${banners[curBanner.value].imageUrl}')`,
      };
    });

    return {
      styleBg,
      curBanner,
      banners,
    };
  },
};
</script>

<template>
  <div style="position: relative; overflow: hidden">
    <div class="carousel-bg" :style="styleBg"></div>
    <el-carousel
      class="main-carousel"
      height="400px"
      @change="(cur) => (curBanner = cur)"
    >
      <el-carousel-item v-for="item in banners" :key="item.id">
        <el-image :alt="item.targetId" :src="item.imageUrl"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>
.carousel-bg {
  height: 400px;
  filter: blur(60px);
}
.main-carousel {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-540px);
  width: 1080px;
}
</style>