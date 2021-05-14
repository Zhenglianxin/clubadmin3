import { Toast } from "vant"; // 提示
import axios from "axios";
import store from "../store";

let real_api:string = "";
let venue_api:string = "https://test.popbadminton.com/venueapi";
let venueUploadImgUrl:string = "https://test.popbadminton.com/pan";

if (window.location.host.indexOf("dev") !== -1) {
  real_api = "https://dev.popbadminton.com";
} else if (window.location.host.indexOf("test") !== -1) {
  real_api = "https://test.popbadminton.com";
} else if (window.location.host.indexOf("preview") !== -1) {
  real_api = "https://preview.popbadminton.com";
  venue_api = "https://uat.popbadminton.com/venueapi";
} else if (window.location.host.indexOf("localhost") !== -1) {
  // real_api = "https://dev.popbadminton.com";
  real_api = "";
} else if (window.location.host.indexOf(":80") !== -1) {
  // real_api = " ";

  real_api = "https://test.popbadminton.com";
} else {
  venueUploadImgUrl = "https://res.popbadminton.com";
  venue_api = "https://venue.popbadminton.com";
  real_api = "https://api.popbadminton.com";
  // real_api = "https://test.popbadminton.com";
  // real_api = "https://preview.popbadminton.com";
  // real_api = "https://test.popbadminton.com";
}

localStorage.baseURL = real_api;

const venueService = axios.create({
  baseURL: venue_api,
  headers: {
    "Content-Type": "application/json-patch+json",
  },
});
const vUploadService = axios.create({
  baseURL: venueUploadImgUrl,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: real_api,
  headers: {
    "Access-Control-Allow-Headers": "openid",
    "Content-Type": "application/json;",
    // 'content-type': 'application/x-www-form-urlencoded',
    // 这些参数需要从小程序传递过来
    // token: ,
    // openid: ,
    // iv: iv,
    // encryptedData: encryptedData,
    // code: code
  },
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});
// 添加请求拦截器
venueService.interceptors.request.use(
  function (config:any) {
    console.log(config);
    config.headers.Authorization =
      sessionStorage.getItem("accessToken") || "";
    // 在发送请求之前做些什么
    // 登陆路径不刷新token
    Toast.loading({
        // message: '加载中...',
        forbidClick: true,
    });
    return config;
  },
  function (error:any) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
service.interceptors.request.use(
  function (config:any) {
    console.log(config);

    config.headers.token =
      sessionStorage.getItem("token") || "";
    config.headers.openid =
      sessionStorage.getItem("openid") || "";
    // 在发送请求之前做些什么
    // 登陆路径不刷新token
    Toast.loading({
        // message: '加载中...',
        forbidClick: true,
    });
    return config;
  },
  function (error:any) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

interface responseConfig {
    status: Number,
    data: any
}
// 添加响应拦截器
venueService.interceptors.response.use(
  function (responseConfig: responseConfig) {
    Toast.clear();
    console.log(responseConfig.status);
    console.log(responseConfig.data);
    if (responseConfig.status === 200 && responseConfig.data.success) {
      return Promise.resolve(responseConfig.data);
    } else {
      console.error(responseConfig.data, status);
      let message = "请求失败！";
      if (responseConfig.data && responseConfig.data.msg) {
        message = responseConfig.data.msg;
      }
      Toast({
        message,
        position: "middle",
        duration: 2000,
      });

      return Promise.reject(new Error(message));
    }
  },
  function (error:any) {
    Toast.clear();
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  function (responseConfig: responseConfig): any {
    Toast.clear();
    if (responseConfig.status === 200 && responseConfig.data.code === 200) {
      return Promise.resolve(responseConfig.data.data);
    } else {
      if (responseConfig.data.code === 206) {
        store.commit("setBlack", true);
        return;
      }
      console.error(responseConfig.data.code, responseConfig.status);
      let message = "请求失败！";
      if (responseConfig.data && responseConfig.data.msg) {
        message = responseConfig.data.msg;
      }
      Toast({
        message,
        position: "middle",
        duration: 2000,
      });

      return Promise.reject(new Error(message));
    }
  },
  function (error:any) {
    Toast.clear();
    return Promise.reject(error);
  }
);

export default { service, vUploadService, venueService };
