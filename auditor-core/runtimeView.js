// ========================================
// RUNTIME VIEW
// ========================================

import { navigate }
from "../router.js";

import { mountUploadPanel }
from "./viewer/uploadPanel.js";

import { mountBuildDashboard }
from "./viewer/buildDashboard.js";

export function mountRuntimeView(root) {

    root.innerHTML = "";

    // ====================================
    // CONTAINER
    // ====================================

    const container =
        document.createElement("div");

    container.className =
        "runtime-container";

    root.appendChild(container);

    // ====================================
    // TOPBAR
    // ====================================

    const topbar =
        document.createElement("div");

    topbar.className = "hud-bar";

    topbar.innerHTML = `
        <div>
            🧠 Architecture Observatory
        </div>

        <div style="
            display:flex;
            gap:10px;
        ">

            <button id="home-btn">
                Home
            </button>

        </div>
    `;

    container.appendChild(topbar);

    // ====================================
    // HOME BUTTON
    // ====================================

    topbar
        .querySelector("#home-btn")
        .onclick = () => {

            navigate("landing");
        };

    // ====================================
    // GRID
    // ====================================

    const grid =
        document.createElement("div");

    grid.className = "grid";

    container.appendChild(grid);

    // ====================================
    // BUILD DASHBOARD
    // ====================================

    mountBuildDashboard(grid);

    // ====================================
    // UPLOAD PANEL
    // ====================================

    mountUploadPanel(grid);
}