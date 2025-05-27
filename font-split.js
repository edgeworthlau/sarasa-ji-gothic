import fs from 'fs';
import { fontSplit } from 'cn-font-split';

var families = ["Gothic", "Ui"]
var subfamilies = ["SC", "TC", "HC", "J", "K", "CL"];
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

for (const family of families){
    for (const subfamily of subfamilies) {
        for (const style of styles) {
            const inputBuffer = new Uint8Array(
            fs.readFileSync(`./out/TTF/SarasaJi${family}${subfamily}-${style}.ttf`).buffer,
        );
        console.time('node');
        await fontSplit({
            input: inputBuffer,
            outDir: `./out/WOFF2/SarasaJi${family}${subfamily}-${style}/`,
        });
        console.timeEnd('node');
        }
    }
}