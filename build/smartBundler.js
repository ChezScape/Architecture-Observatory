import fs from "fs";

const ORDER = [
    "runtime/tracer.js",
    "runtime/domInterceptor.js",
    "runtime/eventInterceptor.js",
    "runtime/stateTracker.js"
];

export function smartBundle(basePath) {

    let output = "/* SMART BUNDLE START */\n";

    for (const file of ORDER) {

        const full = `${basePath}/${file}`;
        const code = fs.readFileSync(full, "utf-8");

        output += `\n// === ${file} ===\n`;
        output += code + "\n";
    }

    output += "\n/* SMART BUNDLE END */";

    return output;
}