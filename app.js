// ========================================
// SYSTEM BOOT ORCHESTRATOR
// ========================================

import { CONFIG } from "./auditor-core/config/config.js";

import { RuntimeStore } from "./auditor-core/runtime/runtimeStore.js";
import { Trace } from "./auditor-core/runtime/tracer.js";
import { EVENTS } from "./auditor-core/runtime/eventTypes.js";

// CORE SYSTEMS
import { RuntimeAutonomousReasoningOS } from "./auditor-core/runtime/runtimeAutonomousReasoningOS.js";
import { RuntimeAutopilotController } from "./auditor-core/runtime/runtimeAutopilotController.js";
import { RuntimeConsciousnessLoop } from "./auditor-core/runtime/runtimeConsciousnessLoop.js";

// ANALYSIS
import { InsightAIEngine } from "./auditor-core/analysis/insightAIEngine.js";
import { PredictiveFailureEngine } from "./auditor-core/analysis/predictiveFailureEngine.js";

// UI
import { mountDevTools } from "./auditor-core/viewer/devtoolsPanel.js";
import { mountSwitchButton } from "./auditor-core/viewer/switchButton.js";
import { mountBuildDashboard } from "./auditor-core/viewer/buildDashboard.js";
import { mountMobileViewer } from "./auditor-core/viewer/mobileViewer.js";
import { mountFullAutonomousDebugAgent } from "./auditor-core/viewer/fullAutonomousDebugAgent.js";

// START BOOT TRACE
Trace.log({
    type: EVENTS.SYSTEM_BOOT,
    message: `${CONFIG.APP_NAME} booting in ${CONFIG.MODE} mode`
});

// ========================================
// 1. INITIALISE CORE STORE
// ========================================

RuntimeStore.init?.();

// ========================================
// 2. START CORE REASONING LAYERS
// (ORDER MATTERS — THIS FIXES YOUR ISSUE)
// ========================================

if (CONFIG.FEATURES.runtimeReasoningOS) {
    RuntimeAutonomousReasoningOS.start(CONFIG.PERFORMANCE.reasoningInterval);
}

if (CONFIG.FEATURES.autopilotController) {
    RuntimeAutopilotController.start(CONFIG.PERFORMANCE.autopilotInterval);
}

if (CONFIG.FEATURES.metaReasoningKernel) {
    RuntimeConsciousnessLoop.start(CONFIG.PERFORMANCE.consciousnessInterval);
}

// ========================================
// 3. OPTIONAL PRE-WARM ANALYSIS
// ========================================

InsightAIEngine.analyse();
PredictiveFailureEngine.analyse();

// ========================================
// 4. REGISTER PWA (SAFE)
// ========================================

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./pwa/service-worker.js");
}

// ========================================
// 5. UI BOOT (LAST STEP ONLY)
// ========================================

const root = document.body;

// MODE SWITCH
mountSwitchButton(root, (mode) => {
    CONFIG.MODE = mode;
    console.log("System mode switched to:", mode);
});

// CORE DASHBOARD
mountDevTools(root);

mountBuildDashboard(root, {
    bundleSize: 0,
    traceCount: 0,
    health: "INITIALISING"
});

// MOBILE VIEW
if (CONFIG.UI.mountMobileViewer) {
    mountMobileViewer(root);
}

// FULL DEBUG AGENT
if (CONFIG.UI.mountDebugPanel) {
    mountFullAutonomousDebugAgent(root);
}

// BOOT COMPLETE TRACE
Trace.log({
    type: EVENTS.SYSTEM_READY,
    message: `${CONFIG.APP_NAME} fully initialised`,
    mode: CONFIG.MODE
});