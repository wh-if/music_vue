<script>
import { ref } from "vue";
import { useStore } from 'vuex';

export default {
  name: "MainHeader",
  setup() {
    const menu = [
      {
        id: 0,
        name: "发现音乐",
        subMenu: ["推荐", "排行榜", "歌单", "主播电台", "歌手", "新碟上架"],
      },
      { id: 1, name: "我的音乐", subMenu: {} },
      { id: 2, name: "朋友", subMenu: {} },
      { id: 3, name: "商城", subMenu: {} },
      { id: 4, name: "音乐人", subMenu: {} },
      { id: 5, name: "下载客户端", subMenu: {} },
    ];
    const activeMenu = ref(0);
    const isLogin = ref(false);
    const store = useStore()

    function showLoginDialog(){
      store.commit('changeLoginDialogShow')
    }
    return {
      menu,
      showLoginDialog,
      isLogin,
      activeMenu,
    };
  },
};
</script>
<template>
  <header class="header">
    <h1 class="logo"></h1>
    <el-menu class="menu" background-color="#242424" mode="horizontal">
      <el-menu-item
        class="menu-item"
        v-for="item in menu"
        @click="activeMenu = item.id"
        :key="item.id"
      >
        {{ item.name }}
        <span v-show="item.id === activeMenu" class="arrow"></span>
      </el-menu-item>
    </el-menu>
    <div class="right">
      <el-input
        class="input"
        placeholder="音乐/视频/电台/用户"
        prefix-icon="el-icon-search"
        size="small"
        v-model="input2"
      />
      <el-button round size="small">创作者中心</el-button>

      <el-avatar v-show="isLogin" class="right" :size="40" :src="circleUrl" />
      <el-button type="text" @click="showLoginDialog" v-show="!isLogin">登录</el-button>
    </div>
  </header>
  <ul class="sub-header">
    <li
      class="sub-item"
      v-for="(item, index) in menu[activeMenu].subMenu"
      :key="index"
    >
      {{ item }}
    </li>
  </ul>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  background-color: #242424;
}
.logo {
  background: url("../assets/topbar.png") no-repeat;
  width: 176px;
  height: 70px;
  overflow: hidden;
}
.menu-item {
  line-height: 70px !important;
  height: 70px !important;
  color: rgb(221, 221, 221) !important;
}
.menu-item:hover {
  line-height: 70px !important;
  height: 70px !important;
  background-color: #000 !important;
  color: rgb(255, 255, 255) !important;
}
.menu,
.menu-item.is-active {
  border-bottom: 0 !important;
}
.right {
  padding-left: 100px;
  line-height: 70px;
}
.right > * {
  margin: 0 10px;
}
.right > .input {
  width: 180px;
}

.arrow {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-6px, -12px);
  border: 6px solid;
  border-color: transparent transparent #c20c0c transparent;
}
.sub-header {
  list-style: none;
  clear: both;
  width: 100%;
  min-height: 6px;
  background-color: #c20c0c;
  text-align: center;
}
.sub-item {
  display: inline-block;
  font-size: 0.9em;
  color: white;
  padding: 3px 15px;
  margin: 6px 20px;
  cursor: pointer;
}
.sub-item:hover {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
</style>