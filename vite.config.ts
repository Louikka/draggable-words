import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import htmlMinifier from 'vite-plugin-html-minifier';


// https://vite.dev/config/
export default defineConfig({
    base : '',
    plugins : [
        svelte(),
        htmlMinifier({
            minify : {
                collapseWhitespace: true,
                keepClosingSlash: false,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: false,
                removeStyleLinkTypeAttributes: false,
                removeEmptyAttributes: true,
                useShortDoctype: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
            },
        }),
    ],
});
