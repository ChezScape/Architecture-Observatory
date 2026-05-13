// ========================================
// ARCHITECTURE OBSERVATORY
// GLOBAL SETTINGS
// ========================================

export const SETTINGS = {

    // =========================
    // SYSTEM
    // =========================
    APP_NAME: "Architecture Observatory",
    VERSION: "V5",

    // =========================
    // TRACE
    // =========================
    TRACE_LIMIT: 5000,
    TRACE_ENABLED: true,
    TRACE_STACKS: true,

    // =========================
    // PERFORMANCE
    // =========================
    PERFORMANCE_MONITORING: true,
    FPS_MONITORING: true,
    MEMORY_MONITORING: true,

    // =========================
    // ANALYSIS
    // =========================
    ENABLE_ANOMALY_DETECTION: true,
    ENABLE_ROOT_CAUSE_ENGINE: true,
    ENABLE_COUPLING_ANALYSIS: true,
    ENABLE_HEATMAP_ANALYSIS: true,

    // =========================
    // VIEWER
    // =========================
    MOBILE_MODE: false,
    DEVTOOLS_ENABLED: true,
    LIVE_GRAPH_ENABLED: true,
    AUTO_SCROLL_TRACE: true,

    // =========================
    // BUILD
    // =========================
    BUILD_MODE: "dev",
    PORTABLE_MODE: false,

    // =========================
    // STORAGE
    // =========================
    ENABLE_PERSISTENCE: true,
    MAX_SNAPSHOTS: 25,

    // =========================
    // PWA
    // =========================
    PWA_ENABLED: true,
    OFFLINE_MODE: true,

    // =========================
    // DEBUG
    // =========================
    DEBUG: true,
    VERBOSE_LOGGING: true
};

export function updateSetting(key, value) {

    if (!(key in SETTINGS)) {

        console.warn(`Unknown setting: ${key}`);
        return;
    }

    SETTINGS[key] = value;

    console.log(`[SETTINGS] ${key} updated →`, value);
}

export function getSetting(key) {

    return SETTINGS[key];
}