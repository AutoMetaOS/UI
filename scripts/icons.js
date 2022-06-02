import { minify } from "html-minifier";
import fs from "fs";

const ensure = ( dir ) => {
    if ( !fs.existsSync( dir ) ) {
        fs.mkdirSync( dir, { recursive: true } );
    };
    return 0;
};

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
    { from: "./icons/src", to: './prod/x/svg' },
    { from: "./icons/gen", to: './prod/i/svg' },
    { from: "./icons/src/web", to: './prod/w/svg' },
];

maps.forEach( ( { from, to } ) => {
    ensure( to );
    fs.readdirSync( from ).forEach( file => {
        if ( file.includes( '.svg' ) ) {
            const file_data = fs.readFileSync( `${ from }/${ file }`, 'utf8' );
            const result_file_data = minify( file_data, minify_config );

            fs.writeFileSync( `${ to }/${ file }`, result_file_data );
        };
    } );
} );