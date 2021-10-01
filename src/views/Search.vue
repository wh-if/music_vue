<script>
import { computed, ref, shallowRef } from "@vue/reactivity";
import { inject, onMounted, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "Search",
  setup() {
    const axios = inject("axios");
    const route = useRoute();
    const router = useRouter();
    const inputStr = ref("");
    const result = shallowRef({});
    const tabLabel = [
      { label: "单曲", type: 1 },
      { label: "专辑", type: 10 },
      { label: "歌手", type: 100 },
      { label: "歌单", type: 1000 },
      { label: "用户", type: 1002 },
    ];

    onMounted(async () => {});

    watch(
      () => route.query.keywords,
      async (key) => {
        if (key == null || key == "") return;
        inputStr.value = key;
        result.value = await axios
          .get("/cloudsearch?keywords=" + key + "&type=" + route.query.type)
          .then((res) => {
            if (res.code == 200) return res.result;
          });
      },
      {
        immediate: true,
      }
    );

    function handleTabChange(v) {
      router.push(
        "/search?keywords=" +
          route.query.keywords +
          "&type=" +
          tabLabel[v.index].type
      );
    }

    const msg = computed(() => {
      let count;
      switch (parseInt(route.query.type)) {
        case 10:
          count = result.value.albumCount || 0;
          break;
        case 100:
          count = result.value.artistCount || 0;
          break;
        case 1000:
          count = result.value.playlistCount || 0;
          break;
        case 1002:
          count = result.value.userprofileCount || 0;
          break;
        default:
          count = result.value.songCount || 0;
      }
      let str = tabLabel.find((item) => item.type == route.query.type).label;
      return `搜索”${route.query.keywords}“，找到${count}个${str}`;
    });
    async function handlePageChange(val) {
      result.value = await axios
        .get(
          "/cloudsearch?keywords=" +
            route.query.keywords +
            "&type=" +
            route.query.type +
            "&offset=" +
            (val - 1) * 30
        )
        .then((res) => res.result);
    }

    function handleSearch() {
      router.replace("/search?keywords=" + inputStr.value + "&type=1");
    }
    return {
      inputStr,
      handleTabChange,
      result,
      tabLabel,
      msg,
      handlePageChange,
      handleSearch,
    };
  },
};
</script>

<template>
  <div class="main-box">
    <div class="search-box">
      <el-input
        placeholder="音乐/歌手/用户"
        v-model="inputStr"
        suffix-icon="el-icon-search"
        @keyup.enter="handleSearch"
      ></el-input>
    </div>
    <p class="result-info">
      {{ msg }}
    </p>
    <el-tabs type="border-card" @tab-click="handleTabChange">
      <el-tab-pane
        v-for="(item, index) in tabLabel"
        :key="index"
        :label="item.label"
      >
        <div v-if="item.type == 1">
          <el-table size="small" :data="result.songs">
            <el-table-column type="index"> </el-table-column>
            <el-table-column prop="name" label="标题"> </el-table-column>
            <el-table-column prop="ar[0].name" label="歌手"></el-table-column>
            <el-table-column prop="al.name" label="专辑"></el-table-column>
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
          <el-pagination
            style="text-align: center; margin-top: 20px"
            background
            @current-change="handlePageChange"
            layout="prev, pager, next"
            :page-count="Math.ceil(result.songCount / 30)"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style scoped>
.main-box {
  width: 1080px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
}
.search-box {
  width: 400px;
  margin: 0 auto;
  padding: 40px 0;
}
.result-info {
  margin: 10px;
  color: gray;
}
</style>