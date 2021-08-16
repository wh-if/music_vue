<script>
import { inject, onBeforeMount, ref } from "@vue/runtime-core";
import SectionBar from "../SectionBar.vue";
import TypeList from "../TypeList.vue";
export default {
  components: { SectionBar, TypeList },
  name: "PopularRecommend",
  setup() {
    const axios = inject("axios");
    let hotTags = ref([]);
    let hotItems = ref([]);
    let cdToogle = ref(true);
    let cdList =ref([])

    onBeforeMount(async () => {
      let tags = await axios.get("/playlist/hot").then((res) => {
        return res.tags;
      });
      hotTags.value = tags.slice(0, 5);
      hotItems.value = await axios.get("/personalized?limit=10").then((res) => {
        return res.result;
      });
      cdList.value= await axios.get('/album/list?limit=10').then((res)=>{
        console.log(res);
        return res.products;
      })
    });

    return {
      hotTags,
      hotItems,
      cdToogle,
      cdList
    };
  },
};
</script>

<template>
  <div class="main-box">
    <section>
      <SectionBar title="热门推荐" :tags="hotTags" :href="''" />
      <TypeList :listItems="hotItems" width="830px" />
    </section>
    <section>
      <SectionBar title="新碟上架" />
      <div class="cd-box">
        <el-link class="arrow-left" :underline="false"><i class="el-icon-arrow-left" /></el-link>
        <transition-group>
          
          <div v-show="cdToogle" class="cd-list">
            <div class="cd-list-item" v-for="item in cdList.slice(0,5)" :key="item">
              <img class="cd-list-item-img" :src="item.coverUrl"/> 
               <p>{{item.albumName}}</p>
              <p>{{item.artistName}}</p>
            </div>
          </div>
          <div v-show="!cdToogle" class="cd-list"></div>
        </transition-group>
        <el-link class="arrow-right" :underline="false"><i class="el-icon-arrow-right" /></el-link>
      </div>
    </section>
    <section>
      <SectionBar title="榜单" />
    </section>
  </div>
</template>

<style scoped>
.main-box {
  margin: 0 8px;
}
.cd-box {
  position: relative;
  display: flex;
  background-color: #f5f5f5;
  margin: 25px 0 10px;
  width: 830px;
  height: 200px;
  box-sizing: border-box;
  border: 1px solid #d3d3d3;
}
.arrow-left{
  font-size: 1.6em;
  position: absolute;
  top: 40%;
  left: 5px;
}
.arrow-right{
  font-size: 1.6em;
  position: absolute;
  top: 40%;
  right: 5px;
}
.cd-list{
  width: 760px;
  height: 175px;
  margin: auto;
  display: flex;
  
}
</style>