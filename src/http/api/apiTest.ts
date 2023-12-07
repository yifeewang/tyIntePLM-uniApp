import { getInstance } from '@/http/request';
const apiTest = {
    getTest(data = {}, options = {}) {
        return getInstance.http({
            url: '/test',
            method: 'GET',
            data,
            ...options
        });
    },
    postTest(data = {}, options = {}) {
        return getInstance.http({
            url: '/test',
            method: 'POST',
            data,
            ...options
        });
    }
};

export default apiTest;
