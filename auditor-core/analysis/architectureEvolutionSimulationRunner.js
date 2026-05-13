// ========================================
// ARCHITECTURE EVOLUTION SIMULATION RUNNER
// ========================================
//
// PURPOSE:
// Simulates future architecture states
// without applying changes to real system.
//
// ========================================

import { RuntimeStore } from "../runtime/runtimeStore.js";

import { LiveArchitectureEvolutionEngine } from "./liveArchitectureEvolutionEngine.js";

import { CausalGraphEngine } from "./causalGraphEngine.js";

export const ArchitectureEvolutionSimulationRunner = {

    simulate(steps = 3) {

        const baseState = RuntimeStore.export();

        const simulations = [];

        for (let i = 0; i < steps; i++) {

            const evolution = LiveArchitectureEvolutionEngine.evolve();

            const graph = CausalGraphEngine.build();

            const projectedLoad =
                graph.edges.length * (i + 1);

            simulations.push({

                step: i + 1,

                evolution,

                projectedLoad,

                risk:
                    projectedLoad > 500 ? "HIGH"
                    : projectedLoad > 200 ? "MEDIUM"
                    : "LOW"
            });
        }

        // restore system state immediately
        RuntimeStore.import(baseState);

        return {
            steps,
            simulations
        };
    }
};