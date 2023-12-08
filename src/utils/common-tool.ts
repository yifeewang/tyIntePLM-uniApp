import { isArray, isDate, isObject, isSymbol } from './is-tool';
/**
 * @description 节流
 * @param fn 
 * @param timer 
 * @returns 
 */
export const throttle = (fn, timer = 500) => {
    let preTime;
    return function (params) {
        const nowTime: any = new Date();
        if (!preTime || nowTime - preTime > timer) {
            // @ts-expect-error
            fn.call(this, params);
            preTime = nowTime;
        }
    };
};
/**
 * @description 函数防抖
 * @param func 
 * @param wait 
 * @returns 
 */
export const debounce = (func, wait) => {
    let timer;
    return function () {
    // @ts-expect-error
        const context = this; // 注意 this 指向
        const args = arguments; // arguments中存着e

        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
};
/**
 * @description sleep
 * @param time 
 * @returns 
 */
export const sleep = (time = 0) => {
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
/**
 * @description url处理工具对象
 */
export const qs = {
    /**
     * @description 解析url,获取参数
     * @param {*} str 
     * @returns {*} obj
     */
    _parse: (str = '') => {
        const arr = str.split('?');
        const obj = {};
        arr.forEach((item) => {
            const index = item.indexOf('=');
            if (index === -1) {
                return true;
            }
            const key = item.slice(0, index);
            const val = item.slice(index + 1);
            obj[key] = val;
        });
        return obj;
    },
    /**
     * @description 解析url？后面的,获取参数
     * @param {*} str 
     * @returns {*} obj
     */
    parse: (str = '') => {
        const arr = str.split('&');
        const obj = {};
        arr.forEach((item) => {
            const index = item.indexOf('=');
            if (index === -1) {
                return true;
            }
            const key = item.slice(0, index);
            const val = item.slice(index + 1);
            obj[key] = val;
        });
        return obj;
    },
    /**
     * @description 解析url
     * @param {*} fullPath 
     * @returns {*} obj
     * @returns {*} obj.name
     * @returns {*} obj.path
     * @returns {*} obj.query
     */
    parseUrl: (fullPath = '') => {
        const [path, queryStr] = fullPath.split('?');
        const name = path.slice(path.lastIndexOf('/') + 1);
        const query = {};
        queryStr
            ?.split('&')
            .map((i) => i.split('='))
            .forEach((i) => (query[i[0]] = i[1]));
        return {
            name,
            path,
            query
        };
    },
    /**
     * @description 还原url
     * @param path 
     * @param query 
     * @returns path
     */
    restoreUrl: (path: string, query: Object) => {
        let count = 0;
        for (const key in query) {
            path += `${count === 0 ? '?' : '&'}${key}=${query[key]}`;
            count += 1;
        }
        return path;
    },
    /**
     * @description 还原参数
     * @param obj 
     * @returns path  eg:a=1&b=2
     */
    stringify: (obj = {}) => {
        const arr: any = [];
        for (const key in obj) {
            arr.push(`${key}=${obj[key]}`);
        }
        return arr.join('&');
    },
    /**
     * @description encode query
     * @param obj 
     * @returns 
     */
    encodeQuery: (obj = {}) => {
        return encodeURIComponent(qs.stringify(obj));
    }
};
/**
 * @description 验证身份证是否正确
 * @param str 
 * @returns {*} boolean
 */
export const validateSFZ = (str) => {
    if (!str) {
        return false;
    }
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!reg.test(str)) {
        return false;
    }
    return true;
};
/**
 * @description 比较版本号(多段式  xx.xx.xx, v1和v2长度一致即可)
 * @param v1 
 * @param v2 
 * @returns 
 */
export const compareVersion = (v1, v2) => {
    try {
        const arr1 = v1.split('.');
        const arr2 = v2.split('.');
        const len = arr1.length;

        for (let i = 0; i < len; i++) {
            const l1 = Number(arr1[i]);
            const l2 = Number(arr2[i]);
            if (l1 < l2) {
                return -1;
            } else if (l1 > l2) {
                return 1;
            }
        }
        return 0;
    } catch (err) {
        return 0;
    }
};
/**
 * @description parse string
 * @param target 
 * @returns 
 */
export const parseString = (target) => {
    if (!target) return null;
    return typeof target === 'string' ? JSON.parse(target) : target;
};
/**
 * @description 手机号校验
 * @param phoneNum 
 * @returns 
 */
export const isPhoneNumber = (phoneNum) => {
    const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    return reg.test(phoneNum);
};
/**
 * @description 数组去重 arr：数组;key:根据数组中为key的键名去重
 * @param arr 
 * @param key 
 * @returns newArr
 */
export const filterArr = (arr, key) => {
    const hash = {};
    return arr.reduce((ss, item) => {
    // eslint-disable-next-line no-unused-expressions
        hash[item[key]] ? '' : (hash[item[key]] = true && ss.push(item));
        return ss;
    }, []);
};
/**
 * @description sortByASCII
 * @param obj 
 * @returns 
 */
export const sortByASCII = (obj) => {
    const arr = Object.keys(obj);
    const sortArr = arr.sort();
    const sortObj = {};
    for (const i in sortArr) {
        sortObj[sortArr[i]] = obj[sortArr[i]];
    }
    return sortObj;
};
/**
 * @description 获取uuid
 * @returns uuid
 */
export const getUUid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
/**
 * @description 深拷贝
 * @param source 
 * @returns newSource
 */
export function deepClone<T>(source: T): T {
    return Array.isArray(source)
        ? source.map((item) => deepClone(item))
        : source instanceof Date
            ? new Date(source.getTime())
            : source && typeof source === 'object'
                ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
                    Object.defineProperty(
                        o,
                        prop,
          Object.getOwnPropertyDescriptor(source, prop)!
                    );
                    o[prop] = deepClone((source as { [key: string]: any })[prop]);
                    return o;
                }, Object.create(Object.getPrototypeOf(source)))
                : (source as T);
}
/**
 * @description 数组对比
 * @param a 
 * @param b 
 * @returns 
 */
