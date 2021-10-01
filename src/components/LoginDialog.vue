<script>
import { computed, reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { inject, onMounted } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
export default {
  name: "LoginDialog",
  setup() {
    const toggle = ref(true);
    const store = useStore();
    const axios = inject("axios");
    const QRCode = reactive({
      key: "",
      img: "",
      status,
    });
    const loginData = reactive({
      phone: "",
      captcha: "",
      agree: false,
    });
    const loginFormRules = {
      phone: [
        {
          required: true,
          message: "请输入手机号！",
        },
      ],
      captcha: [
        {
          required: true,
          message: "请输入验证码！",
        },
      ],
    };

    let loginDialogIsShow = computed({
      get: () => store.state.loginDialogIsShow,
      set: () => store.commit("changeLoginDialog", { type: false }),
    });
    async function getQRCode() {
      QRCode.key = await axios
        .get("/login/qr/key")
        .then((res) => res.data.unikey);
      QRCode.img = await axios
        .get("/login/qr/create?key=" + QRCode.key + "&qrimg=0")
        .then((res) => res.data.qrimg);
    }
    function onSubmit() {
      if (loginData.phone && loginData.captcha) {
        if (loginData.agree)
          axios
            .get(
              `/login/cellphone?phone=${loginData.phone}&captcha=${loginData.captcha}`
            )
            .then((res) => {
              if (res.code === 200) {
                ElMessage.success("登录成功！");
                //保存用户标识
                sessionStorage.setItem("token", encodeURIComponent(res.token));
                //保存用户信息
                axios.get("/user/account?uid=" + res.id).then((res) => {
                  sessionStorage.setItem(
                    "profile",
                    JSON.stringify(res.profile)
                  );
                  //修改登录状态
                  store.commit("changeLoginStatus", { type: true });
                });
              } else ElMessage.error(res.message);
              //关闭登录对话框
              store.commit("changeLoginDialog", { type: false });
            });
        else ElMessage.error("请勾选同意服务条款、隐私条款和儿童隐私条款！");
      } else {
        ElMessage.error("手机号和验证码不能为空！");
      }
    }
    function sendCaptcha() {
      axios.get("/captcha/sent?phone=" + loginData.phone).then((res) => {
        if (res.data) {
          ElMessage.success("验证码发送成功！");
        } else {
          ElMessage.error(res.message);
        }
      });
    }

    onMounted(() => {
      getQRCode();
    });
    return {
      toggle,
      loginDialogIsShow,
      getQRCode,
      QRCode,
      loginData,
      onSubmit,
      sendCaptcha,
      loginFormRules,
    };
  },
};
</script>
<template>
  <el-dialog
    title="登录"
    center
    custom-class="login-dialog"
    v-model="loginDialogIsShow"
    width="640px"
  >
    <div class="qr-login" v-show="toggle">
      <div class="qr-guide-img"></div>
      <div class="qr-code-box">
        <h3>扫码登录</h3>
        <el-image :src="QRCode.img" class="qr-code-img"></el-image>
        <p>
          使用<el-link style="vertical-align: baseline; margin: 0 5px"
            >网易云音乐APP</el-link
          >扫码登录
        </p>
      </div>
      <el-button plain class="qr-other" @click="toggle = !toggle"
        >选择其他登录方式</el-button
      >
    </div>
    <div class="phone-login" v-show="!toggle">
      <el-form
        class="login-form"
        :rules="loginFormRules"
        status-icon
        :model="loginData"
      >
        <el-form-item class="form-item" prop="phone">
          <el-input placeholder="请输入手机号" v-model="loginData.phone">
            <template #prepend>+86</template>
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" prop="captcha">
          <el-input
            style="width: 270px; margin-right: 10px"
            placeholder="请输入验证码"
            v-model="loginData.captcha"
          ></el-input>
          <el-button @click="sendCaptcha" plain>获取验证码</el-button>
        </el-form-item>
        <el-form-item class="form-item" prop="agree">
          <el-checkbox v-model="loginData.agree">
            同意<el-link>《服务条款》</el-link><el-link>《隐私政策》</el-link
            ><el-link>《儿童隐私政策》</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item class="form-item">
          <el-button @click="onSubmit" style="width: 400px" type="primary"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <template #footer style="padding-bottom: 0; position: relative">
      <img
        style="cursor: pointer; position: absolute; right: 0; bottom: 0"
        v-show="!toggle"
        src="../assets/qr_login_icon.png"
        @click="toggle = !toggle"
        width="60"
        alt="二维码登录"
      />
    </template>
  </el-dialog>
</template>
<style scoped>
.qr-login {
  position: relative;
  height: 300px;
}
.qr-guide-img {
  position: absolute;
  left: 15%;
  width: 125px;
  height: 220px;
  background: url("../assets/qr_guide.png") no-repeat center;
  background-size: contain;
}
.qr-code-box {
  position: absolute;
  padding: 20px 0;
  right: 15%;
  text-align: center;
}
.qr-code-img {
  width: 125px;
  height: 125px;
  margin: 10px 0;
}
.qr-other {
  position: absolute;
  width: 200px;
  bottom: 0;
  left: 50%;
  transform: translate(-100px);
}

.form-item {
  width: 400px;
  margin: 25px auto;
  text-align: center;
}
</style>
<style>
.login-dialog > .el-dialog__footer {
  padding: 0;
}
</style>
