// ========================================
// RUNTIME META REASONING KERNEL
// ========================================
//
// PURPOSE:
// System that analyses how the system is
// analysing itself (second-order reasoning).
//
// ========================================

import { InsightAIEngine } from "../analysis/insightAIEngine.js";

import { PredictiveFailureEngine } from "../analysis/predictiveFailureEngine.js";

import { RuntimeIntentInferenceEngine } from "../analysis/runtimeIntentInferenceEngine.js";

import { RuntimeStore } from "./runtimeStore.js";

export const RuntimeMetaReasoningKernel = {

    evaluate() {

        const traces = RuntimeStore.getTraces();

        const insights = InsightAIEngine.analyse();

        const predictions = PredictiveFailureEngine.analyse();

        const intents = RuntimeIntentInferenceEngine.infer();

        const meta = {

            observationDepth: 4,

            signalDensity:
                traces.length +
                insights.length +
                intents.length,

            reasoningLayers: [
                "runtime",
                "causal",
                "predictive",
                "intent"
            ],

            systemSelfAwarenessScore:
                (insights.length * 2) +
                predictions.riskScore +
                intents.length
        };

        return meta;
    }
};