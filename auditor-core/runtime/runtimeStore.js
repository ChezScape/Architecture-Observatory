// ========================================
// RUNTIME STORE
// ========================================
//
// PURPOSE
// Centralized runtime truth system.
//
// Separates:
//
// - live runtime events
// - persistent traces
// - snapshots
// - runtime state
// - graph state
//
// This prevents Trace from becoming
// overloaded with too many responsibilities.
//
// ========================================

import { Trace } from "./tracer.js";

import { EVENTS } from "./eventTypes.js";

import { Bus } from "./bus.js";

// ========================================
// INTERNAL STORES
// ========================================

const runtimeState = {

    // ------------------------------------
    // LIVE EVENT STREAM
    // ------------------------------------

    liveEvents: [],

    // ------------------------------------
    // PERSISTENT TRACE HISTORY
    // ------------------------------------

    traces: [],

    // ------------------------------------
    // SNAPSHOT STORAGE
    // ------------------------------------

    snapshots: [],

    // ------------------------------------
    // GRAPH STATE
    // ------------------------------------

    graph: {

        nodes: [],
        edges: []
    },

    // ------------------------------------
    // PERFORMANCE STATE
    // ------------------------------------

    performance: {

        fps: 0,

        memory: 0,

        cpu: 0
    },

    // ------------------------------------
    // SYSTEM HEALTH
    // ------------------------------------

    health: {

        status: "OK",

        warnings: [],

        errors: []
    }
};

// ========================================
// RUNTIME STORE API
// ========================================

export const RuntimeStore = {

    // ====================================
    // LIVE EVENTS
    // ====================================

    pushEvent(event) {

        runtimeState.liveEvents.push(event);

        // Keep live stream lightweight
        if (runtimeState.liveEvents.length > 250) {

            runtimeState.liveEvents.shift();
        }

        Bus.emit({
            type: EVENTS.RUNTIME_UPDATE,
            category: "live_event",
            payload: event
        });
    },

    getLiveEvents() {

        return runtimeState.liveEvents;
    },

    clearLiveEvents() {

        runtimeState.liveEvents.length = 0;
    },

    // ====================================
    // TRACE STORAGE
    // ====================================

    pushTrace(trace) {

        runtimeState.traces.push(trace);

        Bus.emit({
            type: EVENTS.TRACE_UPDATE,
            category: "trace_store"
        });
    },

    getTraces() {

        return runtimeState.traces;
    },

    clearTraces() {

        runtimeState.traces.length = 0;
    },

    // ====================================
    // SNAPSHOTS
    // ====================================

    saveSnapshot(snapshot) {

        runtimeState.snapshots.push(snapshot);

        Trace.log({
            type: EVENTS.SNAPSHOT_CREATE,
            category: "runtime_store"
        });
    },

    getSnapshots() {

        return runtimeState.snapshots;
    },

    clearSnapshots() {

        runtimeState.snapshots.length = 0;
    },

    // ====================================
    // GRAPH STATE
    // ====================================

    setGraph(graph) {

        runtimeState.graph = graph;

        Bus.emit({
            type: EVENTS.GRAPH_UPDATE,
            category: "graph_state"
        });
    },

    getGraph() {

        return runtimeState.graph;
    },

    // ====================================
    // PERFORMANCE STATE
    // ====================================

    updatePerformance(data = {}) {

        runtimeState.performance = {

            ...runtimeState.performance,

            ...data
        };

        Bus.emit({
            type: EVENTS.PERFORMANCE_UPDATE,
            category: "performance_state"
        });
    },

    getPerformance() {

        return runtimeState.performance;
    },

    // ====================================
    // HEALTH STATE
    // ====================================

    setHealthStatus(status = "OK") {

        runtimeState.health.status = status;

        Bus.emit({
            type: EVENTS.HEALTH_UPDATE,
            category: "health_state",
            status
        });
    },

    addWarning(warning) {

        runtimeState.health.warnings.push({

            timestamp: Date.now(),

            warning
        });

        Trace.log({
            type: EVENTS.WARNING,
            category: "runtime_health",
            message: warning
        });
    },

    addError(error) {

        runtimeState.health.errors.push({

            timestamp: Date.now(),

            error
        });

        Trace.log({
            type: EVENTS.ERROR,
            category: "runtime_health",
            message: error
        });
    },

    getHealth() {

        return runtimeState.health;
    },

    // ====================================
    // FULL STATE
    // ====================================

    export() {

        return structuredClone(runtimeState);
    },

    import(data) {

        if (!data) {
            return;
        }

        Object.assign(runtimeState, data);

        Trace.log({
            type: EVENTS.RUNTIME_UPDATE,
            category: "runtime_import",
            message: "Runtime state imported"
        });
    },

    reset() {

        runtimeState.liveEvents.length = 0;

        runtimeState.traces.length = 0;

        runtimeState.snapshots.length = 0;

        runtimeState.graph = {
            nodes: [],
            edges: []
        };

        runtimeState.performance = {
            fps: 0,
            memory: 0,
            cpu: 0
        };

        runtimeState.health = {
            status: "OK",
            warnings: [],
            errors: []
        };

        Trace.log({
            type: EVENTS.SYSTEM_RESET,
            category: "runtime_store",
            message: "Runtime store reset"
        });
    }
};

// ========================================
// BUS SYNCHRONIZATION
// ========================================
//
// Automatically mirror runtime events
// into the live event stream.
//
// ========================================

Bus.on("*", (event) => {

    RuntimeStore.pushEvent(event);

});

// ========================================
// TRACE SYNCHRONIZATION
// ========================================

Bus.on(EVENTS.TRACE_UPDATE, (event) => {

    RuntimeStore.pushTrace(event);

});

// ========================================
// INITIALIZATION TRACE
// ========================================

Trace.log({
    type: EVENTS.SYSTEM_READY,
    category: "runtime_store",
    message: "Runtime store initialized"
});