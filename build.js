import fs from "fs";

const maps = [
    { from: "./src", to: './prod/x/svg' },
    { from: "./gen", to: './prod/i/svg' },
    { from: "./src/web", to: './prod/w/svg' },
];

maps.forEach( ( { from, to } ) => {
    fs.readdirSync( from ).forEach( file => {
        if ( file.includes( '.svg' ) ) {
            const fileData = fs.readFileSync( `${ from }/${ file }`, 'utf8' );

            fs.writeFileSync( `${ to }/${ file }`, fileData );
        };
    } );
} );