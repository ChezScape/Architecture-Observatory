import fs from "fs";
import path from "path";

const MODE = process.argv[2]; // "dev" or "portable"

if (!MODE) {
    console.log("Usage: node build.js dev | portable");
    process.exit(1);
}

console.log("Build mode:", MODE);

// ==========================
// DEV MODE
// ==========================
if (MODE === "dev") {
    console.log("Running in DEV mode...");
    console.log("No bundling applied.");
    process.exit(0);
}

// ==========================
// PORTABLE MODE
// ==========================
if (MODE === "portable") {
    console.log("Building portable HTML...");

    const template = fs.readFileSync("./build/template.html", "utf-8");

    // In real system you would walk files here
    const core = fs.readFileSync("../auditor-core/runtime/tracer.js", "utf-8");
    const dom = fs.readFileSync("../auditor-core/runtime/domInterceptor.js", "utf-8");
    const events = fs.readFileSync("../auditor-core/runtime/eventInterceptor.js", "utf-8");
    const state = fs.readFileSync("../auditor-core/runtime/stateTracker.js", "utf-8");

    const bundle = `
/* === AUDITOR CORE BUNDLE === */
${core}
${dom}
${events}
${state}
`;

    const output = template.replace("/*__AUDITOR_BUNDLE__*/", bundle);

    fs.writeFileSync("./build/bundle.html", output);

    console.log("Portable build created: build/bundle.html");
}