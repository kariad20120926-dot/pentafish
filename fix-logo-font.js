const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\mao\\.gemini\\antigravity\\scratch\\penta-fish';
const files = ['craftsmanship.html', 'journal.html', 'contact.html', 'collections.html', 'philosophy.html'];

const fontFaceCSS = `
        @font-face {
            font-family: 'Westgate';
            src: url('assets/Westgate.woff2') format('woff2'),
                 url('assets/Westgate.woff') format('woff'),
                 url('assets/Westgate.otf') format('opentype'),
                 url('assets/Westgate.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
        }

        .font-westgate {
            font-family: 'Westgate', 'Noto Sans JP', sans-serif;
        }
`;

files.forEach(f => {
    const file = path.join(dir, f);
    let content = fs.readFileSync(file, 'utf8');

    if (!content.includes("@font-face") && !content.includes(".font-westgate")) {
        // Insert font definitions before closing style tag
        content = content.replace('</style>', fontFaceCSS + '    </style>');
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${f}`);
    } else {
        console.log(`${f} already has font definitions.`);
    }
});

console.log('Done');
