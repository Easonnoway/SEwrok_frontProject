import axios from "axios"; // 使用前要先安装依赖：npm install axios

// 创建axios实例
const service = axios.create({
  // 这里可以放一下公用属性等。
  baseURl: "http://localhost:8080", // 用于配置请求接口公用部分，请求时会自动拼接在你定义的url前面。
  timeout: 10000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  function(config) {
    // console.log(config.headers);
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;
