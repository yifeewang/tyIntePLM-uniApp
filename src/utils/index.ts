// 将utils下的文件自动导入
const hookModules: any = import.meta.glob('./*-tool.ts', {eager: true}) || {};
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
