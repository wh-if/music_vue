<script>
import { inject, ref } from "@vue/runtime-core";
import SingleSectionBar from "../../SingleSectionBar.vue";
export default {
  components: { SingleSectionBar },
  name: "NewDisc",
  async setup() {
    const axios = inject("axios");
    //新碟上架
    let cdList = await axios.get("/album/newest").then((res) => {
      return res.albums.slice(0, 10);
    });
    const transBox = ref(null);
    const currTrans = ref(0);

    function handleArrow(n) {
      if (n === "left" && currTrans.value > -700) {
        currTrans.value = currTrans.value - 140;
        transBox.value.style.transform = `translate(${currTrans.value}px)`;
      } else if (n === "right" && currTrans.value < 0) {
        currTrans.value = currTrans.value + 140;
        transBox.value.style.transform = `translate(${currTrans.value}px)`;
      }
    }

    return {
      cdList,
      handleArrow,
      transBox,
    };
  },
};
</script>

<template>
  <section>
    <SingleSectionBar title="新碟上架" href="/discover/album" />
    <div class="cd-box">
      <el-button type="text" class="arrow-left" @click="handleArrow('left')"
        ><i class="el-icon-arrow-left" style="color: red"
      /></el-button>
      <div class="content-box">
        <div ref="transBox" class="transition-box">
          <div class="cd-list-item" v-for="item in cdList" :key="item.id">
            <div class="cd-list-item-img-div">
              <img width="100" :src="item.picUrl" />
            </div>
            <p class="text-overflow">{{ item.name }}</p>
            <p class="text-overflow" style="color: gray">
              {{ item.artist.name }}
            </p>
          </div>
        </div>
      </div>

      <el-button class="arrow-right" type="text" @click="handleArrow('right')"
        ><i class="el-icon-arrow-right" style="color: red"
      /></el-button>
    </div>
  </section>
</template>

<style scoped>
.cd-box {
  position: relative;
  display: flex;
  background-color: #f5f5f5;
  margin: 25px auto 10px;
  width: 780px;
  height: 200px;
  border: 1px solid #d3d3d3;
}
.arrow-left {
  font-size: 1.6em;
  position: absolute;
  top: 40%;
  left: 5px;
}
.arrow-right {
  font-size: 1.6em;
  position: absolute;
  top: 40%;
  right: 5px;
}
.content-box {
  position: relative;
  margin: auto 38px;
  width: 760px;
  height: 176px;
  overflow: hidden;
}
.transition-box {
  display: flex;
  justify-content: space-between;
  transform: translate(0);
  transition: all 1s linear;
}
.cd-list-item {
  margin: 10px;
}
.cd-list-item > p {
  font-size: 0.9em;
  margin: 5px 0;
}
.cd-list-item-img-div {
  width: 120px;
  background-image: url("../../../assets/coverall.png");
  background-position: 0 -570px;
}
.text-overflow {
  width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>