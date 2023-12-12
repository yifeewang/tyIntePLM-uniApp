// 将hooks下的文件自动导入
const hookModules: any = import.meta.glob('./use*.ts', {eager: true}) || {};
const modules = Object.keys(hookModules).reduce((prevModules, curPathKey) => {
    const curKey = curPathKey.replace(/\.\/(.*).ts$/, (m, n) => n);
    return {
        ...prevModules,
        [curKey]: hookModules[curPathKey].default
    };
}, {});
export default modules;
