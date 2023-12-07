const apiEnv: ApiEnv = 'dev';

const envMap = {
    dev: {
        baseUrl: 'http://120.46.143.122:7002',
        apiBaseUrl: 'http://120.46.143.122:7002'
    },
    beta: {
        baseUrl: 'http://120.46.143.122:7002',
        apiBaseUrl: 'http://120.46.143.122:7002'
    },
    prod: {
        baseUrl: 'http://120.46.143.122:7002',
        apiBaseUrl: 'http://120.46.143.122:7002'
    },
    local: {
        baseUrl: 'http://120.46.143.122:7002',
        apiBaseUrl: 'http://120.46.143.122:7002'
    }
};

type ApiEnv = keyof typeof envMap;
type Env<T extends ApiEnv> = {
  apiEnv: T;
} & (typeof envMap)[T];

function createEnv(apiEnv: ApiEnv): Env<typeof apiEnv> {
    return Object.assign({ apiEnv }, envMap[apiEnv]);
}

const env = createEnv(apiEnv);
export default env;
