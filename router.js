// ==========================================
// ARCHITECTURE OBSERVATORY
// ROUTER (DISPATCH LAYER)
// ==========================================

import { mountLandingView } from "./landing/landingView.js";
import { mountRuntimeView } from ".//auditor-core/runtimeView.js";
import { mountSandboxView } from "./sandbox/sandboxView.js";

// ==========================================
// NAVIGATION STATE
// ==========================================

let currentRoute = "landing";

// ==========================================
// ROUTER
// ==========================================

export function navigate(route = "landing") {

    console.log("[ROUTER] Navigate →", route);

    currentRoute = route;

    const root =
        document.getElementById("app-root");

    if (!root) {

        console.error("[ROUTER] Missing #app-root");

        return;
    }

    // Clear previous view safely
    root.innerHTML = "";

    // Create view container
    const view =
        document.createElement("div");

    view.className = "observatory-view";

    root.appendChild(view);

    // ======================================
    // DISPATCH ROUTES
    // ======================================

    switch (route) {

        case "landing":

            mountLandingView(view);
            break;

        case "runtime":

            mountRuntimeView(view);
            break;

        case "sandbox":

            mountSandboxView(view);
            break;

        default:

            view.innerHTML = `
                <div class="panel">
                    <h1>404 - Unknown Route</h1>
                    <p>${route}</p>
                </div>
            `;
    }

    console.log("[ROUTER] Render complete");
}

// ==========================================
// OPTIONAL HELPERS
// ==========================================

export function getCurrentRoute() {
    return currentRoute;
}