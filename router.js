// ==========================================
// router.js
// Architecture Observatory Router
// ==========================================

export function navigate(route = "landing") {

    console.log(
        "[ROUTER] Navigating:",
        route
    );

    // ======================================
    // ROOT RESOLUTION
    // ======================================

    let root =
        document.getElementById(
            "app-root"
        );

    // Fallback recovery
    if (!root) {

        console.warn(
            "[ROUTER] app-root missing. Rebuilding..."
        );

        root =
            document.createElement("div");

        root.id = "app-root";

        document.body.appendChild(root);
    }

    // ======================================
    // SAFE ROOT RESET
    // ======================================

    root.innerHTML = "";

    // ======================================
    // MAIN VIEW CONTAINER
    // ======================================

    const view =
        document.createElement("div");

    view.className =
        "observatory-view";

    // ======================================
    // ROUTE RENDERING
    // ======================================

    if (route === "landing") {

        view.innerHTML = `
            <div style="
                min-height:100vh;
                background:
                    radial-gradient(
                        circle at top,
                        #122033,
                        #05060a
                    );
                color:white;
                font-family:
                    Arial,
                    sans-serif;
                padding:40px;
                box-sizing:border-box;
            ">

                <h1 style="
                    font-size:42px;
                    margin-bottom:10px;
                ">
                    Architecture Observatory
                </h1>

                <div style="
                    opacity:0.7;
                    margin-bottom:40px;
                ">
                    Runtime Intelligence Platform
                </div>

                <div style="
                    display:grid;
                    gap:20px;
                    max-width:700px;
                ">

                    <div style="
                        background:#101722;
                        border:1px solid #1d2a3d;
                        border-radius:16px;
                        padding:20px;
                    ">
                        <h2>
                            System Status
                        </h2>

                        <p>
                            Router online and rendering correctly.
                        </p>
                    </div>

                    <div style="
                        background:#101722;
                        border:1px solid #1d2a3d;
                        border-radius:16px;
                        padding:20px;
                    ">
                        <h2>
                            Active Route
                        </h2>

                        <p>
                            ${route}
                        </p>
                    </div>

                    <div style="
                        background:#101722;
                        border:1px solid #1d2a3d;
                        border-radius:16px;
                        padding:20px;
                    ">
                        <h2>
                            Runtime Boot
                        </h2>

                        <p>
                            Startup chain verified successfully.
                        </p>
                    </div>

                </div>

            </div>
        `;
    }

    // ======================================
    // RUNTIME VIEW
    // ======================================

    else if (route === "runtime") {

        view.innerHTML = `
            <div style="
                min-height:100vh;
                background:#05060a;
                color:#7ee7ff;
                font-family:monospace;
                padding:30px;
            ">

                <h1>
                    Runtime Monitor
                </h1>

                <pre>
SYSTEM ONLINE
ROUTER ACTIVE
VIEW PIPELINE HEALTHY
MODULE CHAIN STABLE
                </pre>

            </div>
        `;
    }

    // ======================================
    // SANDBOX VIEW
    // ======================================

    else if (route === "sandbox") {

        view.innerHTML = `
            <div style="
                min-height:100vh;
                background:#09111b;
                color:white;
                padding:40px;
                font-family:sans-serif;
            ">

                <h1>
                    Sandbox Environment
                </h1>

                <p>
                    Portable testing environment loaded.
                </p>

            </div>
        `;
    }

    // ======================================
    // UNKNOWN ROUTE
    // ======================================

    else {

        view.innerHTML = `
            <div style="
                min-height:100vh;
                background:black;
                color:red;
                padding:40px;
                font-family:monospace;
            ">

                <h1>
                    ROUTE ERROR
                </h1>

                <p>
                    Unknown route:
                    ${route}
                </p>

            </div>
        `;
    }

    // ======================================
    // FINAL MOUNT
    // ======================================

    root.appendChild(view);

    console.log(
        "[ROUTER] Render complete"
    );
}