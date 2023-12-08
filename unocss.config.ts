import type { Preset, Rule } from 'unocss';
import { defineConfig, presetAttributify, presetUno } from 'unocss';

import presetRemToRpx from './preset-rem-to-rpx';

interface mapValue {
  value: string;
  rule: (key: string, value: string) => any;
}

const ruleMapping: Record<string, mapValue> = {
    fs: {
        value: 'font-size',
        rule: (key, value) => [
            new RegExp(`^${key}-(\\d+)$`),
            ([, d]) => ({ [value]: `${d * 2}rpx` })
        ]
    },
    flex: {
        value: 'flex',
        rule: (key, value) => [
            new RegExp(`^${key}-(\\d+)$`),
            ([, d]) => ({ [value]: d })
        ]
    },
    bg: {
        value: 'background-image',
        rule: (key, value) => [
            new RegExp(`^${key}-\\['(.+)'\\]$`),
            ([, d]) => ({ [value]: `url(/static/${d})` })
        ]
    },
    'bg-url': {
        value: 'background',
        rule: (key, value) => [
            new RegExp(`^${key}-\\['(.+)'\\]$`),
            ([, d]) => ({ [value]: `url(/static/${d}) no-repeat` })
        ]
    },
    'bg-c': {
        value: 'background-color',
        rule: (key, value) => [
            new RegExp(`^${key}-\\[(.+)\\]$`),
            ([, d]) => ({ [value]: d })
        ]
    },
    'bg-s': {
        value: 'background-size',
        rule: (key, value) => [
            new RegExp(`^${key}-\\[(.+)\\]$`),
            ([, d]) => ({ [value]: d.replace(',', ' ') })
        ]
    }
};
// 转换 ruleMapping
function getMapRules(Mapping: Record<string, mapValue>): Rule<{}>[] {
    return Object.keys(Mapping).map((key) => {
        const obj = Mapping[key];
        return obj.rule(key, obj.value);
    });
}

export default defineConfig({
    presets: [
        presetAttributify(),
        presetUno(),
        presetRemToRpx({
            baseFontSize: 8 // 0.25rem 2rpx 1px
        }) as Preset
    ],
    theme: {
        preflightRoot: ['page,::before,::after']
    },
    rules: getMapRules(ruleMapping)
});
