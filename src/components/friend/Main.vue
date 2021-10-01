<script>
import { inject, shallowRef } from "@vue/runtime-core";
export default {
  name: "Main",
  async setup() {
    const axios = inject("axios");
    const events = shallowRef([]);

    events.value = await axios
      .get("/event?pagesize=30")
      .then((res) => res.event);
    // console.log(JSON.parse(events.value[3].json));

    return {
      events,
    };
  },
};
</script>
<template>
  <div class="main">
    <div class="title">
      <h2 style="float: left">动态</h2>
      <el-button style="float: right" icon="el-icon-edit" size="small" round
        >发动态</el-button
      >
    </div>
    <div class="events">
      <div v-for="item in events" :key="item.id" class="event-item">
        <div class="item-header">
          <el-image
            :src="item.user.avatarUrl"
            :alt="item.user.nickname"
            style="width: 60px; height: 60px"
          ></el-image>
          <el-link class="header-name">{{ item.user.nickname }}</el-link>
          <el-link class="header-time">{{
            new Date(item.eventTime).toLocaleString()
          }}</el-link>
        </div>
        <div class="item-content">
          <div class="content-text">{{ JSON.parse(item.json).msg }}</div>
          <div class="content-song" v-if="JSON.parse(item.json).song">
            <el-image
              :src="JSON.parse(item.json).song.album.picUrl"
              :alt="JSON.parse(item.json).song.name"
              style="width: 60px; height: 60px"
            ></el-image>
            <el-link class="song-name">{{
              JSON.parse(item.json).song.name
            }}</el-link>
            <el-link class="song-artist">{{
              JSON.parse(item.json).song.artists[0].name
            }}</el-link>
          </div>
          <div class="content-pic" v-if="item.pics">
            <el-image
              v-for="(pic, index) in item.pics"
              :key="index"
              :src="pic.squareUrl"
              :preview-src-list="[pic.originUrl]"
              style="width: 200px; margin: 5px"
              alt="图片"
            ></el-image>
          </div>
        </div>
        <div class="item-footer">
          <el-link>点赞({{ item.info.likedCount }})</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link>转发({{ item.info.shareCount }})</el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link>评论({{ item.info.commentCount }})</el-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.main {
  padding: 20px;
  border-right: 1px solid #dddddd;
}
.title {
  padding: 10px 15px 5px;
  border-bottom: 2px solid #c20c0c;
  overflow: auto;
}
.event-item {
  border-bottom: 1px solid #e8e8e9;
  margin: 20px 10px;
}
.item-header {
  position: relative;
  margin: 10px 5px;
}
.header-name {
  position: absolute;
  top: 5px;
  margin-left: 10px;
}
.header-time {
  position: absolute;
  top: 35px;
  margin-left: 10px;
  font-size: 0.8rem;
}
.item-content {
  padding: 10px;
}
.content-text {
  white-space: pre-line;
}
.content-song {
  background-color: #f5f5f5;
  padding: 10px;
  position: relative;
  margin: 10px 5px;
}
.song-name {
  position: absolute;
  top: 15px;
  margin-left: 10px;
}
.song-artist {
  position: absolute;
  top: 45px;
  margin-left: 10px;
  font-size: 0.8rem;
}
.item-footer {
  text-align: right;
  padding: 10px;
}
.item-footer > * {
  margin: 0 10px;
}
</style>