function looseCompareArrays(a: any[], b: any[]) {
    if (a.length !== b.length) return false;
    let equal = true;
    for (let i = 0; equal && i < a.length; i++) {
        equal = looseEqual(a[i], b[i]);
    }
    return equal;
}
/**
 * @description 深对比
 * @param a 
 * @param b 
 * @returns 
 */
export function looseEqual(a: any, b: any): boolean {
    if (a === b) return true;

    let aValidType = isDate(a);
    let bValidType = isDate(b);
    if (aValidType || bValidType)
        return aValidType && bValidType ? a.getTime() === b.getTime() : false;
    aValidType = isSymbol(a);
    bValidType = isSymbol(b);
    if (aValidType || bValidType) return a === b;
    aValidType = isArray(a);
    bValidType = isArray(b);
    if (aValidType || bValidType)
        return aValidType && bValidType ? looseCompareArrays(a, b) : false;

    aValidType = isObject(a);
    bValidType = isObject(b);
    if (aValidType || bValidType) {
    /* istanbul ignore if: this if will probably never be called */
        if (!aValidType || !bValidType) return false;
        const aKeysCount = Object.keys(a).length;
        const bKeysCount = Object.keys(b).length;
        if (aKeysCount !== bKeysCount) return false;
        for (const key in a) {
            const aHasKey = Object.prototype.hasOwnProperty.call(a, key);
            const bHasKey = Object.prototype.hasOwnProperty.call(b, key);
            if (
                (aHasKey && !bHasKey) ||
        (!aHasKey && bHasKey) ||
        !looseEqual(a[key], b[key])
            ) {
                return false;
            }
        }
    }
    return String(a) === String(b);
}
/**
 * @description 深对比index
 * @param arr 
 * @param val 
 * @returns 
 */
export function looseIndexOf(arr: any[], val: any): number {
    return arr.findIndex((item) => looseEqual(item, val));
}
/**
 * @description 使用proxy转换为异步化的uni方法
 */
export const uniAsync = new Proxy({} as any, {
    get(_, name) {
        return (obj: any) =>
            new Promise((resolve, reject) => {
                uni[name]({
                    ...obj,
                    success: (ret: any) => {
                        resolve(ret);
                    },
                    fail: (err: any) => {
                        reject(err);
                    }
                });
            });
    }
});
