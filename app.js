// ======================================
// Architecture Observatory - ENTRY POINT
// ======================================

import { initRouter } from "./auditor-core/router.js";

// --------------------------------------
// GLOBAL SAFETY NET (CATCH ALL ERRORS)
// --------------------------------------

window.onerror = (msg, src, line, col, err) => {
    document.body.innerHTML = `
        <div style="
            color:white;
            padding:20px;
            font-family:monospace;
            background:#110000;
        ">
            <h2>CRASH DETECTED</h2>
            <div><strong>Message:</strong> ${msg}</div>
            <div><strong>Source:</strong> ${src}</div>
            <div><strong>Line:</strong> ${line}</div>
        </div>
    `;
};

window.onunhandledrejection = (event) => {
    document.body.innerHTML = `
        <div style="
            color:white;
            padding:20px;
            font-family:monospace;
            background:#001011;
        ">
            <h2>UNHANDLED PROMISE ERROR</h2>
            <pre>${event.reason}</pre>
        </div>
    `;
};

// --------------------------------------
// BOOT LOG
// --------------------------------------

console.log("🚀 Observatory Booting...");

// --------------------------------------
// START ROUTER (ONLY ENTRY CONTROL)
// --------------------------------------

initRouter();