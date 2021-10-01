<script>
export default {
  name: "SideBar",
  props: {
    changeState: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const data = [
      {
        title: "华语",
        area: 7,
        labels: [
          {
            name: "华语男歌手",
            type: 1,
          },
          {
            name: "华语女歌手",
            type: 2,
          },
          {
            name: "华语组合/乐团",
            type: 3,
          },
        ],
      },
      {
        title: "欧美",
        area: 96,
        labels: [
          {
            name: "欧美男歌手",
            type: 1,
          },
          {
            name: "欧美女歌手",
            type: 2,
          },
          {
            name: "欧美组合/乐团",
            type: 3,
          },
        ],
      },
      {
        title: "日本",
        area: 8,
        labels: [
          {
            name: "日本男歌手",
            type: 1,
          },
          {
            name: "日本女歌手",
            type: 2,
          },
          {
            name: "日本组合/乐团",
            type: 3,
          },
        ],
      },
      {
        title: "韩国",
        area: 16,
        labels: [
          {
            name: "韩国男歌手",
            type: 1,
          },
          {
            name: "韩国女歌手",
            type: 2,
          },
          {
            name: "韩国组合/乐团",
            type: 3,
          },
        ],
      },
      {
        title: "其他",
        area: 0,
        labels: [
          {
            name: "其他男歌手",
            type: 1,
          },
          {
            name: "其他女歌手",
            type: 2,
          },
          {
            name: "其他组合/乐团",
            type: 3,
          },
        ],
      },
    ];

    return {
      data,
    };
  },
};
</script>
<template>
  <div class="box">
    <h3>推荐歌手</h3>
    <div v-for="(item, index) in data" :key="index">
      <el-divider />
      <h3 class="title">{{ item.title }}</h3>
      <el-link
        href="javascript:;"
        class="entry"
        v-for="entry in item.labels"
        :key="entry.type"
        @click="() => changeState(item.area, entry.type, entry.name)"
      >
        {{ entry.name }}
      </el-link>
    </div>
  </div>
</template>
<style scoped>
.box {
  padding: 20px;
  border-right: 1px solid #d3d3d3;
}

.title {
  margin-bottom: 10px;
}
.entry {
  display: block;
  padding: 5px 10px;
}
</style>
