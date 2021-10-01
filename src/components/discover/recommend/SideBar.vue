<script>
import { inject, shallowRef, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  name: "SideBar",
  async setup() {
    const axios = inject("axios");
    const store = useStore();
    let singerList = await axios.get("/top/artists?limit=5").then((res) => {
      return res.artists;
    });
    let djList = await axios.get("/dj/toplist?limit=5").then((res) => {
      return res.toplist;
    });
    const userData = shallowRef(null);
    watch(
      () => store.state.loginStatus,
      (isLogin) => {
        if (isLogin) {
          let profile = JSON.parse(sessionStorage.getItem("profile"));
          userData.value = {
            avatarUrl: profile.avatarUrl,
            name: profile.nickname,
          };
        } else {
          userData.value = null;
        }
      },
      {
        immediate: true,
      }
    );

    return {
      singerList,
      djList,
      userData,
    };
  },
};
</script>

<template>
  <div class="side-bar">
    <div class="tologin">
      <template v-if="userData == null">
        <span>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</span>
        <el-button
          style="width: 100px"
          @click="$store.commit('changeLoginDialog', { type: true })"
          type="danger"
          size="small"
        >
          登录
        </el-button>
      </template>
      <template v-else>
        <el-avatar :size="60" :src="userData.avatarUrl" />
        <h3>{{ userData.name }}</h3>
      </template>
    </div>
    <div class="box">
      <div class="bar">
        <span>入驻歌手</span>
        <el-link class="right" type="info" href="/discover/artist"
          >查看全部<i class="el-icon-arrow-right" />
        </el-link>
      </div>
      <ul class="list">
        <li class="singer-item" v-for="item in singerList" :key="item.id">
          <el-image
            style="height: 65px"
            fit="cover "
            :alt="item.name"
            :src="item.picUrl"
          />
          <span class="text-overflow" style="padding: 0 10px">{{
            item.name
          }}</span>
        </li>
      </ul>
      <!-- <el-button style="display: block; margin: auto">
        申请成为网易音乐人
      </el-button> -->
    </div>
    <div class="box">
      <div class="bar">
        <span>热门主播</span>
        <el-link class="right" type="info" href="javascript:;"
          >查看全部<i class="el-icon-arrow-right" />
        </el-link>
      </div>
      <ul class="list">
        <li class="dj-item" v-for="item in djList" :key="item.id">
          <el-image
            class="dj-item-img"
            style="height: 60px"
            fit="cover"
            :alt="item.name"
            :src="item.picUrl"
          />
          <span class="dj-item-title text-overflow">{{ item.name }}</span>
          <span class="dj-item-dec text-overflow">
            {{ item.rcmdtext }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.side-bar {
  width: 230px;
  padding-bottom: 20px;
  border-left: 1px solid #d3d3d3;
}
.tologin {
  height: 135px;
  text-align: center;
  background-image: linear-gradient(to bottom, #fdfdfd, #e2e2e2);
  color: gray;
  font-size: 0.8em;
  line-height: 25px;
  padding: 30px 10px 10px;
}
.bar {
  padding: 5px;
  margin: 15px 0;
  border-bottom: 1px solid #b2b2b2;
}
.box {
  margin: 10px;
}
.bar > .right {
  float: right;
  font-size: 0.8em;
}
.list {
  list-style: none;
}
.singer-item {
  margin: 10px 0;
  font-size: 0.8em;
  border: 1px solid #e9e9e9;
  background-color: #fafafa;
}
.singer-item > * {
  vertical-align: middle;
  font-size: 1.1em;
}
.singer-item:hover {
  cursor: pointer;
  background-color: #f1f1f1;
}
.dj-item {
  margin: 8px 2px;
  position: relative;
}
.dj-item:hover {
  cursor: pointer;
  background-color: #f1f1f1;
}
.dj-item-title {
  position: absolute;
  left: 70px;
  top: 7px;
}

.dj-item-dec {
  position: absolute;
  left: 70px;
  top: 35px;
  color: #999;
  font-size: 0.8em;
}
.text-overflow {
  width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>