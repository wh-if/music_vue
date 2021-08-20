import axios from "axios";
import { ElNotification } from "element-plus";
export default function (app) {
  // Full config:  https://github.com/axios/axios#request-config
  // axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
  // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  let config = {
    baseURL: 'http://localhost:3000',
    timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
  };

  const _axios = axios.create(config);

  _axios.interceptors.request.use(
    function (config) {
      //   const token = Vue.ls.get(ACCESS_TOKEN)
      const token = localStorage.getItem('token')
      if (token) {
        config.headers['token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  _axios.interceptors.response.use(
    function (response) {
      const res = response.data
      if (res.code !== 0 && res.code !== 200) {
        ElNotification.error({
          message: res.message || res.msg
        })
        // 401:未登录;
        if (res.code === 401 || res.code === 403 || res.code === 999) {
          ElNotification.error({
            title: '请登录'
          })

        }
        return Promise.reject('error')
      } else {
        return res
      }
    },
    function (error) {
      // Do something with response error
      if (error.response) {
        const data = error.response.data
        // const token = Vue.ls.get(ACCESS_TOKEN)
        if (error.response.status === 403) {
          ElNotification.error({
            title: '403',
            message: data.message || data.msg
          })

        }
        if (error.response.status === 401) {
          ElNotification.error({
            title: '401',
            message: '你没有权限。'
          })

          // if (token) {
          //   store.dispatch('Logout').then(() => {
          //     setTimeout(() => {
          //       window.location.reload()
          //     }, 1500)
          //   })
          // }
        }
      }
      return Promise.reject(error);
    }
  );
  app.provide('axios', _axios)
}
