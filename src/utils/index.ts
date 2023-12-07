// 将utils下的文件自动导入
const hookModules: any = import.meta.globEager('./*-tool.ts') || {};
const modules: any = Object.keys(hookModules).reduce(
    (prevModules, curPathKey) => {
        return {
            ...prevModules,
            ...hookModules[curPathKey]
        };
    },
    {}
);
export default modules;
