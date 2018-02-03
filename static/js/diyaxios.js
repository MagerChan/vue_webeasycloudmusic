import axios from 'axios';
axios.defaults.timeout = 8000;
// code状态码200判断
axios.interceptors.response.use((res) => {
  if (res.status === 654) {
    window.alter('请求超时!');
  }
  if (res.data.code !== 200) {
    window.alter('数据返回有误!');
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  console.log('promise error：' + error);
  return Promise.reject(error);
})
export default axios