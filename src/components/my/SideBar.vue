<script>
import { inject, onMounted, reactive } from "@vue/runtime-core";
export default {
  name: "SideBar",
  setup() {
    const axios = inject("axios");
    const state = reactive({ subCount: {} });
    onMounted(async () => {
      state.subCount = await axios.get("/user/subcount");
    });
    return {
      state,
    };
  },
};
</script>

<template>
  <el-menu default-active="1" class="menu">
    <el-button style="width: 100%; margin: 10px auto" icon="el-icon-plus"
      >新建歌单</el-button
    >
    <el-menu-item index="1">
      <i class="el-icon-menu"></i>
      <template #title>我的歌手（{{ state.subCount.artistCount }}）</template>
    </el-menu-item>
    <el-submenu index="2">
      <template #title>
        <i class="el-icon-location"></i>
        <span>创建的歌单（{{ state.subCount.artistCount }}）</span>
      </template>
      <!-- <el-menu-item> </el-menu-item> -->
    </el-submenu>
    <el-submenu index="3">
      <template #title>
        <i class="el-icon-location"></i>
        <span>收藏的歌单（{{ state.subCount.subPlaylistCount }}）</span>
      </template>
      <el-menu-item index="3-1">选项1</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<style scoped>
.menu {
  padding-top: 30px;
}
</style>