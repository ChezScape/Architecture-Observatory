// ========================================
// ARCHITECTURE SELF MODEL
// ========================================
//
// PURPOSE:
// Builds an internal representation of how
// the system believes it is structured.
//
// ========================================

import { RuntimeStore } from "../runtime/runtimeStore.js";

import { CausalGraphEngine } from "./causalGraphEngine.js";

export const ArchitectureSelfModel = {

    build() {

        const traces = RuntimeStore.getTraces();

        const graph = CausalGraphEngine.build();

        const model = {

            layers: {
                instrumentation: 0,
                runtime: 0,
                analysis: 0,
                output: 0
            },

            coupling: graph.edges.length / (graph.nodes.length || 1),

            eventDistribution: {}
        };

        // ------------------------------------
        // CLASSIFY EVENTS INTO LAYERS
        // ------------------------------------

        traces.forEach(event => {

            const type = event.type;

            model.eventDistribution[type] =
                (model.eventDistribution[type] || 0) + 1;

            if (type.includes("DOM") || type.includes("UI")) {
                model.layers.output++;
            }

            else if (type.includes("TRACE") || type.includes("STATE")) {
                model.layers.runtime++;
            }

            else if (type.includes("ERROR") || type.includes("ANALYSIS")) {
                model.layers.analysis++;
            }

            else {
                model.layers.instrumentation++;
            }
        });

        return model;
    }
};