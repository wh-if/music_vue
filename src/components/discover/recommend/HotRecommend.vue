<script>
import { inject } from "@vue/runtime-core";
import SingleSectionBar from "../../SingleSectionBar.vue";
import { useStore } from "vuex";
export default {
  components: { SingleSectionBar },
  name: "HotRecommend",
  async setup() {
    const axios = inject("axios");
    const store = useStore();
    //热门推荐标签
    let hotTags = await axios.get("/playlist/hot").then((res) => {
      return res.tags;
    });
    hotTags = hotTags.slice(0, 5);
    //热门推荐
    let listItems = await axios.get("/personalized?limit=10").then((res) => {
      return res.result;
    });

    //添加到播放列表
    async function handlePlayList(val) {
      let songs = await axios
        .get("/playlist/detail?id=" + val)
        .then((res) => res.playlist);
      let s = songs.trackIds.map((item) => item.id);
      store.commit("changePlaySongList", {
        source: s,
      });
    }
    return {
      listItems,
      handlePlayList,
      hotTags,
    };
  },
};
</script>
<template>
  <section>
    <SingleSectionBar
      title="热门推荐"
      :tags="hotTags"
      href="/discover/playlist"
    />
    <div class="main">
      <div class="item" v-for="item in listItems" :key="item.id">
        <div
          class="img-box"
          :style="{ backgroundImage: `url('${item.picUrl}')` }"
        >
          <div class="item-info">
            <i class="el-icon-headset" />
            <span>{{
              item.playCount > 10000
                ? Math.floor(item.playCount / 10000) + "万"
                : item.playCount
            }}</span>
            <el-link
              type="info"
              title="播放"
              href="javascript:;"
              @click="handlePlayList(item.id)"
              style="float: right"
            >
              <i class="el-icon-video-play" />
            </el-link>
          </div>
        </div>
        <span class="title">
          {{ item.name }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.main {
  width: 810px;
  display: flex;
  flex-wrap: wrap;
  margin: 8px auto;
  padding: 0 10px;
  box-sizing: border-box;
  justify-content: space-between;
}
.item {
  width: 135px;
  margin: 15px 5px;
}

.img-box {
  height: 135px;
  width: 135px;
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
  padding: 5px;
}
</style>