<script>
import { inject, ref } from "@vue/runtime-core";
export default {
  name: "ArtistList",
  async setup() {
    const axios = inject("axios");
    const data = ref({});

    data.value = await axios.get("/artist/sublist");

    return {
      data,
    };
  },
};
</script>
<template>
  <h2 class="head">我的歌手（{{ data.count }}）</h2>
  <ul class="list">
    <li v-for="item in data.data" :key="item.id" style="position: relative">
      <img width="80" :src="item.picUrl" :alt="item.name" />
      <h3 class="item-name">{{ item.name }}</h3>
      <p class="item-info">{{ item.albumSize }}个专辑、{{ item.mvSize }}个MV</p>
      <el-divider></el-divider>
    </li>
  </ul>
</template>
<style scoped>
.head {
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border-bottom: 2px solid #c20c0c;
}
.list {
  list-style: none;
  padding: 0 10px;
}
.item-name {
  top: 10px;
  left: 100px;
  position: absolute;
}
.item-info {
  top: 45px;
  left: 100px;
  position: absolute;
  color: gray;
}
</style>