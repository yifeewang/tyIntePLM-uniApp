import { resolve } from 'node:path';
import uni from '@dcloudio/vite-plugin-uni';
import AutoImportTypes from 'auto-import-types';
import PiniaAutoRefs from 'pinia-auto-refs';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import dev from './src/static/env/dev';
import test from './src/static/env/test';
import prod from './src/static/env/prod';

function loadEnv<T>(mode: string): T {
    let config;
    switch (mode) {
    case 'dev':
        config = dev;
        break;
    case 'test':
        config = test;
        break;
    case 'prod':
        config = test;
        break;
    default:
        config = prod;
        break;
    }
    return config;
};

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    const envConfig = loadEnv<typeof dev>(mode);
    console.log('import.meta.env.MODE:', mode, envConfig);
    return {
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src')  
            }
        },
        plugins: [
            AutoImportTypes(),
            PiniaAutoRefs(),
            AutoImport({
                dts: 'src/auto-imports.d.ts',
                imports: [
                    'vue',
                    'uni-app',
                    'pinia',
                    {
                        '@/helper/pinia-auto-refs': ['useStore']
                    }
                ],
                exclude: ['createApp'],
                eslintrc: {
                    enabled: true
                }
            }),
            Components({
                extensions: ['vue'],
                dts: 'src/components.d.ts'
            }),
            uni(),
            Unocss()
        ],
        server: {
            open: false, // 自动打开
            cors: true,
            port: 8088,
            base: './ ', // 生产环境路径
            proxy: {
                // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
                '/rest': {
                    target: envConfig.baseUrl, // 后端服务实际地址
                    changeOrigin: true, // 开启代理
                    rewrite: (path) => path.replace(/^\/rest/, '')
                }
            }
        }
    };
});
