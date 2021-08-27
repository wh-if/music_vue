<template>
  <div class="main-box">
    <SideBar class="left" />
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/my/SideBar.vue";
export default {
  components: { SideBar },
  name: "My",
  setup() {},
};
</script>
<style scoped>
.main-box {
  display: flex;
  width: 1080px;
  min-height: 750px;
  margin: 0 auto;
  background-color: #fff;
}
.left {
  flex: 1;
}
.right {
  flex: 3;
  padding: 20px;
}
</style>