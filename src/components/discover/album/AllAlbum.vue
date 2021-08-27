<script>
import { inject, shallowRef } from "@vue/runtime-core";
export default {
  name: "AllAlbum",
  async setup() {
    const axios = inject("axios");
    const res = shallowRef();
    res.value = await axios.get("/album/new?limit=35").then((res) => res);
    async function handlePageChange(index) {
      res.value = await axios
        .get("/album/new?limit=35&offset=" + (index - 1) * 35)
        .then((res) => res);
    }
    return {
      res,
      handlePageChange,
    };
  },
};
</script>
<template>
  <div class="all-head">
    <h2>全部新碟</h2>
  </div>
  <div class="all-list">
    <div v-for="item in res.albums" :key="item.id" class="item-box">
      <div class="img-box">
        <img :src="item.picUrl" width="130" :alt="item.name" />
      </div>
      <p class="item-name">{{ item.name }}</p>
      <p class="item-artist">{{ item.artist.name }}</p>
    </div>
  </div>
  <el-pagination
    style="text-align: center"
    background
    @current-change="handlePageChange"
    layout="prev, pager, next"
    :page-count="Math.ceil(res.total / 35)"
  >
  </el-pagination>
</template>
<style scoped>
.all-head {
  width: 100%;
  border-bottom: 2px solid #c20c0c;
  padding: 10px;
}
.all-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.item-box {
  width: 150px;
  margin: 10px;
}
.img-box {
  height: 130px;
  width: 100%;
  background-image: url("../../../assets/coverall.png");
  background-position: 0 -845px;
}
.item-name {
  font-size: 1.1em;
  padding: 5px;
}
.item-artist {
  font-size: 0.9em;
  color: gray;
  padding: 0 5px;
}
</style>