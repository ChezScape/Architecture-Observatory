// ========================================
// LIVE ARCHITECTURE EVOLUTION ENGINE
// ========================================
//
// PURPOSE:
// Detects architectural inefficiencies and
// suggests system-level evolution changes.
//
// ========================================

import { RuntimeStore } from "../runtime/runtimeStore.js";

import { CausalGraphEngine } from "./causalGraphEngine.js";

import { ArchitectureDiffEngine } from "./architectureDiffEngine.js";

export const LiveArchitectureEvolutionEngine = {

    evolve() {

        const traces = RuntimeStore.getTraces();

        const graph = CausalGraphEngine.build();

        const diff = ArchitectureDiffEngine.analyse([
            "CLICK",
            "STATE_CHANGE",
            "DOM_MUTATION",
            "ERROR",
            "TRACE_UPDATE"
        ]);

        const evolution = [];

        // ------------------------------------
        // EVENT SYSTEM OVERLOAD
        // ------------------------------------

        if (graph.edges.length > 200) {

            evolution.push({
                type: "ARCH_EVOLUTION",
                suggestion:
                    "Introduce event batching layer to reduce graph complexity"
            });
        }

        // ------------------------------------
        // TRACE GROWTH EVOLUTION
        // ------------------------------------

        if (traces.length > 3000) {

            evolution.push({
                type: "ARCH_EVOLUTION",
                suggestion:
                    "Introduce hierarchical trace storage (hot vs cold)"
            });
        }

        // ------------------------------------
        // ARCHITECTURE DRIFT
        // ------------------------------------

        if (diff.status === "DRIFTING") {

            evolution.push({
                type: "ARCH_EVOLUTION",
                suggestion:
                    "Refactor event system to match expected architecture model"
            });
        }

        return {
            status: diff.status,
            evolution
        };
    }
};