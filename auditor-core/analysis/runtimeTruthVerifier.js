// ========================================
// RUNTIME TRUTH VERIFIER
// ========================================
//
// PURPOSE:
// Ensures consistency between:
// - RuntimeStore
// - Trace engine
// - Bus events
// - Derived graphs
//
// ========================================

import { RuntimeStore } from "../runtime/runtimeStore.js";

import { CausalGraphEngine } from "./causalGraphEngine.js";

export const RuntimeTruthVerifier = {

    verify() {

        const traces = RuntimeStore.getTraces();

        const graph = CausalGraphEngine.build();

        const issues = [];

        // ------------------------------------
        // TRACE ↔ GRAPH MISMATCH
        // ------------------------------------

        if (graph.nodes.length === 0 && traces.length > 0) {

            issues.push({
                type: "TRUTH_MISMATCH",
                severity: "HIGH",
                message: "Traces exist but graph is empty",
                cause: "Graph builder failure or missing ingestion"
            });
        }

        // ------------------------------------
        // ORPHAN EVENTS DETECTION
        // ------------------------------------

        const orphanEvents = traces.filter(t =>
            !graph.nodes.some(n => n.id.includes(t.type))
        );

        if (orphanEvents.length > 10) {

            issues.push({
                type: "ORPHAN_EVENTS",
                severity: "MEDIUM",
                message: "Events not represented in causal graph",
                count: orphanEvents.length
            });
        }

        // ------------------------------------
        // TIMESTAMP INCONSISTENCY
        // ------------------------------------

        for (let i = 1; i < traces.length; i++) {

            if (traces[i].timestamp < traces[i - 1].timestamp) {

                issues.push({
                    type: "TIMELINE_CORRUPTION",
                    severity: "HIGH",
                    message: "Non-monotonic timestamp detected"
                });

                break;
            }
        }

        return {
            status: issues.length ? "UNSTABLE" : "CONSISTENT",
            issues
        };
    }
};