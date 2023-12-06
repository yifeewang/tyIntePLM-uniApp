import { getInstance } from '@/http/request';
const apiLogin = {
  goLogin(data = {}, options = {}) {
    return getInstance.http({
      url: '/rest/userService/v1/user/userLogin',
      method: 'POST',
      data,
      ...options
    });
  }
};

export default apiLogin;
