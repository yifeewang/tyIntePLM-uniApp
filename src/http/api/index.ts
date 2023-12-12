import { lock, unlock } from '@/http/request';
// 将api下的文件自动导入
const ApiModules: any = import.meta.globEager('./**/*Api.ts') || {};
const modules = Object.keys(ApiModules).reduce((prevModules, curPathKey) => {
    return {
        ...prevModules,
        ...ApiModules[curPathKey].default
    };
}, {});
const Services: any = {
    lock,
    unlock,
    ...modules
};
export default Services;
