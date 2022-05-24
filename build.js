import { minify } from "html-minifier";
import fs from "fs";

const minify_config = {
    removeAttributeQuotes: false,
    removeRedundantAttributes: true,
    removeEmptyElements: true,
    removeEmptyAttributes: true,
    removeComments: true,
    preserveLineBreaks: false,
    minifyCSS: true,
    keepClosingSlash: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true
};

const maps = [
    { from: "./src", to: './prod/x/svg' },
    { from: "./gen", to: './prod/i/svg' },
    { from: "./src/web", to: './prod/w/svg' },
];

maps.forEach( ( { from, to } ) => {
    fs.readdirSync( from ).forEach( file => {
        if ( file.includes( '.svg' ) ) {
            const file_data = fs.readFileSync( `${ from }/${ file }`, 'utf8' );
            const result_file_data = minify( file_data, minify_config );

            fs.writeFileSync( `${ to }/${ file }`, result_file_data );
        };
    } );
} );