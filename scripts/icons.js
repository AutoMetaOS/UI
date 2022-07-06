const ensureExists = ( dir ) => !fs.existsSync( dir ) ? fs.mkdirSync( dir, { recursive: true } ) : 0;

import { minify } from "html-minifier";
import fs from "fs";
import sharp from "sharp";

import { minifySVG, locationMapping } from "../config.js";

// GENERATORS
const writeSVG = ( rawText, endpoint, name ) => {
    const text = minify( rawText, minifySVG );
    const file = `${ endpoint }/svg/${ name }.svg`;
    fs.writeFileSync( file, text );
};
const writePNG = ( from, endpoint, name ) => sharp( `${ from }/${ name }.svg` )
    .resize( 512, 512 )
    .png()
    .toFile( `${ endpoint }/png/${ name }.png` );

const writeIcon = ( from, endpoint, name ) => sharp( `${ from }/${ name }.svg` )
    .resize( 64, 64 )
    .png()
    .toFile( `${ endpoint }/icon/${ name }.png` );

// PREPROCESS
locationMapping.forEach( ( { from, to } ) => {
    ensureExists( `${ to }/svg` ); // svg
    ensureExists( `${ to }/icon` ); // 128 png
    ensureExists( `${ to }/png` ); // 512 png
} );

// MAIN
locationMapping.forEach( ( { from, to } ) => {
    const images = fs
        .readdirSync( from )
        .filter( file => file.endsWith( ".svg" ) )
        .map( e => e.replace( ".svg", "" ) );

    images.forEach( ( file ) => {
        const rawText = fs.readFileSync( `${ from }/${ file }.svg`, "utf8" );

        // console.log( 'Writing Minified SVGs' );
        writeSVG( rawText, to, file );
        // console.log( 'Writing 512px PNGs' );
        writePNG( from, to, file );
        // console.log( 'Writing 64px Icons' );
        writeIcon( from, to, file );
    } );
} );