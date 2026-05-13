// ========================================
// RUNTIME CONSCIOUSNESS LOOP
// ========================================
//
// PURPOSE:
// Continuously synthesises system state into
// a unified "awareness snapshot".
//
// (This is NOT real consciousness — it's a
// structured diagnostic aggregation loop.)
//
// ========================================

import { RuntimeStore } from "./runtimeStore.js";

import { InsightAIEngine } from "../analysis/insightAIEngine.js";

import { PredictiveFailureEngine } from "../analysis/predictiveFailureEngine.js";

import { CausalGraphEngine } from "../analysis/causalGraphEngine.js";

import { SelfHealingEngine } from "../analysis/selfHealingEngine.js";

import { Trace } from "./tracer.js";

import { EVENTS } from "./eventTypes.js";

let running = false;

export const RuntimeConsciousnessLoop = {

    start(interval = 5000) {

        if (running) return;

        running = true;

        setInterval(() => {

            const state = RuntimeStore.export();

            const insights = InsightAIEngine.analyse();

            const prediction = PredictiveFailureEngine.analyse();

            const graph = CausalGraphEngine.build();

            const healing = SelfHealingEngine.analyse();

            const consciousness = {

                timestamp: Date.now(),

                totalEvents: state.traces.length,

                graphComplexity: graph.edges.length,

                insightDensity: insights.length,

                riskLevel: prediction.riskLevel,

                health: healing.status
            };

            RuntimeStore.updatePerformance({
                consciousnessScore:
                    insights.length +
                    graph.edges.length
            });

            Trace.log({
                type: EVENTS.SYSTEM_READY,
                category: "consciousness_loop",
                message: "System awareness snapshot updated",
                internal: true,
                consciousness
            });

        }, interval);
    },

    stop() {
        running = false;
    }
};