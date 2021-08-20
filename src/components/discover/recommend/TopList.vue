<script>
import { inject } from "@vue/runtime-core";
import SingleSectionBar from "../../SingleSectionBar.vue";
export default {
  components: { SingleSectionBar },
  name: "TopList",
  async setup() {
    const axios = inject("axios");
    //飙升榜单
    let hotTopList = await axios
      .get("/playlist/detail?id=19723756")
      .then((res) => {
        return res.playlist;
      });
    hotTopList.tracks = hotTopList.tracks.slice(0, 10);
    //新歌榜单
    let newTopList = await axios
      .get("/playlist/detail?id=3779629")
      .then((res) => {
        return res.playlist;
      });
    newTopList.tracks = newTopList.tracks.slice(0, 10);
    //原创榜单
    let originTopList = await axios
      .get("/playlist/detail?id=2884035")
      .then((res) => {
        return res.playlist;
      });
    originTopList.tracks = originTopList.tracks.slice(0, 10);
    return {
      hotTopList,
      newTopList,
      originTopList,
    };
  },
};
</script>

<template>
  <section>
    <SingleSectionBar title="榜单" />
    <div class="toplist-box">
      <el-table :data="hotTopList.tracks" class="toplist-table" stripe>
        <el-table-column type="index" align="right" />
        <el-table-column prop="name">
          <template #header>
            <div class="table-header">
              <img width="80" :src="hotTopList.coverImgUrl" />
              <span class="header-title">{{ hotTopList.name }}</span>
              <span class="header-btns">
                <i class="el-icon-video-play" />
                <i class="el-icon-star-off" />
              </span>
            </div>
          </template>
          <template #default="scope">
            <span class="text-overflow">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        :data="newTopList.tracks"
        class="toplist-table"
        stripe
        style="border-left: 1px solid #d3d3d3"
      >
        <el-table-column type="index" align="right" />
        <el-table-column prop="name">
          <template #header>
            <div class="table-header">
              <img width="80" :src="newTopList.coverImgUrl" />
              <span class="header-title">{{ newTopList.name }}</span>
              <span class="header-btns">
                <i class="el-icon-video-play" />
                <i class="el-icon-star-off" />
              </span>
            </div>
          </template>
          <template #default="scope">
            <span class="text-overflow">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        :data="originTopList.tracks"
        class="toplist-table"
        stripe
        style="border-left: 1px solid #d3d3d3"
      >
        <el-table-column type="index" align="right" />
        <el-table-column prop="name">
          <template #header>
            <div class="table-header">
              <img width="80" :src="originTopList.coverImgUrl" />
              <span class="header-title" style="">{{
                originTopList.name
              }}</span>
              <span class="header-btns">
                <i class="el-icon-video-play" />
                <i class="el-icon-star-off" />
              </span>
            </div>
          </template>
          <template #default="scope">
            <span class="text-overflow">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<style scoped>
.toplist-box {
  display: flex;
  width: 95%;
  margin: 25px auto 15px;
  border: 1px solid #d3d3d3;
}
.toplist-table {
  font-size: 0.9em;
}
.table-header {
  position: relative;
}
.header-title {
  font-size: 1.4em;
  position: absolute;
  right: 40px;
  top: 5px;
}
.header-btns {
  position: absolute;
  font-size: 1.8em;
  right: 30px;
  top: 50%;
}
.header-btns > * {
  margin: 5px;
}
.text-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>