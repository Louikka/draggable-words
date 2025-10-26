import node_resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';



const TERSER_CONFIG = {
    ecma : 2016,
};


export default [
    {
        input : 'src/scripts/main.ts',
        output : {
            //dir : 'public/',
            file : 'public/bundle.js',
            format : 'iife',
        },

        plugins : [
            node_resolve(),
            typescript(),
            terser(TERSER_CONFIG),
        ],
    },
];
