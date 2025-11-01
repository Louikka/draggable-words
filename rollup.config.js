import node_resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

import postcss from 'rollup-plugin-postcss';

import autoprefixer from 'autoprefixer';



const TERSER_CONFIG = {
    ecma : 2016,
};


export default [
    {
        input : 'src/main.ts',
        output : {
            file : 'public/bundle.js',
            format : 'iife',
        },

        plugins : [
            node_resolve(),

            typescript(),
            terser(TERSER_CONFIG),

            postcss({
                extract : true,
                plugins : [
                    autoprefixer(),
                ],
                minimize : true,
            }),
        ],
    },
];
