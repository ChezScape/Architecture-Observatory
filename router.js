// ========================================
// OBSERVATORY ROUTER
// ========================================

import { mountLandingView } from "./landing/landingView.js";

import { mountSandboxView } from "./sandbox/sandboxView.js";

import { mountRuntimeView } from "./auditor-core/runtimeView.js";

// ----------------------------------------
// ROUTE TABLE
// ----------------------------------------

const routes = {

    landing: mountLandingView,

    runtime: mountRuntimeView,

    sandbox: mountSandboxView
};

// ----------------------------------------
// NAVIGATION
// ----------------------------------------

export function navigate(route) {

    const root = document.getElementById("app-root");

    if (!root) return;

    root.innerHTML = "";

    const view = routes[route];

    if (!view) {
        root.innerHTML = `
            <div style="padding:20px">
                Unknown route: ${route}
            </div>
        `;
        return;
    }

    history.pushState({}, "", `#${route}`);

    view(root);
}

// ----------------------------------------
// INITIAL LOAD
// ----------------------------------------

export function initRouter() {

    const route =
        location.hash.replace("#", "") || "landing";

    navigate(route);

    window.addEventListener("popstate", () => {

        const route =
            location.hash.replace("#", "") || "landing";

        navigate(route);
    });
}