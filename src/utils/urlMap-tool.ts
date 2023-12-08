import pagesJson from '../pages.json';

// tabList
export const tabList = pagesJson.tabBar.list;
// tabBar页面
const tabBarPagesMap = pagesJson.pages.map((i) => {
    const isTabBar =
    tabList?.length &&
    tabList.find((tab) => tab.pagePath === i.path);
    return {
        type: isTabBar ? 'tabBarPage' : 'page',
        name: i.name,
        path: `/${i.path}`
    };
});

// 二级页面
const subPagesMap = pagesJson.subPackages.flatMap((i) => {
    return i.pages.map((x) => {
        return {
            type: 'subPage',
            name: x.name,
            path: `/${i.root}/${x.path}`
        };
    });
});

// h5页面
export const h5Map = ['webview'];

export const pagesMap = [...tabBarPagesMap, ...subPagesMap];

// 需要登录权限的页面
export const needAuthPath: Array<string> = [];

const types = {
    h5: /^(https|http):\/\//i
};
/**
 * 
 * @param url 
 * @returns 
 */
export function getUrlType(url: string) {
    if (types.h5.test(url)) return 'h5';
    return 'other';
}
