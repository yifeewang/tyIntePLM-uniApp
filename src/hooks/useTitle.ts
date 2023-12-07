import { ref } from 'vue';
import useInit from './useInit';
export default function useTitle() {
  const { pageTitle } = useInit();
  const refTitle = ref(pageTitle);
  function changeTitle(title) {
    console.log('changeTitle', title);
    refTitle.value = title;
    uni.setNavigationBarTitle({
      title
    });
  }
  return {
    pageTitle: refTitle,
    changeTitle
  };
}
