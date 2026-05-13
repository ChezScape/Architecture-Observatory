// ========================================
// RUNTIME STORE
// ========================================

import { CONFIG }
    from "../config/config.js";

export const RuntimeStore = {

    traces: [],

    snapshots: [],

    performance: {

        fps: 0,

        memory: 0
    },

    engines: {},

    state: {

        mode: "runtime",

        booted: false
    },

    init() {

        this.state.booted = true;

        console.log(
            "[RuntimeStore] Initialised"
        );
    },

    // ====================================
    // TRACE STORAGE
    // ====================================

    pushTrace(trace) {

        this.traces.push(trace);

        if (
            this.traces.length >
            CONFIG.TRACE_LIMIT
        ) {

            this.traces.shift();
        }
    },

    getTraces() {

        return this.traces;
    },

    clearTraces() {

        this.traces = [];
    },

    // ====================================
    // SNAPSHOTS
    // ====================================

    saveSnapshot(snapshot) {

        this.snapshots.push({

            timestamp: Date.now(),

            snapshot
        });

        if (
            this.snapshots.length >
            CONFIG.SNAPSHOT_LIMIT
        ) {

            this.snapshots.shift();
        }
    },

    getSnapshots() {

        return this.snapshots;
    },

    // ====================================
    // PERFORMANCE
    // ====================================

    updatePerformance(metrics = {}) {

        this.performance = {

            ...this.performance,

            ...metrics
        };
    },

    getPerformance() {

        return this.performance;
    },

    // ====================================
    // ENGINE STATE
    // ====================================

    setEngineState(name, state) {

        this.engines[name] = state;
    },

    getEngineState(name) {

        return this.engines[name];
    }
};