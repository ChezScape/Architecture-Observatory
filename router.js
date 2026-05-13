// ========================================
// APPLICATION ROUTER
// ========================================

import { mountRuntimeView }
from "./auditor-core/runtimeView.js";

// ========================================
// LANDING VIEW
// ========================================

function mountLandingView(root) {

    root.innerHTML = `
        <div class="hero">

            <div class="title">
                🧠 Architecture Observatory
            </div>

            <div class="subtitle">
                Runtime architecture analysis
                and portable HTML auditing.
            </div>

            <br>

            <button id="runtime-btn">
                Enter Runtime
            </button>

        </div>
    `;

    root
        .querySelector("#runtime-btn")
        .onclick = () => {

            navigate("runtime");
        };
}

// ========================================
// ROUTES
// ========================================

const routes = {

    landing: mountLandingView,

    runtime: mountRuntimeView
};

// ========================================
// NAVIGATION
// ========================================

export function navigate(route) {

    const root =
        document.getElementById(
            "app-root"
        );

    if (!root) return;

    const view =
        routes[route];

    if (!view) {

        root.innerHTML = `
            <div style="
                color:white;
                padding:40px;
            ">
                Route not found:
                ${route}
            </div>
        `;

        return;
    }

    root.innerHTML = "";

    history.pushState(
        {},
        "",
        `#${route}`
    );

    view(root);
}

// ========================================
// INITIALISE
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
try {
    view(root);
} catch (err) {

    console.error(err);

    root.innerHTML = `
        <div style="color:white;padding:20px;">
            <h2>Runtime Crash</h2>
            <pre>${err.message}</pre>
        </div>
    `;
}