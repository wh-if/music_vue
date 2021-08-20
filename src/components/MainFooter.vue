<script>
export default {
  name: "MainFooter",
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="main">
    <div class="copy">
      <el-link
        type="info"
        href="https://st.music.163.com/official-terms/service"
        >服务条款</el-link
      >
      <el-divider direction="vertical" />
      <el-link
        type="info"
        href="https://st.music.163.com/official-terms/privacy"
        >隐私政策</el-link
      >
      <el-divider direction="vertical" />
      <el-link
        type="info"
        href="https://st.music.163.com/official-terms/children"
        >儿童隐私政策</el-link
      >
      <el-divider direction="vertical" />
      <el-link
        type="info"
        href="https://music.163.com/st/staticdeal/complaints.html"
        >版权投诉指引</el-link
      >
      <el-divider direction="vertical" />
      <el-link type="info" href="">意见反馈</el-link>
      <el-divider direction="vertical" />
      <el-link type="info" href="mailto:yyyx@list.nie.netease.com"
        >广告合作</el-link
      >
    </div>
    <div class="copy">
      <span>网易公司版权所有©1997-2021</span
      ><span
        >杭州乐读科技有限公司运营：<el-link
          type="info"
          href="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/8282703158/452a/ca0c/3a10/caad83bc8ffaa850a9dc1613d74824fc.png"
          >浙网文[2021] 1186-054号</el-link
        ></span
      >
    </div>
    <div class="copy">
      <span>违法和不良信息举报电话：0571-89853516</span
      ><span
        >举报邮箱：<el-link href="mailto:ncm5990@163.com" type="info"
          >ncm5990@163.com</el-link
        ></span
      >
    </div>
    <div class="copy">
      <span
        ><el-link
          href="https://beian.miit.gov.cn/#/Integrated/index"
          type="info"
          >粤B2-20090191-18 工业和信息化部备案管理系统网站</el-link
        ></span
      >
      <span>
        <img
          style="height: 15px; vertical-align: middle"
          src="https://s2.music.126.net/style/web2/img/3rd/police.png?e08071254ad1bd0e1c13a2a982a06630"
        />
        <el-link
          type="info"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902002564"
          >浙公网安备 33010902002564号</el-link
        >
      </span>
    </div>
  </div>
</template>

<style scoped>
.main {
  background-color: #f2f2f2;
  border-top: 1px solid #d3d3d3;
  padding: 20px 0 35px;
  font-size: 0.8em;
}
.copy {
  margin: 6px auto;
  text-align: center;
}
.copy > span {
  margin: 0 10px;
}
</style>
