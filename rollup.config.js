const postcss = require('rollup-plugin-postcss');
const typescript = require('@rollup/plugin-typescript');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');
const packageJson = require('./package.json');

const plugins = [
    peerDepsExternal(),
    resolve(),
    typescript(),
    commonjs(),
    postcss({
        modules: true,
        extract: false,
        inject: true,
        minimize: true,
    }),
    terser(),
];

module.exports = [
    {
        input: 'src/index.tsx',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
                exports: 'auto',
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
                exports: 'auto',
            },
        ],
        plugins: plugins,
        onwarn(warning, warn) {
            if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('use client')) {
                return;
            }
            warn(warning);
        },
    },
];
