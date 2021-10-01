<script>
import Comment from "../../components/SingleComment.vue";
import SideBar from "../../components/discover/toplist/SideBar.vue";
import SongList from "../../components/discover/toplist/SongList.vue";
import Loading from "../../components/Loading.vue";
export default {
  name: "TopList",
  components: { SideBar, Comment, SongList, Loading },
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
      <Loading />
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