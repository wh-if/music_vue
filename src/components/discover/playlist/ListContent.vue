<script>
import { inject, shallowReactive } from "@vue/runtime-core";
export default {
  name: "ListContent",
  async setup() {
    const axios = inject("axios");
    const state = shallowReactive({ res: {} });
    const catList = await axios.get("/playlist/catlist").then((res) => res);
    state.res = await axios.get("/top/playlist?limit=35").then((res) => res);

    console.log(state.res);
    async function handlePageChange(index) {
      state.res = await axios
        .get("/top/playlist?limit=35&offset=" + (index - 1) * 35)
        .then((res) => res);
    }
    return {
      state,
      catList,
      handlePageChange,
    };
  },
};
</script>

<template>
  <div class="list-header">
    <h2 style="float: left">{{ state.res.cat }}</h2>
    <el-button style="float: left; margin-left: 15px" size="small" plain
      >选择分类<i class="el-icon-arrow-down"
    /></el-button>
    <el-button
      style="float: right"
      type="danger"
      size="small"
      icon="el-icon-trophy-1"
      >热门</el-button
    >
  </div>
  <div class="list-main">
    <div class="item" v-for="item in state.res.playlists" :key="item.id">
      <div
        class="img-box"
        :style="{ backgroundImage: `url('${item.coverImgUrl}')` }"
      >
        <div class="item-info">
          <i class="el-icon-headset" />
          <span>{{
            item.playCount > 10000
              ? Math.floor(item.playCount / 10000) + "万"
              : item.playCount
          }}</span>
          <el-link type="info" title="播放" style="float: right">
            <i class="el-icon-video-play" />
          </el-link>
        </div>
      </div>
      <p class="title">
        {{ item.name }}
      </p>
      <p class="title" style="font-size: 0.9em">
        <span style="color: gray">by</span> {{ item.creator.nickname }}
      </p>
    </div>
  </div>
  <el-pagination
    style="text-align: center"
    background
    @current-change="handlePageChange"
    layout="prev, pager, next"
    :page-count="Math.ceil(state.res.total / 35)"
  >
  </el-pagination>
</template>
<style scoped>
.list-header {
  width: 100%;
  overflow: hidden;
  padding: 10px 20px;
  border-bottom: 2px solid #c20c0c;
}

.list-main {
  display: flex;
  flex-wrap: wrap;
  margin: 8px auto;
  padding: 0 10px;
  box-sizing: border-box;
  justify-content: space-between;
}
.item {
  width: 160px;
  margin: 15px 10px;
}

.img-box {
  height: 160px;
  width: 160px;
  position: relative;
  background-size: contain;
  background-position: center;
}
.item-info {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 5px 0;
  background-color: rgba(0, 0, 0, 0.6);
}
.item-info * {
  margin: 0 5px;
  color: white;
  font-size: 12px;
}
.title {
  padding-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>