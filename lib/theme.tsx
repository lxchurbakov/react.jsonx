import React from 'react';

export const font = {
    family: '"PT Mono", monospace',
    size: '18px',
};

export const colors = {
    // black: '#111511',
    text: '#ffffff',
    background: '#121212',
    border: '#cccccc',
    // white: '#ffffff',
    card: '#313131',
    // carder: '#f6f6f6',

    // blue: '#4147d3',
    // bluer: '#11157B',
    // bluest: '#4248D5',

    // red: '#ff1050',
};

export const helmet = [
    <link key="preload-0" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link key="preload-1" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />,
    <link key="preload-2" href="https://fonts.googleapis.com/css2?family=PT+Mono:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"></link>,
    <style key="reset">{`body { margin: 0; padding: 0; background: ${colors.background}; }`}</style>
];
