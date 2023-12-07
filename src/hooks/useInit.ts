import tool from '@/utils/index';
export default function useInit() {
  onShow(() => {});
  onHide(() => {});
  const pages = getCurrentPages();
  const page = pages[pages.length - 1];
  // @ts-expect-error
  const { fullPath, meta } = page.$page;
  const { titleText } = meta?.navigationBar || {};
  const {
    name: pageName,
    path: pagePath,
    query: pageQuery
  } = tool.qs.parseUrl(fullPath);

  return {
    pageName,
    pagePath,
    pageQuery,
    pageTitle: titleText
  };
}
