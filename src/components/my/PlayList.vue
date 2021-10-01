<script>
import { inject, shallowRef, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  name: "PlayList",
  props: {
    propData: {
      type: Object,
      required: true,
    },
  },
  async setup(props) {
    const axios = inject("axios");
    const songList = shallowRef({}); //榜单对象
    const store = useStore();
    watch(
      () => props.propData.id,
      async (id) => {
        songList.value = await axios
          .get("/playlist/detail?id=" + id)
          .then((res) => res.playlist);
      },
      {
        immediate: true,
      }
    );
    //添加到播放列表
    function handlePlayList() {
      let s = songList.value.tracks.map((item) => item.id);
      store.commit("changePlaySongList", {
        source: s,
      });
    }
    return {
      songList,
      handlePlayList,
    };
  },
};
</script>

<template>
  <div class="list-info">
    <div style="flex: 1">
      <el-image :src="propData.coverImgUrl"></el-image>
    </div>
    <div style="flex: 2">
      <div class="box1">
        <span class="icon"></span>
        <h2 style="display: inline-block">
          {{ propData.name }}
        </h2>
      </div>
      <div class="box2">
        <el-image class="img" :src="propData.creator.avatarUrl"></el-image>
        <el-link class="nickname">
          {{ propData.creator.nickname }}
        </el-link>
        <span class="time">
          {{ new Date(propData.createTime).toLocaleString() }}创建
        </span>
      </div>
      <div class="box3">
        <el-button-group>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-video-play"
            @click="handlePlayList"
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
      <div v-if="propData.tags.length !== 0" class="box4">
        标签：
        <el-tag
          type="info"
          style="margin: 0 5px"
          v-for="(item, index) in propData.tags"
          :key="index"
          >{{ item }}</el-tag
        >
      </div>
      <div v-if="propData.description" class="box5">
        介绍： {{ propData.description }}
      </div>
    </div>
  </div>
  <div class="song-list">
    <div class="list-head">
      <h2>歌曲列表</h2>
      <span class="list-head-song-count">{{ propData.trackCount }}首歌</span>
      <span class="list-head-song-playcount"
        >播放: <span style="color: red">{{ propData.playCount }}</span> 次</span
      >
    </div>
    <el-table size="mini" :data="songList.tracks">
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
            @click="
              $store.commit('changePlaySongList', {
                source: scope.row.id,
              })
            "
          ></el-link>
          <el-link icon="el-icon-plus" style="margin: 0 20px"></el-link>
          <el-link icon="el-icon-share"></el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.list-info {
  display: flex;
}
.box1,
.box2,
.box3,
.box4 {
  height: 40px;
  margin: 5px 20px;
}
.box1 > .icon {
  display: inline-block;
  background-image: url("../../assets/icon.png");
  background-position: 0 -243px;
  width: 54px;
  height: 24px;
}
.box1 > h2 {
  margin-left: 10px;
  line-height: 40px;
}
.box2 > .img {
  width: 40px;
  height: 40px;
}
.box2 > .nickname,
.box2 > .time {
  vertical-align: top;
  line-height: 40px;
  margin: 0 10px;
}
.box2 > .time {
  color: gray;
  font-size: 0.8rem;
  margin: 0 30px;
}
.box3 > * {
  margin: 5px 15px 5px 0;
}
.box4,
.box5 {
  color: gray;
  margin: 5px 20px;
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

