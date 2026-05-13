// ========================================
// FULL SYSTEM SIMULATION MODE
// ========================================
//
// PURPOSE:
// Replays entire runtime in isolated mode
// without affecting live system state.
//
// ========================================

import { RuntimeStore } from "./runtimeStore.js";

import { Trace } from "./tracer.js";

import { EventCorrelator } from "../runtime/eventCorrelator.js";

import { CausalGraphEngine } from "../analysis/causalGraphEngine.js";

import { InsightAIEngine } from "../analysis/insightAIEngine.js";

export const FullSystemSimulationMode = {

    run() {

        const snapshot = RuntimeStore.export();

        const traces = RuntimeStore.getTraces();

        const correlation = EventCorrelator.buildChains();

        const graph = CausalGraphEngine.build();

        const insights = InsightAIEngine.analyse();

        const simulation = {

            traceCount: traces.length,

            chains: correlation.length,

            nodes: graph.nodes.length,

            edges: graph.edges.length,

            insights: insights.length,

            risk: this._calculateRisk(traces)
        };

        Trace.log({
            type: "SIMULATION_RUN",
            category: "simulation_mode",
            message: "Full system simulation executed",
            internal: true
        });

        // IMPORTANT: restore state immediately
        RuntimeStore.import(snapshot);

        return simulation;
    },

    _calculateRisk(traces) {

        let risk = 0;

        traces.forEach(t => {

            if (t.type === "ERROR") risk += 3;

            if (t.type === "DOM_MUTATION") risk += 1;

            if (t.type === "STATE_CHANGE") risk += 1;
        });

        return risk > 50 ? "HIGH"
            : risk > 20 ? "MEDIUM"
            : "LOW";
    }
};