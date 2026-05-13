// ========================================
// ARCHITECTURE OBSERVATORY
// APPLICATION ROUTER
// ========================================

import { mountLandingView }
    from "./landing/landingView.js";

import { mountRuntimeView }
    from "./auditor-core/runtimeView.js";

import { mountSandboxView }
    from "./sandbox/sandboxView.js";

import { Trace }
    from "./auditor-core/runtime/tracer.js";

// ========================================
// ROUTES
// ========================================

const routes = {

    landing: mountLandingView,

    runtime: mountRuntimeView,

    sandbox: mountSandboxView
};

// ========================================
// NAVIGATION
// ========================================

export function navigate(route) {

    const root =
        document.getElementById("app-root");

    if (!root) return;

    const view = routes[route];

    if (!view) {

        root.innerHTML = `
            <div class="error-view">
                Unknown Route: ${route}
            </div>
        `;

        return;
    }

    // CLEANUP
    root.innerHTML = "";

    // TRACE
    Trace.log({
        type: "ROUTE_CHANGE",
        source: "Router",
        message: `Navigated to ${route}`
    });

    // URL
    history.pushState(
        {},
        "",
        `#${route}`
    );

    // MOUNT
    view(root);
}

// ========================================
// INIT
// ========================================

export function initRouter() {

    const route =
        location.hash
            .replace("#", "")
            || "landing";

    navigate(route);

    window.addEventListener(
        "popstate",
        () => {

            const route =
                location.hash
                    .replace("#", "")
                    || "landing";

            navigate(route);
        }
    );
}