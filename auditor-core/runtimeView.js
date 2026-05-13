// ========================================
// ARCHITECTURE OBSERVATORY
// RUNTIME VIEW
// ========================================

import { navigate }
    from "../router.js";

// ----------------------------------------
// VIEWERS
// ----------------------------------------

import { mountDevTools }
    from "./viewer/devtoolsPanel.js";

import { mountBuildDashboard }
    from "./viewer/buildDashboard.js";

import { mountMobileViewer }
    from "./viewer/mobileViewer.js";

import { mountStatusBadge }
    from "./viewer/statusBadge.js";

import { mountFullAutonomousDebugAgent }
    from "./viewer/fullAutonomousDebugAgent.js";

import { mountUploadPanel }
    from "./viewer/uploadPanel.js";

// ----------------------------------------
// RUNTIME VIEW
// ----------------------------------------

export function mountRuntimeView(root) {

    // ====================================
    // ROOT CONTAINER
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
            🧠 Runtime Observatory
        </div>

        <div style="display:flex; gap:10px;">

            <button id="home-btn">
                Home
            </button>

            <button id="sandbox-btn">
                Sandbox
            </button>

        </div>
    `;

    container.appendChild(topbar);

    // ====================================
    // BUTTON ROUTING
    // ====================================

    topbar.querySelector("#home-btn")
        .onclick = () => {

            navigate("landing");
        };

    topbar.querySelector("#sandbox-btn")
        .onclick = () => {

            navigate("sandbox");
        };

    // ====================================
    // DASHBOARD GRID
    // ====================================

    const grid =
        document.createElement("div");

    grid.className = "grid";

    container.appendChild(grid);

    // ====================================
    // BUILD DASHBOARD
    // ====================================

    mountBuildDashboard(grid, {

        bundleSize: 0,
        traceCount: 0,
        health: "OK"
    });

    // ====================================
    // DEVTOOLS
    // ====================================

    mountDevTools(grid);

    // ====================================
    // MOBILE VIEWER
    // ====================================

    mountMobileViewer(grid);

    // ====================================
    // DEBUG AGENT
    // ====================================

    mountFullAutonomousDebugAgent(grid);

    // ====================================
    // PORTABLE HTML UPLOAD PANEL
    // ====================================

    mountUploadPanel(grid);

    // ====================================
    // STATUS BADGE
    // ====================================

    mountStatusBadge(container);

    // ====================================
    // FOOTER
    // ====================================

    const footer =
        document.createElement("div");

    footer.style.marginTop = "30px";
    footer.style.opacity = "0.5";
    footer.style.fontSize = "12px";
    footer.style.textAlign = "center";

    footer.innerHTML = `
        Architecture Observatory • Runtime Intelligence Layer
    `;

    container.appendChild(footer);
}