<script>
export default {
  name: "TypeList",
  props: {
    listItems: Array,
    width: String
  },
  setup() {},
};
</script>
<template>
  <div class="main" :style="{ width }">
    <div class="item" v-for="item in listItems" :key="item.id">
      <div
        class="img-box"
        :style="{ backgroundImage: `url('${item.picUrl}')` }"
      >
        <div class="item-msg">
          <i class="el-icon-headset" />
          <span>{{
            item.playCount > 10000
              ? Math.floor(item.playCount / 10000) + "万"
              : item.playCount
          }}</span>
          <el-link type="info" title="播放" style="float: right">
            <i class="el-icon-video-play" />
          </el-link>
        </div>
      </div>
      <span class="title">
        {{ item.name }}
      </span>
      <span class="creator">
          {{item.creator===undefined?'':item.creator.nickname}}
      </span>

    </div>
  </div>
</template>
<style scoped>
.main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.item {
  width: 150px;
  padding: 15px 0;
}

.img-box {
  height: 150px;
  width: 150px;
  position: relative;
  background-size: contain;
  background-position: center;
}
.item-msg {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 5px 0;
  background-color: rgba(0, 0, 0, 0.6);
}
.item-msg * {
  margin: 0 5px;
  color: white;
  font-size: 12px;
}
.title {
  padding: 5px;
}
</style>