import http from '@/utils/request';

const apiLogin = {
  //   goLogin: (params: any) => http.post<PostTest.data>('/todo/list', params)
  goLogin: (params: any) =>
    http.post<PostTest.data>('/rest/userService/v1/user/userLogin', params)
};

export default apiLogin;
