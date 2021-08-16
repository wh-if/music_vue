<script>
import { computed, inject, reactive, ref } from "vue";

export default {
  name: "BannerCarousel",
  async setup() {
    const axios = inject("axios");
    const state = reactive({
      banners: [],
    });
    const curBanner = ref(0);
    state.banners = await axios.get("/banner").then((res) => {
      return res.banners;
    });

    const styleBg = computed(() => {
      return {
        backgroundImage:
          state.banners.length == 0
            ? ""
            : `url('${state.banners[curBanner.value].imageUrl}')`,
      };
    });

    return {
      state,
      styleBg,
      curBanner,
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
      <el-carousel-item v-for="item in state.banners" :key="item.id">
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