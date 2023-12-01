import { APP_ID, APP_VERSION } from './app';

const commonParams = {
  isLoading: true,
  appid: APP_ID,
  appID: 'Safari(13.0.3)',
  v: APP_VERSION // 系统版本，用于获取最新版数据
};

export function getCommonParams() {
  const { token, userId } = useStore('user');

  return Object.assign(
    { token: token.value, uuid: userId.value, timestamp: Date.now() },
    commonParams
  );
}
export function setCommonParams(params: Object) {
  Object.assign(commonParams, params);
}

export const SUCESS_CODE = 10000;
