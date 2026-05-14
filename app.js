// ==========================================
// app.js
// Architecture Observatory Bootloader
// ==========================================

import { navigate } from "./router.js";

// ==========================================
// GLOBAL ERROR CAPTURE
// ==========================================

window.onerror = (
    message,
    source,
    line,
    column,
    error
) => {

    console.error(
        "[GLOBAL ERROR]",
        message
    );

    document.body.innerHTML = `
        <div style="
            min-height:100vh;
            background:#05060a;
            color:#ff6b6b;
            padding:40px;
            font-family:monospace;
            box-sizing:border-box;
        ">

            <h1>
                RUNTIME CRASH DETECTED
            </h1>

            <div style="
                margin-top:20px;
                opacity:0.9;
            ">
                <strong>Message:</strong>
                ${message}
            </div>

            <div style="
                margin-top:10px;
                opacity:0.7;
            ">
                <strong>Source:</strong>
                ${source}
            </div>

            <div style="
                margin-top:10px;
                opacity:0.7;
            ">
                <strong>Line:</strong>
                ${line}
            </div>

        </div>
    `;
};

// ==========================================
// BOOT LOGGER
// ==========================================

console.log(
    "[BOOT] app.js loaded"
);

// ==========================================
// APPLICATION BOOT
// ==========================================

window.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "[BOOT] DOM ready"
        );

        // ==================================
        // ROOT VALIDATION
        // ==================================

        let root =
            document.getElementById(
                "app-root"
            );

        if (!root) {

            console.warn(
                "[BOOT] app-root missing, rebuilding..."
            );

            root =
                document.createElement(
                    "div"
                );

            root.id = "app-root";

            document.body.appendChild(
                root
            );
        }

        // ==================================
        // ROUTE DETECTION
        // ==================================

        const hash =
            window.location.hash
                .replace("#", "")
                .trim();

        const route =
            hash || "landing";

        console.log(
            "[BOOT] Initial route:",
            route
        );

        // ==================================
        // INITIAL RENDER
        // ==================================

        navigate(route);

        // ==================================
        // HASH ROUTING
        // ==================================

        window.addEventListener(
            "hashchange",
            () => {

                const nextRoute =
                    window.location.hash
                        .replace("#", "")
                        .trim() ||
                    "landing";

                console.log(
                    "[ROUTER] Hash change:",
                    nextRoute
                );

                navigate(nextRoute);
            }
        );

        // ==================================
        // BOOT OVERLAY REMOVAL
        // ==================================

        const overlay =
            document.getElementById(
                "boot-overlay"
            );

        if (overlay) {

            overlay.style.transition =
                "opacity 0.6s ease";

            overlay.style.opacity = "0";

            setTimeout(() => {

                overlay.remove();

            }, 700);
        }

        console.log(
            "[BOOT] Application online"
        );
    }
);