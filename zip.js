import fs from 'fs';
import archiver from 'archiver';

var families = ["Gothic", "Ui"]
var subfamilies = ["SC", "TC", "HC", "J", "K", "CL"];
var base = ['TTF', 'TTF-Unhinted', 'WOFF2'];
var styles = [
    "ExtraLight",
    "ExtraLightItalic",
    "Light",
    "LightItalic",
    "Regular",
    "Italic",
    "SemiBold",
    "SemiBoldItalic",
    "Bold",
    "BoldItalic"
];

for (const b of base) {
    await fs.promises.mkdir(`./release/${b}`, { recursive: true });
    for (const family of families) {
        for (const subfamily of subfamilies) {
            const outputName = `SarasaJi${family}${subfamily}-${b}.zip`;
            const outputPath = `./release/${b}/${outputName}`;

            const output = fs.createWriteStream(outputPath);
            const archive = archiver('zip', {
                zlib: { level: 9 }
            });
            archive.on('error', err => { throw err; });
            output.on('close', () => {
                console.log(`Success: ${outputName}`);
            });
            archive.pipe(output);

            if (b === 'WOFF2') {
                for (const style of styles) {
                    const dirname = `SarasaJi${family}${subfamily}-${style}`;
                    const inputPath = `./out/${b}/${dirname}`;
                    archive.directory(inputPath, { name: '' });
                }
            }
            else {
                for (const style of styles) {
                    const filename = `SarasaJi${family}${subfamily}-${style}.ttf`;
                    const inputPath = `./out/${b}/${filename}`;
                    archive.file(inputPath, { name: filename });
                }
            }

            archive.finalize();
        }
    }
}