<script>
import { inject, ref, watch } from "@vue/runtime-core";
export default {
  name: "ArtistList",
  props: {
    title: {
      type: String,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
  },
  async setup(props) {
    const initial = ref("-1");
    const axios = inject("axios");
    const artists = ref([]);
    const selectedStyle = {
      backgroundColor: "#c20c0c",
      color: "white",
    };
    watch(
      [props, initial],
      async () => {
        artists.value = await axios
          .get(
            "/artist/list?limit=100&type=" +
              props.type +
              "&area=" +
              props.area +
              "&initial=" +
              initial.value
          )
          .then((res) => res.artists);
      },
      {
        immediate: true,
      }
    );

    return {
      initial,
      artists,
      selectedStyle,
    };
  },
};
</script>
<template>
  <div class="box">
    <h1 class="title">
      {{ title }}
    </h1>
    <div class="menu">
      <el-link
        href="javascript:;"
        :style="initial == -1 ? selectedStyle : {}"
        @click="initial = -1"
        >热门
      </el-link>
      <el-link
        href="javascript:;"
        v-for="item in 26"
        :key="item"
        :style="initial == String.fromCharCode(64 + item) ? selectedStyle : {}"
        @click="initial = String.fromCharCode(64 + item)"
      >
        {{ String.fromCharCode(64 + item) }}
      </el-link>
      <el-link
        href="javascript:;"
        :style="initial == 0 ? selectedStyle : {}"
        @click="initial = 0"
        >其他</el-link
      >
    </div>
    <div class="top">
      <div class="top-item" v-for="item in artists.slice(0, 10)" :key="item.id">
        <el-image
          style="width: 145px; height: 145px"
          :src="item.picUrl"
          :alt="item.name"
        />
        <p class="artist-name" style="padding-top: 5px">{{ item.name }}</p>
      </div>
    </div>
    <el-divider />
    <div class="content">
      <span
        class="content-item artist-name"
        v-for="item in artists.slice(10)"
        :key="item.id"
      >
        {{ item.name }}
      </span>
    </div>
  </div>
</template>
<style scoped>
.box {
  padding: 20px;
}
.title {
  border-bottom: 2px solid #c20c0c;
  padding: 5px;
}
.menu {
  text-align: center;
  padding: 20px 5px 5px;
  display: flex;
  justify-content: space-between;
}
.menu > * {
  padding: 2px 5px;
}
.top,
.content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 5px;
}
.top-item {
  padding: 15px 0;
}
.content-item {
  width: 145px;
  padding: 10px 0;
}
.artist-name {
  width: 145px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>