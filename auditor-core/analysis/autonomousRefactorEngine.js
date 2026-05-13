// ========================================
// AUTONOMOUS REFACTOR ENGINE
// ========================================
//
// PURPOSE:
// Detects structural inefficiencies and
// proposes refactor strategies (NO AUTO-WRITE).
//
// ========================================

import { RuntimeStore } from "../runtime/runtimeStore.js";

import { CausalGraphEngine } from "./causalGraphEngine.js";

export const AutonomousRefactorEngine = {

    analyse() {

        const traces = RuntimeStore.getTraces();

        const graph = CausalGraphEngine.build();

        const suggestions = [];

        // ------------------------------------
        // HIGH COUPLING DETECTION
        // ------------------------------------

        const heavyNodes = graph.nodes.filter(n => n.count > 20);

        if (heavyNodes.length > 0) {

            suggestions.push({
                type: "REFACTOR_SUGGESTION",
                title: "High coupling detected in event flow",
                issue: "Some event types are overused and centralised",
                recommendation:
                    "Split event responsibilities into smaller domains"
            });
        }

        // ------------------------------------
        // EVENT CHAOS DETECTION
        // ------------------------------------

        if (graph.edges.length / (graph.nodes.length || 1) > 5) {

            suggestions.push({
                type: "REFACTOR_SUGGESTION",
                title: "Event graph is overly dense",
                issue: "Too many causal connections per node",
                recommendation:
                    "Introduce buffering layer or batching system"
            });
        }

        // ------------------------------------
        // TRACE GROWTH WARNING
        // ------------------------------------

        if (traces.length > 2000) {

            suggestions.push({
                type: "REFACTOR_SUGGESTION",
                title: "Trace volume is high",
                issue: "Runtime store growing too fast",
                recommendation:
                    "Introduce trace compression or sampling strategy"
            });
        }

        return suggestions;
    }
};