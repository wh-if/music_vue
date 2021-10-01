<script>
import { reactive } from "@vue/reactivity";
import ArtistList from "../../components/discover/artist/ArtistList.vue";
import SideBar from "../../components/discover/artist/SideBar.vue";
import Loading from '../../components/Loading.vue';
export default {
  components: { SideBar, ArtistList, Loading },
  name: "Artist",
  setup() {
    const state = reactive({ area: 7, type: 1, title: "华语男歌手" });

    function changeState(area, type, title) {
      [state.area, state.type, state.title] = [area, type, title];
    }
    return {
      state,
      changeState,
    };
  },
};
</script>
<template>
  <div class="main">
    <SideBar class="left" :changeState="changeState" />
    <Suspense>
      <ArtistList
      :area="state.area"
      :type="state.type"
      :title="state.title"
      class="right"
    />
      <template #fallback>
        <Loading class="right"/>
      </template>
    </Suspense>
    
  </div>
</template>

<style scoped>
.main {
  width: 1080px;
  margin: 0 auto;
  background-color: #fff;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  display: flex;
}
.left {
  flex: 1;
}
.right {
  flex: 5;
}
</style>