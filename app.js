import { SETTINGS } from "./auditor-core/config/settings.js";

import { EVENTS } from "./auditor-core/runtime/eventTypes.js";

import { Trace } from "./auditor-core/runtime/tracer.js";

import {
    safeExecute
} from "./auditor-core/runtime/errorBoundary.js";

import { Observatory } from "./auditor-core/index.js";

import { mountDevTools } from "./auditor-core/viewer/devtoolsPanel.js";

import { mountSwitchButton } from "./auditor-core/viewer/switchButton.js";

import { mountBuildDashboard } from "./auditor-core/viewer/buildDashboard.js";

import { mountMobileViewer } from "./auditor-core/viewer/mobileViewer.js";

// ========================================
// SYSTEM BOOT TRACE
// ========================================

Trace.log({
    type: EVENTS.SYSTEM_BOOT,
    message: `${SETTINGS.APP_NAME} booting`,
    timestamp: Date.now()
});

// ========================================
// SAFE OBSERVATORY STARTUP
// ========================================

safeExecute("observatory_boot", () => {

    // ========================================
    // START CORE OBSERVATORY
    // ========================================

    Observatory.start();

    // ========================================
    // REGISTER PWA SERVICE WORKER
    // ========================================

    if ("serviceWorker" in navigator) {

        navigator.serviceWorker
            .register("./pwa/service-worker.js")

            .then(() => {

                Trace.log({
                    type: EVENTS.SYSTEM_READY,
                    category: "service_worker",
                    message: "Service worker registered",
                    timestamp: Date.now()
                });

            })

            .catch((err) => {

                Trace.log({
                    type: EVENTS.ERROR,
                    category: "service_worker",
                    message: err.message,
                    timestamp: Date.now()
                });

            });
    }

    // ========================================
    // SYSTEM READY TRACE
    // ========================================

    Trace.log({
        type: EVENTS.SYSTEM_READY,
        message: `${SETTINGS.APP_NAME} ready`,
        timestamp: Date.now()
    });

    // ========================================
    // ROOT APP CONTAINER
    // ========================================

    const root = document.body;

    // ========================================
    // MODE SWITCH BUTTON
    // ========================================

    mountSwitchButton(root, (mode) => {

        Trace.log({
            type: EVENTS.VIEW_CHANGE,
            category: "build_mode",
            mode,
            timestamp: Date.now()
        });

        console.log("Switched mode:", mode);

    });

    // ========================================
    // DEVTOOLS PANEL
    // ========================================

    mountDevTools(root);

    // ========================================
    // BUILD DASHBOARD
    // ========================================

    mountBuildDashboard(root, {

        bundleSize: 0,

        traceCount: Trace.get().length,

        health: "OK"

    });

    // ========================================
    // MOBILE VIEWER
    // ========================================

    mountMobileViewer(root);

});

// ========================================
// PWA INSTALL PROMPT
// ========================================

let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {

    e.preventDefault();

    deferredPrompt = e;

    Trace.log({
        type: EVENTS.PANEL_OPEN,
        category: "pwa_install_prompt",
        timestamp: Date.now()
    });

    // Prevent duplicate install buttons
    if (document.getElementById("install-btn")) {
        return;
    }

    const btn = document.createElement("button");

    btn.id = "install-btn";

    btn.innerText = "Install Observatory";

    // ========================================
    // BASIC STYLING
    // ========================================

    btn.style.position = "fixed";
    btn.style.bottom = "20px";
    btn.style.right = "20px";
    btn.style.zIndex = "9999";

    btn.style.padding = "12px";
    btn.style.borderRadius = "10px";

    btn.style.border = "1px solid #444";

    btn.style.background = "#1f1f1f";
    btn.style.color = "#ffffff";

    btn.style.cursor = "pointer";

    // ========================================
    // INSTALL CLICK
    // ========================================

    btn.onclick = async () => {

        if (!deferredPrompt) {
            return;
        }

        deferredPrompt.prompt();

        const result = await deferredPrompt.userChoice;

        Trace.log({
            type: EVENTS.PANEL_OPEN,
            category: "pwa_install_result",
            outcome: result.outcome,
            timestamp: Date.now()
        });

        deferredPrompt = null;

        btn.remove();
    };

    document.body.appendChild(btn);

});

// ========================================
// WINDOW READY TRACE
// ========================================

window.addEventListener("load", () => {

    Trace.log({
        type: EVENTS.SYSTEM_READY,
        category: "window_load",
        message: "Window fully loaded",
        timestamp: Date.now()
    });

});

// ========================================
// VISIBILITY TRACKING
// ========================================

document.addEventListener("visibilitychange", () => {

    Trace.log({
        type: EVENTS.VIEW_CHANGE,
        category: "visibility",
        hidden: document.hidden,
        timestamp: Date.now()
    });

});