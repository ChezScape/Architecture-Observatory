// ========================================
// MOBILE VIEWER
// ========================================

import { CONFIG } from "../../config/config.js";

export function mountMobileViewer(root) {

    const panel =
        document.createElement("div");

    panel.className = "panel";

    panel.innerHTML = `
        <h3>📱 Mobile View</h3>

        <div>
            Device:
            ${CONFIG.MOBILE ? "Mobile" : "Desktop"}
        </div>

        <div style="
            opacity:0.7;
            margin-top:10px;
        ">
            Responsive runtime layout active
        </div>
    `;

    root.appendChild(panel);
}