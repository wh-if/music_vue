<script>
import Main from "../components/friend/Main.vue";
import SideBar from "../components/friend/SideBar.vue";
import Loading from "../components/Loading.vue";
export default {
  components: { SideBar, Main, Loading },
  name: "Friend",
  setup() {},
};
</script>

<template>
  <div class="box">
    <Suspense>
      <Main style="flex: 2.5" />
      <template #fallback>
        <Loading style="flex: 2.5" />
      </template>
    </Suspense>

    <SideBar style="flex: 1" />
  </div>
</template>

<style scoped>
.box {
  width: 1080px;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
}
</style>