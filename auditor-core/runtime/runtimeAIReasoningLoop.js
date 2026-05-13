// ========================================
// RUNTIME AI REASONING LOOP
// ========================================
//
// PURPOSE:
// Continuously analyses runtime state,
// correlates signals, and produces insights.
//
// ========================================

import { RuntimeStore } from "./runtimeStore.js";

import { InsightAIEngine } from "../analysis/insightAIEngine.js";

import { PredictiveFailureEngine } from "../analysis/predictiveFailureEngine.js";

import { SelfHealingEngine } from "../analysis/selfHealingEngine.js";

import { AutoPatchSuggestionEngine } from "../analysis/autoPatchSuggestionEngine.js";

import { CausalGraphEngine } from "../analysis/causalGraphEngine.js";

let running = false;

export const RuntimeAIReasoningLoop = {

    start(interval = 2000) {

        if (running) return;

        running = true;

        setInterval(() => {

            const traces = RuntimeStore.getTraces();

            const insights = InsightAIEngine.analyse();

            const predictions = PredictiveFailureEngine.analyse();

            const healing = SelfHealingEngine.analyse();

            const patches = AutoPatchSuggestionEngine.suggest();

            const graph = CausalGraphEngine.build();

            RuntimeStore.updatePerformance({
                intelligenceScore:
                    insights.length +
                    graph.edges.length
            });

            // lightweight system summarisation signal
            RuntimeStore.pushEvent({
                type: "AI_REASONING_TICK",
                category: "ai_loop",
                insights: insights.length,
                risk: predictions.riskLevel,
                issues: healing.issues.length,
                patches: patches.suggestions.length,
                timestamp: Date.now()
            });

        }, interval);
    },

    stop() {
        running = false;
    }
};