<script>
import {
  computed,
  inject,
  onMounted,
  reactive,
  shallowRef,
} from "@vue/runtime-core";
import ArtistList from "../components/my/ArtistList.vue";
import PlayList from "../components/my/PlayList.vue";
import { ElMessage } from "element-plus";
import Loading from "../components/Loading.vue";

export default {
  components: { ArtistList, PlayList, Loading },
  name: "My",
  setup() {
    const axios = inject("axios");
    const playlist = shallowRef([]);
    const state = reactive({
      subCount: {},
      isArtistList: true,
      propData: {},
      dialogVisible: false,
      createPlayListName: "",
    });
    const uid = JSON.parse(sessionStorage.getItem("profile")).userId;
    onMounted(async () => {
      state.subCount = await axios.get("/user/subcount");
      playlist.value = await axios
        .get("/user/playlist?uid=" + uid)
        .then((res) => res.playlist);
    });

    const createdList = computed(() =>
      playlist.value.filter((item) => item.creator.userId == uid)
    );
    const collectList = computed(() =>
      playlist.value.filter((item) => item.creator.userId != uid)
    );

    function handlePlayListItemClick(item) {
      state.isArtistList = false;
      state.propData = item;
    }
    function handleCreateList() {
      axios
        .post("/playlist/create", { name: state.createPlayListName })
        .then((res) => {
          if (res.code == 200) {
            state.dialogVisible = false;
            ElMessage.success("新建成功！");
          }
        });
    }
    return {
      createdList,
      collectList,
      state,
      handlePlayListItemClick,
      handleCreateList,
    };
  },
};
</script>
<template>
  <div class="main-box">
    <el-menu default-active="1" class="left">
      <el-button
        style="width: 100%; margin: 10px auto"
        icon="el-icon-plus"
        @click="state.dialogVisible = true"
        >新建歌单</el-button
      >
      <el-menu-item @click="state.isArtistList = true" index="1">
        <template #title>我的歌手（{{ state.subCount.artistCount }}）</template>
      </el-menu-item>
      <el-submenu index="2">
        <template #title>
          <span>创建的歌单（{{ state.subCount.createdPlaylistCount }}）</span>
        </template>
        <el-menu-item
          class="item"
          v-for="item in createdList"
          :key="item.id"
          @click="handlePlayListItemClick(item)"
        >
          <el-image
            style="width: 50px; height: 50px"
            :src="item.coverImgUrl"
            :alt="item.name"
          ></el-image>
          <span class="item-title">{{ item.name }}</span>
          <span class="item-count">{{ item.trackCount }}首</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template #title>
          <span>收藏的歌单（{{ state.subCount.subPlaylistCount }}）</span>
        </template>
        <el-menu-item
          class="item"
          v-for="item in collectList"
          :key="item.id"
          @click="handlePlayListItemClick(item)"
        >
          <el-image
            style="width: 50px; height: 50px"
            :src="item.coverImgUrl"
            :alt="item.name"
          ></el-image>
          <span class="item-title">{{ item.name }}</span>
          <span class="item-count">{{ item.trackCount }}首</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="right">
      <Suspense>
        <ArtistList v-if="state.isArtistList" />
        <PlayList v-else :propData="state.propData" />
        <template #fallback>
          <Loading />
        </template>
      </Suspense>
    </div>
    <el-dialog title="新建歌单" v-model="state.dialogVisible" width="500px">
      <div class="dialog-box">
        <el-input
          label="歌单名"
          placeholder="请输入歌单名称"
          v-model="state.createPlayListName"
        ></el-input>
        <p style="color: gray">可通过“收藏”将音乐添加到新歌单中</p>
        <el-button style="width: 100px" type="primary" @click="handleCreateList"
          >新建</el-button
        >
        <el-button
          style="width: 100px; margin-left: 100px"
          @click="state.dialogVisible = false"
          >取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>


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
  padding-top: 30px;
}
.right {
  flex: 3;
  padding: 20px;
}
.item {
  position: relative;
  margin: 5px 0;
  line-height: initial;
}
.item-title {
  position: absolute;
  top: 5px;
  left: 95px;
  font-size: 0.8rem;
  width: 130px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-count {
  position: absolute;
  top: 30px;
  left: 95px;
  color: gray;
  font-size: 0.5rem;
}
.dialog-box {
  padding: 0 30px;
}
.dialog-box > * {
  margin: 10px 0;
}
</style>