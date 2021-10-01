<script>
import { watch, inject, onMounted, shallowReactive } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  name: "SideBar",
  setup() {
    const axios = inject("axios");
    const userData = shallowReactive({
      uid: "",
      avatarUrl: "",
      name: "",
      event: [],
      follows: [],
      followeds: [],
    });
    const store = useStore();
    onMounted(async () => {});
    watch(
      () => store.state.loginStatus,
      async (isLogin) => {
        if (isLogin) {
          let profile = JSON.parse(sessionStorage.getItem("profile"));

          [userData.uid, userData.avatarUrl, userData.name] = [
            profile.userId,
            profile.avatarUrl,
            profile.nickname,
          ];
          userData.event = await axios
            .get("/user/event?uid=" + userData.uid)
            .then((res) => res.events);
          userData.follows = await axios
            .get("/user/follows?uid=" + userData.uid)
            .then((res) => res.follow);
          userData.followeds = await axios
            .get("/user/followeds?uid=" + userData.uid)
            .then((res) => res.followeds);
        }
      },
      {
        immediate: true,
      }
    );
    return {
      userData,
    };
  },
};
</script>
<template>
  <div class="bar-box">
    <div class="title">
      <el-image
        :src="userData.avatarUrl"
        style="width: 80px; height: 80px"
      ></el-image>
      <el-link style="vertical-align: top; margin: 20px">{{
        userData.name
      }}</el-link>
      <div class="msg">
        <div class="event">
          <p class="count">
            {{ userData.event.length }}
          </p>
          <p>动态</p>
        </div>
        <el-divider style="height: 4rem" direction="vertical" />
        <div class="follows">
          <p class="count">
            {{ userData.follows.length }}
          </p>
          <p>关注</p>
        </div>
        <el-divider style="height: 4rem" direction="vertical" />
        <div class="followeds">
          <p class="count">
            {{ userData.followeds.length }}
          </p>
          <p>粉丝</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.title {
  padding: 25px 15px 0;
  background-color: #f2f2f2;
}
.msg > * {
  display: inline-block;
  margin: 10px 15px;
}
.count {
  font-size: 1.5rem;
  padding-bottom: 5px;
}
</style>