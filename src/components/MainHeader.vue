<script>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "MainHeader",
  setup() {
    const menu = reactive([
      {
        name: "发现音乐",
        route: "/discover",
        subMenu: [
          { name: "推荐", route: "/" },
          { name: "排行榜", route: "/toplist" },
          { name: "歌单", route: "/playlist" },
          { name: "歌手", route: "/artist" },
          { name: "新碟上架", route: "/album" },
        ],
      },
      { name: "我的音乐", route: "/my" },
      { name: "朋友", route: "/friend" },
      { name: "商城", route: "/store" },
      { name: "音乐人", route: "/musician" },
    ]);
    const route = useRoute();

    const store = useStore();
    const router = useRouter();
    const keyword = ref("");

    function showLoginDialog() {
      store.commit("openLoginDialog");
    }

    const subHeader = computed(() => {
      return "/" === route.path || route.path.startsWith("/discover")
        ? menu[0].subMenu
        : [];
    });

    const avatarUrl = computed(() => {
      let profile = JSON.parse(sessionStorage.getItem("profile"));
      return profile ? profile.avatarUrl : "";
    });

    return {
      menu,
      keyword,
      showLoginDialog,
      avatarUrl,
      subHeader,
      router,
    };
  },
};
</script>
<template>
  <header class="header">
    <h1 class="logo"></h1>
    <el-menu class="menu" background-color="#242424" mode="horizontal">
      <router-link
        v-for="(item, index) in menu"
        :key="index"
        custom
        :to="item.route"
        v-slot="{ navigate, isActive }"
      >
        <el-menu-item class="menu-item" @click="navigate">
          {{ item.name }}
          <span v-show="isActive" class="arrow"></span>
        </el-menu-item>
      </router-link>
    </el-menu>
    <div class="right">
      <el-input
        class="input"
        placeholder="音乐/歌手/用户"
        prefix-icon="el-icon-search"
        size="small"
        v-model="keyword"
      />
      <el-button round size="small">创作者中心</el-button>

      <el-avatar
        v-show="avatarUrl"
        style="vertical-align: middle"
        :size="40"
        :src="avatarUrl"
      />
      <el-button type="text" @click="showLoginDialog" v-show="!avatarUrl"
        >登录</el-button
      >
    </div>
  </header>
  <ul class="sub-header">
    <router-link
      v-for="(item, index) in subHeader"
      :key="index"
      replace
      custom
      :to="'/discover' + item.route"
      v-slot="{ navigate, isExactActive }"
    >
      <li
        class="sub-item"
        :style="
          isExactActive
            ? { backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: '10px' }
            : {}
        "
        @click="navigate"
      >
        {{ item.name }}
      </li>
    </router-link>
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