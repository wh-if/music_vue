<script>
import { inject, shallowReactive, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "SongList",
  async setup() {
    const axios = inject("axios");
    const route = useRoute();
    const store = useStore();
    const state = shallowReactive({ songList: [] });
    watch(
      () => route.query,
      async (query) => {
        console.log(query);
        state.songList = await axios
          .get("/playlist/detail?id=" + (query.id || "19723756"))
          .then((res) => res.playlist);
        for (let i = 0; i < 3; i++) {
          state.songList.tracks[i].al.picIsShow = true;
        }
      },
      {
        immediate: true,
      }
    );
    function playSong(id) {
      store.commit("changePlaySong", { id });
    }

    return {
      state,
      playSong,
    };
  },
};
</script>
<template>
  <div class="song-title">
    <img
      class="left"
      :src="state.songList.coverImgUrl"
      :alt="state.songList.name"
    />
    <div class="right">
      <h2>{{ state.songList.name }}</h2>
      <p style="color: gray">{{ state.songList.description }}</p>
      <div class="btns">
        <el-button-group>
          <el-button type="primary" size="small" icon="el-icon-video-play"
            >播放</el-button
          >
          <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
          ></el-button>
        </el-button-group>
        <el-button size="small" icon="el-icon-share"></el-button>
        <el-button size="small" icon="el-icon-chat-line-round"></el-button>
      </div>
    </div>
  </div>
  <div class="song-list">
    <div class="list-head">
      <h2>歌曲列表</h2>
      <span class="list-head-song-count"
        >{{ state.songList.trackCount }}首歌</span
      >
      <span class="list-head-song-playcount"
        >播放:
        <span style="color: red">{{ state.songList.playCount }}</span> 次</span
      >
    </div>
    <el-table size="mini" :data="state.songList.tracks">
      <el-table-column type="index"> </el-table-column>
      <el-table-column label="标题">
        <template #default="scope">
          <img
            width="50"
            v-if="scope.row.al.picIsShow"
            :src="scope.row.al.picUrl"
            :alt="scope.row.al.name"
            style="vertical-align: middle"
          />
          <span class="text-overflow">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ar[0].name" label="歌手"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-link
            icon="el-icon-video-play"
            href="javascript:;"
            @click="playSong(scope.row.id)"
          ></el-link>
          <el-link icon="el-icon-plus" style="margin: 0 20px"></el-link>
          <el-link icon="el-icon-share"></el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style scoped>
.song-title {
  height: 230px;
  padding: 10px 20px 10px;
  display: flex;
  justify-content: left;
}
.song-title > .left {
  margin: 20px 10px;
  width: 150px;
  height: 150px;
}
.song-title > .right {
  margin: 20px 10px;
}
.song-title > .right > * {
  margin: 8px;
}
.btns > * {
  margin: 15px;
}
.list-head {
  overflow: hidden;
  line-height: 50px;
  height: 50px;
  border-bottom: 2px solid #c20c0c;
}
.list-head > h2 {
  float: left;
}
.list-head-song-count {
  float: left;
  margin-left: 20px;
  font-size: 0.8em;
  color: gray;
}
.list-head-song-playcount {
  float: right;
  margin-right: 20px;
}
.text-overflow {
  padding-left: 10px;
  display: inline-block;
  vertical-align: middle;
  width: 160px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>