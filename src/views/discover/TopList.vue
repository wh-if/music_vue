<script>
import Comment from "../../components/SingleComment.vue";
import SideBar from "../../components/discover/toplist/SideBar.vue";
import SongList from "../../components/discover/toplist/SongList.vue";
export default {
  name: "TopList",
  components: { SideBar, Comment, SongList },
  setup() {},
};
</script>

<template>
  <Suspense>
    <template v-slot:default>
      <div class="toplist-content">
        <SideBar style="flex: 1" />
        <div style="flex: 3; padding: 30px">
          <SongList />
          <Comment />
        </div>
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
.toplist-content {
  width: 1080px;
  margin: 0 auto;

  display: flex;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
}
</style>