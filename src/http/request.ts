import { isH5, isProduction } from '../utils/platform-tool';
import {
    requestInterceptorFuncWrapper,
    responseInterceptorErrFunc,
    responseInterceptorFuncWrapper
} from './interceptorFunc';
import Ajax from './AjaxUtil';
import hostConfig from '@/config/index';
// const useMock = true
const useMock = false;
const instance = Ajax.create({
    useMock,
    baseURL: isH5 && !isProduction ? '/rest' : hostConfig.baseUrl, // baseURL
    timeout: 15000,
    concurrency: 6
});
// 实例2用于lock时发送请求
const instance2 = Ajax.create({
    useMock,
    baseURL: isH5 && !isProduction ? '/rest' : hostConfig.baseUrl,
    timeout: 10000,
    concurrency: 6
});
// Request 拦截器
instance.interceptors.request.use(requestInterceptorFuncWrapper);
// response 拦截器
instance.interceptors.response.use(
    responseInterceptorFuncWrapper,
    responseInterceptorErrFunc
);
instance2.interceptors.request.use(requestInterceptorFuncWrapper);
instance2.interceptors.response.use(
    responseInterceptorFuncWrapper,
    responseInterceptorErrFunc
);
export const getInstance = {
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

export const lock = () => {
    return instance.lock();
};

export const unlock = () => {
    return instance.unlock();
};

export const baseURI = () => {
    return hostConfig.baseUrl;
};
