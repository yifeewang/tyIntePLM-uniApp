import testUrl from './testUrl';
import { getInstance } from '@/http/request';
const apiTest = {
    getTest(data = {}, options = {}) {
        return getInstance.http({
            url: testUrl.getTest,
            method: 'GET',
            data,
            ...options
        });
    },
    postTest(data = {}, options = {}) {
        return getInstance.http({
            url: testUrl.postTest,
            method: 'POST',
            data,
            ...options
        });
    }
};

export default apiTest;
