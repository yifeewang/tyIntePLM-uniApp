import { isDevelopment, isH5 } from '../utils/platform';
import Ajax from './AjaxUtil';
import hostConfig from '@/config/env';
import { getCommonParams } from '@/config/commonParams';
// const useMock = true
const useMock = false;
const addResponseTime = 0; // 增加返回时间，模拟网络差
const instance = Ajax.create({
  useMock,
  baseURL: isH5 && isDevelopment ? '/api' : hostConfig.baseUrl, // 电信baseURL
  timeout: 15000,
  concurrency: 6
});
// 实例2用于lock时发送请求
const instance2 = Ajax.create({
  useMock,
  baseURL: hostConfig.baseUrl,
  timeout: 10000,
  concurrency: 6
});
const sleep = (time = 0) => {
  return new Promise((resolve, reject) => {
    if (time) {
      setTimeout(() => {
        resolve(null);
      }, time);
    } else {
      resolve(null);
    }
  });
};
// 拦截request
const requestInterceptorFuncWrapper = async (config) => {
  config.data = {
    ...getCommonParams(),
    ...config.data
  };
  return config;
};
// Request 拦截器
instance.interceptors.request.use(requestInterceptorFuncWrapper);
// response 拦截器
const responseInterceptorFunc = (response = {}, config) => {
  return Promise.resolve(response);
};
const responseInterceptorFuncWrapper = (response = {}, config) => {
  if (addResponseTime) {
    return sleep(addResponseTime).then(() => {
      return responseInterceptorFunc(response, config);
    });
  } else {
    return responseInterceptorFunc(response, config);
  }
};
const responseInterceptorErrFunc = (err, config = {}) => {
  if (addResponseTime) {
    return sleep(addResponseTime).then(() => {
      return Promise.resolve(err);
    });
  } else {
    return Promise.resolve(err);
  }
};
instance.interceptors.response.use(
  responseInterceptorFuncWrapper,
  responseInterceptorErrFunc
);
instance2.interceptors.request.use(requestInterceptorFuncWrapper);
instance2.interceptors.response.use(
  responseInterceptorFuncWrapper,
  responseInterceptorErrFunc
);
const getInstance = {
  get(options: any = {}) {
    options.method = 'GET';
    return getInstance.http((options = {}));
  },
  post(options: any = {}) {
    options.method = 'POST';
    return getInstance.http((options = {}));
  },
  http(options: any = {}) {
    const { useInstance2, ...others } = options;
    if (useInstance2) {
      return instance2.http(others);
    } else {
      return instance.http(others);
    }
  }
};
export default {
  getInstance,
  lock() {
    return instance.lock();
  },
  unlock() {
    return instance.unlock();
  },
  baseURI() {
    return hostConfig.baseUrl;
  }
};
