<script>
export default {
  name: "SectionBar",
  props:["title","tags","href"],
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
      <Fragment v-for="(item, index) in tags" :key="item.id">
        <el-link type="info" style="font-size:0.9em">
          {{ item.name }}
        </el-link>
        <el-divider v-if="index !== tags.length - 1" direction="vertical" />
      </Fragment>
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
  border-bottom: 2px solid #c10d0c;
}
h2 {
  padding: 15px 5px 5px 0;
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