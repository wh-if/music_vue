<script>
import { inject, ref } from "@vue/runtime-core";
import SingleSectionBar from "../../SingleSectionBar.vue";
export default {
  components: { SingleSectionBar },
  name: "NewDisc",
  async setup() {
    const axios = inject("axios");
    //新碟上架
    let cdList = await axios.get("/album/list?limit=10").then((res) => {
      return res.products;
    });

    let arrow = ref(0);
    let cdToogle = ref(true);

    function handleArrow(n) {
      if (n === 0) {
        arrow.value = cdToogle.value ? 1 : 0;
      } else {
        arrow.value = cdToogle.value ? 0 : 1;
      }
      cdToogle.value = !cdToogle.value;
    }

    return {
      cdList,
      cdToogle,
      handleArrow,
      arrow,
    };
  },
};
</script>

<template>
  <section>
    <SingleSectionBar title="新碟上架" />
    <div class="cd-box">
      <el-button type="text" class="arrow-left" @click="handleArrow(0)"
        ><i class="el-icon-arrow-left" style="color: red"
      /></el-button>
      <div class="transition-box">
        <transition :name="arrow === 0 ? 'left' : 'right'">
          <div v-if="cdToogle" class="cd-list">
            <div
              class="cd-list-item"
              v-for="item in cdList.slice(0, 5)"
              :key="item.albumId"
            >
              <div class="cd-list-item-img-div">
                <img width="100" :src="item.coverUrl" />
              </div>
              <p class="text-overflow">{{ item.albumName }}</p>
              <p class="text-overflow" style="color: gray">
                {{ item.artistName }}
              </p>
            </div>
          </div>
        </transition>
        <transition :name="arrow === 1 ? 'left' : 'right'">
          <div v-if="!cdToogle" class="cd-list">
            <div
              class="cd-list-item"
              v-for="item in cdList.slice(5)"
              :key="item.albumId"
            >
              <div class="cd-list-item-img-div">
                <img width="100" :src="item.coverUrl" />
              </div>
              <p class="text-overflow">{{ item.albumName }}</p>
              <p class="text-overflow" style="color: gray">
                {{ item.artistName }}
              </p>
            </div>
          </div>
        </transition>
      </div>

      <el-button class="arrow-right" type="text" @click="handleArrow(1)"
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
.transition-box {
  position: relative;
  margin: auto 38px;
  width: 760px;
  height: 176px;
  overflow: hidden;
}
.cd-list {
  position: absolute;
  left: 0;
}
.cd-list-item {
  margin: 10px 10px;
  display: inline-block;
}
.cd-list-item > p {
  font-size: 0.9em;
  margin: 5px 0;
}
.cd-list-item-img-div {
  width: 120px;
  background-image: url('../../../assets/coverall.png');
  background-position: 0 -570px;
}
.text-overflow {
  width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.left-enter-active,
.left-leave-active,
.right-enter-active,
.right-leave-active {
  transition: all 1s linear;
}

.left-enter-from,
.left-leave-to {
  left: -760px;
}
.right-enter-from,
.right-leave-to {
  left: 760px;
}
</style>