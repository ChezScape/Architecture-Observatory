// ========================================
// SYSTEM CONFIG
// ========================================
//
// Central control plane for all runtime behaviour
//
// ========================================

export const CONFIG = {

    APP_NAME: "Architecture Observatory",

    VERSION: "V4-REBOOT",

    MODE: "DEV", // DEV | PORTABLE | SIMULATION | SAFE_RUNTIME

    FEATURES: {

        runtimeReasoningOS: true,
        metaReasoningKernel: true,
        predictiveFailureEngine: true,
        selfHealingEngine: true,

        simulationUniverse: true,
        autopilotController: true,

        narrativeEngine: true,
        debugAgent: true
    },

    PERFORMANCE: {

        reasoningInterval: 4000,
        autopilotInterval: 3000,
        consciousnessInterval: 5000,
        simulationThrottle: 1
    },

    SAFETY: {

        allowSelfModification: false,
        allowAutoPatchExecution: false,
        allowStateMutationFromAI: false
    },

    UI: {

        mountDebugPanel: true,
        mountNarrativeEngine: true,
        mountMobileViewer: true,
        mountSimulationDashboard: true
    }
};