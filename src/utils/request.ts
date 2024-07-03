import axios from 'axios'
import errorCode from '@/utils/errorCode'
import { tansParams } from "@/utils/utils";

// 是否显示重新登录
export const isRelogin = { show: false };

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.API_HOST,
  // 超时
  timeout: 30000
})

// request拦截器
service.interceptors.request.use(config => {

  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    let url = config.url + '?' + tansParams(config.params);
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }

  return config
}, error => {
    console.log(error)
    void Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {

  // 未设置状态码则默认成功状态
  const code = (res.data.code || '200') as string;

  // 获取错误信息
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const msg = errorCode[code] || res.data.msg || errorCode.default;
  
  // 二进制数据则直接返回
  if (res.request.responseType ===  'blob' || res.request.responseType ===  'arraybuffer') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res.data;
  }
  if (code === '401') {
    if (!isRelogin.show) {
      isRelogin.show = true;
    }
    return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
  } else if (code === '500') {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Promise.reject(new Error(msg))
  } else if (code === '601') {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Promise.reject(new Error(msg))
  } else if (code !== '200') {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Promise.reject(new Error(msg))
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res.data
  }
},
  error => {
    console.log('err' + error);
    let { message } = error;

    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Promise.reject(new Error(message))
  }
)

export default service
