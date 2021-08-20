<script>
export default {
  name: "SingleSectionBar",
  props:{
    title:{
      type:String,
      required:true,
    },
    tags:Array,
    href:{
      type:String,
      required:true
    }
  },
  setup() {
    return {
    };
  },
};
</script>
<template>
  <div class="bar">
    <h2>
      <i
        class="el-icon-s-promotion"
        :style="{ color: '#c10d0c', paddingRight: '8px' }"
      />{{ title }}
    </h2>
    <div class="tags">
      <span v-for="(item, index) in tags" :key="item.id">
        <el-link type="info" style="font-size:0.9em">
          {{ item.name }}
        </el-link>
        <el-divider v-if="index !== tags.length - 1" direction="vertical" />
      </span>
    </div>
    <div class="more">
      <el-link :href="href" type="info"  style="font-size:0.9em">
        更多<i class="el-icon-arrow-right" style="paddingleft: 5px" />
      </el-link>
    </div>
  </div>
</template>
<style scoped>
.bar {
  overflow: hidden;
  width: 100%;
  border-bottom: 2px solid #c10d0c;
}
h2 {
  padding: 15px 5px 5px 10px;
  float: left;
}
.tags {
  float: left;
  padding: 20px 5px 5px 20px;
}
.more {
  padding: 20px 15px 5px;
  float: right;
}
</style>