<script>
import { ref } from "@vue/runtime-core";
import ListContent from "../../components/discover/playlist/ListContent.vue";
export default {
  components: { ListContent },
  name: "PlayList",
  setup() {
    const curTitle = ref("全部");
    return {
      curTitle, 
      
    };
  },
};
</script>
<template>
  <div class="playlist-content">
    <Suspense>
      <template v-slot:default>
        <ListContent />
      </template>
      <template v-slot:fallback>
        <div
          style="width: 100%; height: 700px"
          v-loading="true"
          element-loading-text="拼命加载中..."
        ></div>
      </template>
    </Suspense>
  </div>
</template>
<style scoped>
.playlist-content {
  width: 1080px;
  margin: 0 auto;
  padding: 30px;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
}
</style>