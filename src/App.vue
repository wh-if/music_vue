<template>
  <MainHeader />
  <router-view></router-view>
  <MainFooter/>
  <el-backtop/>
  
</template>

<script>
import MainFooter from './components/MainFooter.vue';
import MainHeader from "./components/MainHeader.vue";
export default {
  name: "App",
  components: {
    MainHeader,
    MainFooter,
  },
};
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html,
body {
  font-size: 14px;
  min-width: 1660px;
  background-color: #f5f5f5;
}
.text-overflow{
  width:130px;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow:ellipsis;
}
</style>
