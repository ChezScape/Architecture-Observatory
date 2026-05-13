window.onerror = (msg, src, line) => {
    document.body.innerHTML = `
        <div style="color:white;padding:20px;">
            <h2>CRASH DETECTED</h2>
            <div>${msg}</div>
            <div>${src}:${line}</div>
        </div>
    `;
};

<div id="app-root"></div>

document.body.innerHTML = "BOOT OK - LOADING ROUTER...";

import { initRouter }
from "./router.js";

initRouter();