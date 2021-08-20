<template>
  <MainHeader />
  <router-view></router-view>
  <MainFooter />
  <el-backtop />

  <LoginDialog/>
</template>

<script>
import LoginDialog from './components/LoginDialog.vue';
import MainFooter from "./components/MainFooter.vue";
import MainHeader from "./components/MainHeader.vue";
export default {
  name: "App",
  components: {
    MainHeader,
    MainFooter,
    LoginDialog,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  font-size: 14px;
  min-width: 1180px;
  background-color: #f5f5f5;
}

</style>
