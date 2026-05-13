// ========================================
// CONTINUOUS SYSTEM SIMULATION UNIVERSE
// ========================================
//
// PURPOSE:
// Runs isolated simulations of system behaviour
// to model possible execution futures.
//
// ========================================

import { RuntimeStore } from "../runtime/runtimeStore.js";

import { CausalGraphEngine } from "./causalGraphEngine.js";

import { PredictiveFailureEngine } from "./predictiveFailureEngine.js";

import { InsightAIEngine } from "./insightAIEngine.js";

export const ContinuousSystemSimulationUniverse = {

    run(simulations = 3) {

        const base = RuntimeStore.export();

        const results = [];

        for (let i = 0; i < simulations; i++) {

            const traces = RuntimeStore.getTraces();

            const graph = CausalGraphEngine.build();

            const prediction = PredictiveFailureEngine.analyse();

            const insights = InsightAIEngine.analyse();

            results.push({

                universe: i + 1,

                traceCount: traces.length,

                graphNodes: graph.nodes.length,

                graphEdges: graph.edges.length,

                predictedRisk: prediction.riskLevel,

                insightDensity: insights.length,

                stabilityIndex:
                    100 -
                    (prediction.riskScore + graph.edges.length / 10)
            });
        }

        RuntimeStore.import(base);

        return {
            universesSimulated: simulations,
            results
        };
    }
};