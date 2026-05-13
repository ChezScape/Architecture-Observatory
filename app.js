// ========================================
// ARCHITECTURE OBSERVATORY
// APPLICATION ROOT
// ========================================

import { initRouter } from "./router.js";

import { Trace } from "./auditor-core/runtime/tracer.js";
import { EVENTS } from "./auditor-core/runtime/eventTypes.js";

import { RuntimeStore }
    from "./auditor-core/runtime/runtimeStore.js";

import { RuntimeAutonomousReasoningOS }
    from "./auditor-core/runtime/runtimeAutonomousReasoningOS.js";

import { RuntimeConsciousnessLoop }
    from "./auditor-core/runtime/runtimeConsciousnessLoop.js";

import { RuntimeAutopilotController }
    from "./auditor-core/runtime/runtimeAutopilotController.js";

// ========================================
// SYSTEM BOOT
// ========================================

Trace.log({
    type: EVENTS.SYSTEM_BOOT,
    message: "Architecture Observatory booting"
});

// ========================================
// INITIALISE RUNTIME STORE
// ========================================

RuntimeStore.init?.();

// ========================================
// START CORE SYSTEMS
// ========================================

try {

    RuntimeAutonomousReasoningOS.start?.(4000);

} catch (err) {

    console.warn(
        "[ReasoningOS]",
        err
    );
}

try {

    RuntimeConsciousnessLoop.start?.(5000);

} catch (err) {

    console.warn(
        "[ConsciousnessLoop]",
        err
    );
}

try {

    RuntimeAutopilotController.start?.(3000);

} catch (err) {

    console.warn(
        "[AutopilotController]",
        err
    );
}

// ========================================
// REGISTER SERVICE WORKER (PWA)
// ========================================

if ("serviceWorker" in navigator) {

    navigator.serviceWorker
        .register("./auditor-core/pwa/service-worker.js")
        .catch(console.error);
}

// ========================================
// INITIALISE ROUTER
// ========================================

initRouter();

// ========================================
// INSTALL PROMPT
// ========================================

let deferredPrompt = null;

window.addEventListener(
    "beforeinstallprompt",
    (e) => {

        e.preventDefault();

        deferredPrompt = e;

        const btn =
            document.createElement("button");

        btn.innerText = "Install Observatory";

        btn.className = "install-btn";

        btn.onclick = async () => {

            if (!deferredPrompt) return;

            deferredPrompt.prompt();

            await deferredPrompt.userChoice;

            deferredPrompt = null;

            btn.remove();
        };

        document.body.appendChild(btn);
    }
);

// ========================================
// READY
// ========================================

Trace.log({
    type: EVENTS.SYSTEM_READY,
    message: "Architecture Observatory ready"
});