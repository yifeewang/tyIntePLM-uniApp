import { qs } from './common-tool';
import { getUrlType, needAuthPath, pagesMap } from './urlMap-tool';

const { parseUrl, restoreUrl } = qs;
/**
 * 
 * @param e 标签原始对象参数
 * @returns 
 */
export function onUrlPage(e: any) {
    const { url } = e.currentTarget.dataset;
    if (!url) return;
    const urlType = getUrlType(url);
    const { name, path, query } = parseUrl(url);
    console.log('onUrlPage', url, urlType, name, path, query);
    if (urlType === 'other' && pagesMap.find((i) => i.name === name)) {
        if (needAuthPath.includes(name)) return turnPage('login');
        // 原生页
        turnPage(name, query);
    } else {
        turnPage('webview', Object.assign({ url: path }, query));
    }
}
/**
 * 
 * @param name page.json里面的页面name
 * @param query query参数
 * @returns 
 */
export function turnPage(name: string, query: Types.Query = {}): any {
    if (needAuthPath.includes(name)) return turnPage('login');
    const targetPage = pagesMap.find((i) => i.name === name);
    if (!targetPage) return;
    const isReplace = query.replace;
    delete query.replace;
    const { type, path } = targetPage;
    const url = restoreUrl(path, query);
    const params = { url };
    if (type === 'tabBarPage') return uni.switchTab(params);
    if (!isReplace) return uni.navigateTo(params);
    uni.redirectTo(params);
}
/**
 * 
 * @param delta 返回的步数
 */
export function back(delta: number) {
    uni.navigateBack({
        delta
    });
}
