export const minifySVG = {
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

export const locationMapping = [
    { from: "./icons/src", to: './build/icons/x' },
    { from: "./icons/gen", to: './build/icons/i' },
    { from: "./icons/src/web", to: './build/icons/w' },
];