// ======================================
// Architecture Observatory - ENTRY
// ======================================

import { initRouter } from "./auditor-core/router.js";

// Global error catcher
window.onerror = (msg, src, line) => {
    document.body.innerHTML = `
        <div style="color:white;padding:20px;font-family:monospace;">
            <h2>CRASH</h2>
            <div>${msg}</div>
            <div>${src}:${line}</div>
        </div>
    `;
};

console.log("APP START");

initRouter();