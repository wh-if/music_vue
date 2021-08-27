<script>
import { inject } from "@vue/runtime-core";
import { useRouter } from "vue-router";
export default {
  name: "SideBar",
  async setup() {
    const axios = inject("axios");
    const router = useRouter();
    const topList = await axios.get("/toplist").then((res) => res.list);
    function handleClick(id) {
      router.replace("/discover/toplist?id=" + id);
    }
    return {
      topList,
      handleClick,
    };
  },
};
</script>
<template>
  <div class="sidebar-main">
    <h3 style="padding: 10px 15px">云音乐特色榜</h3>
    <ul class="list">
      <li
        class="list-item"
        v-for="item in topList.slice(0, 4)"
        @click="handleClick(item.id)"
        :key="item.id"
      >
        <img
          class="list-item-img"
          width="50"
          :src="item.coverImgUrl"
          :alt="item.name"
        />
        <p class="list-item-name">{{ item.name }}</p>
        <p class="list-item-update">{{ item.updateFrequency }}</p>
      </li>
    </ul>
    <h3 style="padding: 10px 15px">全球媒体榜</h3>
    <ul class="list">
      <li
        class="list-item"
        v-for="item in topList.slice(4)"
        @click="handleClick(item.id)"
        :key="item.id"
      >
        <img
          class="list-item-img"
          width="50"
          :src="item.coverImgUrl"
          :alt="item.name"
        />
        <p class="list-item-name">{{ item.name }}</p>
        <p class="list-item-update">{{ item.updateFrequency }}</p>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.sidebar-main {
  width: 250px;
  border-right: 1px solid #d5d5d5;
}
.list {
  list-style: none;
}
.list-item {
  height: 65px;
  padding: 5px 20px;
  position: relative;
}
.list-item:hover {
  cursor: pointer;
  background-color: #e6e6e6;
}
.list-item-img {
  position: absolute;
}
.list-item-name {
  position: absolute;
  font-size: 0.9em;
  left: 35%;
}
.list-item-update {
  position: absolute;
  font-size: 0.8em;
  color: gray;
  top: 50%;
  left: 35%;
}
</style>