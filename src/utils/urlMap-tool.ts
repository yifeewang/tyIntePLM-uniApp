import pagesJson from '../pages.json';

// tabBar页面
const tabBarPagesMap = pagesJson.pages.map((i) => {
    const isTabBar =
    pagesJson.tabBar.list?.length &&
    pagesJson.tabBar.list.find((tab) => tab.pagePath === i.path);
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

export function getUrlType(url: string) {
    if (types.h5.test(url)) return 'h5';
    return 'other';
}
