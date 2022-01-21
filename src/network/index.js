import axios from "axios";
// import router from "@/router";
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: "/api",
  timeout:  15*1000,
  withCredentials: true,
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = token
    // }
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
    
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data  响应
    // if (!response.data.success) {
    //   const isServerLogin = (response.headers.islogin && response.headers.islogin === 'True')
    //   console.log(isServerLogin)
    //   if (!isServerLogin && router.history.current.path !== '/login') {
    //     router.push('/login')
    //   }
    // }
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject({timeout:true});
  }
);
export default _axios;
