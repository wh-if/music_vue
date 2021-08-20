<script>
import HotRecommend from "@/components/discover/recommend/HotRecommend.vue";
import NewDisc from "@/components/discover/recommend/NewDisc.vue";
import TopList from "@/components/discover/recommend/TopList.vue";
import BannerCarousel from "@/components/discover/recommend/BannerCarousel.vue";
import SideBar from "@/components/discover/recommend/SideBar.vue";
export default {
  name: "Recommend",
  components: {
    BannerCarousel,
    SideBar,
    HotRecommend,
    NewDisc,
    TopList,
  },
  setup() {
    return {};
  },
};
</script>

<template>
  <Suspense >
    <template v-slot:default>
      <div class="recommend">
        <BannerCarousel />
        <div class="main">
          <div style="float: left">
            <HotRecommend />
            <NewDisc />
            <TopList />
          </div>
          <SideBar style="float: right" />
        </div>
      </div>
    </template>
    <template v-slot:fallback>
      <div style="width:100%;height:700px;" v-loading="true"  element-loading-text="拼命加载中..."  >
      </div>
    </template>
  </Suspense>
  
</template>

<style scoped>
.main {
  width: 1080px;
  margin: 0 auto;
  background-color: #fff;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  overflow: auto;
}
</style>