import { getCommonParams } from '@/config/commonParams';
import { sleep } from '@/utils/common-tool';

const addResponseTime = 0; // 增加返回时间，模拟网络差
export const requestInterceptorFuncWrapper = async (config) => {
    config.data = {
        ...getCommonParams(),
        ...config.data
    };
    return config;
};

const responseInterceptorFunc = (response = {}, config) => {
    return Promise.resolve(response);
};

export const responseInterceptorFuncWrapper = (response = {}, config) => {
    if (addResponseTime) {
        return sleep(addResponseTime).then(() => {
            return responseInterceptorFunc(response, config);
        });
    } else {
        return responseInterceptorFunc(response, config);
    }
};

export const responseInterceptorErrFunc = (err, config = {}) => {
    if (addResponseTime) {
        return sleep(addResponseTime).then(() => {
            return Promise.resolve(err);
        });
    } else {
        return Promise.resolve(err);
    }
};
