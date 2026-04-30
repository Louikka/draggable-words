import { defineConfig } from 'vite';
import htmlMinifier from 'vite-plugin-html-minifier';


export default defineConfig({
    base : '',
    plugins : [
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
