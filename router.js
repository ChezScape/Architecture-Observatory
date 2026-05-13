// ======================================
// ROUTER (ONLY DOM OWNER)
// ======================================

import { mountLandingView } from "./viewer/landingView.js";
import { mountRuntimeView } from "./viewer/runtimeView.js";
import { mountSandboxView } from "./viewer/sandbox.js";

export function initRouter() {

    const root =
        document.getElementById("app-root");

    if (!root) {
        console.error("NO APP ROOT FOUND");
        return;
    }

    root.innerHTML = `
        <div id="view-container"></div>
    `;

    navigate("landing");
}

export function navigate(route) {

    const container =
        document.getElementById("view-container");

    if (!container) {
        console.error("NO VIEW CONTAINER");
        return;
    }

    switch (route) {

        case "landing":
            mountLandingView(container);
            break;

        case "runtime":
            mountRuntimeView(container);
            break;

        case "sandbox":
            mountSandboxView(container);
            break;

        default:
            container.innerHTML = `
                <div style="color:white;">
                    Unknown route: ${route}
                </div>
            `;
    }
}