<script>
import AllAlbum from '../../components/discover/album/AllAlbum.vue';
import HotAlbum from '../../components/discover/album/HotAlbum.vue';
export default {
  components: { HotAlbum, AllAlbum },
  name: "Album",
  setup() {},
};
</script>

<template>
  <Suspense>
    <template v-slot:default>
      <div class="album-box">
        <HotAlbum/>
        <AllAlbum/>
      </div>
    </template>
    <template v-slot:fallback>
      <div
        style="width: 100%; height: 700px"
        v-loading="true"
        element-loading-text="拼命加载中..."
      ></div>
    </template>
  </Suspense>
</template>
<style scoped>
.album-box{
    width: 1080px;
    margin: 0 auto;
    padding: 30px;
    border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
}
</style>