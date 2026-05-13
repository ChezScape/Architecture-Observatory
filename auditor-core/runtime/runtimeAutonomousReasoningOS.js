// ========================================
// RUNTIME AUTONOMOUS REASONING OS
// ========================================
//
// PURPOSE:
// Acts as a central orchestration layer that
// coordinates all analysis, prediction, and
// simulation engines into a unified cycle.
//
// NOTE:
// This is NOT an operating system. It is a
// reasoning coordinator.
//
// ========================================

import { RuntimeStore } from "./runtimeStore.js";

import { InsightAIEngine } from "../analysis/insightAIEngine.js";

import { PredictiveFailureEngine } from "../analysis/predictiveFailureEngine.js";

import { SelfHealingEngine } from "../analysis/selfHealingEngine.js";

import { RuntimeMetaReasoningKernel } from "./runtimeMetaReasoningKernel.js";

import { RuntimeIntentInferenceEngine } from "../analysis/runtimeIntentInferenceEngine.js";

import { Trace } from "./tracer.js";

import { EVENTS } from "./eventTypes.js";

let running = false;

export const RuntimeAutonomousReasoningOS = {

    start(interval = 4000) {

        if (running) return;

        running = true;

        setInterval(() => {

            const traces = RuntimeStore.getTraces();

            const insights = InsightAIEngine.analyse();

            const predictions = PredictiveFailureEngine.analyse();

            const healing = SelfHealingEngine.analyse();

            const intents = RuntimeIntentInferenceEngine.infer();

            const meta = RuntimeMetaReasoningKernel.evaluate();

            const systemState = {

                traces: traces.length,
                insights: insights.length,
                risk: predictions.riskLevel,
                health: healing.status,
                intent: intents[0]?.type || "UNKNOWN",
                metaScore: meta.systemSelfAwarenessScore
            };

            RuntimeStore.updatePerformance({
                osLoadIndex:
                    systemState.traces +
                    systemState.insights +
                    meta.systemSelfAwarenessScore
            });

            Trace.log({
                type: EVENTS.SYSTEM_READY,
                category: "autonomous_os",
                message: "Reasoning cycle complete",
                internal: true,
                systemState
            });

        }, interval);
    },

    stop() {
        running = false;
    }
};