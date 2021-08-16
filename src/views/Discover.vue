<template>
  <div class="discover">
    <Suspense>
      <BannerCarousel />
    </Suspense>
    <div class="main">
      <PopularRecommend style="float:left"/>
      <RecommendSideBar style="float:right"/>
    </div>
  </div>
</template>

<script>
import BannerCarousel from "../components/discover/BannerCarousel.vue";
import PopularRecommend from "../components/discover/PopularRecommend.vue";
import RecommendSideBar from "../components/discover/RecommendSideBar.vue";
export default {
  name: "discover",
  components: {
    BannerCarousel,
    PopularRecommend,
    RecommendSideBar
  },
  setup() {
    return {};
  },
};
</script>
<style scoped>
.main{
  width: 1080px;
  margin: 0 auto;
  background-color: #fff;
  box-sizing: border-box;
  border: 1px solid #d3d3d3;
  overflow: auto;
}


</style>
