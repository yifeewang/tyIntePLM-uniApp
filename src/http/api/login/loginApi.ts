import loginUrl from './loginUrl';
import { getInstance } from '@/http/request';
const apiLogin = {
    goLogin(data = {}, options = {}) {
        return getInstance.http({
            url: loginUrl.goLogin,
            method: 'POST',
            data,
            ...options
        });
    }
};

export default apiLogin;
