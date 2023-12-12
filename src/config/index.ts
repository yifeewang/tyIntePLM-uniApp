import type prod from "@/static/env/prod";
const apiEnv = import.meta.env.MODE;

export function loadEnv<T>(mode: string): T {
    let config;
    const curConfigs: any = import.meta.glob(`../static/env/*.ts`, {eager: true}) || {};
    Object.keys(curConfigs).forEach(key => {
        let regxp = new RegExp(`${mode}.ts$`);
        if(regxp.test(key)) {
            config = curConfigs[key].default;
        }
    });
    return config;
};

const envMap = loadEnv<typeof prod>(apiEnv);

type ApiEnv = typeof apiEnv;
type Env<T extends ApiEnv> = {
  apiEnv: T;
} & typeof envMap;

function createEnv(apiEnv: ApiEnv): Env<typeof apiEnv> {
    return Object.assign({ apiEnv }, envMap);
}

const env = createEnv(apiEnv);
export default env;
