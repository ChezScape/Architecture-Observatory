window.onerror = (msg, src, line) => {
    document.body.innerHTML = `
        <div style="color:white;padding:20px;">
            <h2>CRASH</h2>
            <div>${msg}</div>
            <div>${src}:${line}</div>
        </div>
    `;
};

document.body.innerHTML = `
    <div style="color:white;padding:20px;">
        APP STARTED
    </div>
`;

import { initRouter } from "./router.js";

console.log("IMPORT OK");

initRouter();