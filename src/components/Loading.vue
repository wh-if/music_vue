<script>
export default {
  name: "Loading",
  setup() {},
};
</script>
<template>
  <div
    style="width: 100%; height: 700px"
    v-loading="true"
    element-loading-text="拼命加载中..."
  ></div>
</template>