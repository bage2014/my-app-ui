
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://116.198.163.212:8088/tutorials',
  // baseURL: 'https:/127.0.0.1:8088/tutorials',
  timeout: 5000,
  // headers: {'X-Custom-Header': 'foobar'}
});


// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log("response.data:" + JSON.stringify(response.data));
  if(response.data){
    return response.data;
  }
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});


export default instance