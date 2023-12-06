import tool from '@/utils/index';
export default function useInit() {
  onShow(() => {
    console.log('Page Show');
  });
  onHide(() => {
    console.log('Page Hide');
  });
  const pages = getCurrentPages();
  const page = pages[pages.length - 1];
  // @ts-expect-error
  const { fullPath } = page.$page;
  const {
    name: pageName,
    path: pagePath,
    query: pageQuery
  } = tool.qs.parseUrl(fullPath);

  return {
    pageName,
    pagePath,
    pageQuery
  };
}
