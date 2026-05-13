// ========================================
// AUTO PATCH SUGGESTION ENGINE
// ========================================
//
// PURPOSE:
// Suggests fixes based on detected runtime issues.
// DOES NOT mutate code automatically.
//
// ========================================

import { SelfHealingEngine } from "./selfHealingEngine.js";

import { PredictiveFailureEngine } from "./predictiveFailureEngine.js";

export const AutoPatchSuggestionEngine = {

    suggest() {

        const healing = SelfHealingEngine.analyse();

        const prediction = PredictiveFailureEngine.analyse();

        const suggestions = [];

        // ------------------------------------
        // HEALING-BASED SUGGESTIONS
        // ------------------------------------

        healing.issues.forEach(issue => {

            if (issue.action === "INCREASE_SAFE_EXECUTION") {

                suggestions.push({
                    type: "PATCH_SUGGESTION",
                    title: "Add error boundary wrapper",
                    code:
`try {
    runApp();
} catch (e) {
    handleError(e);
}`
                });
            }

            if (issue.action === "ENABLE_SCHEDULER_THROTTLE") {

                suggestions.push({
                    type: "PATCH_SUGGESTION",
                    title: "Throttle rendering pipeline",
                    code:
`Scheduler.enqueue(() => {
    renderFrame();
});`
                });
            }
        });

        // ------------------------------------
        // PREDICTION-BASED SUGGESTIONS
        // ------------------------------------

        if (prediction.riskLevel === "HIGH") {

            suggestions.push({
                type: "PATCH_SUGGESTION",
                title: "Prevent rapid interaction overload",
                code:
`let locked = false;

function safeClick(fn) {
    if (locked) return;
    locked = true;
    fn();
    setTimeout(() => locked = false, 200);
}`
            });
        }

        return {
            suggestions,
            riskLevel: prediction.riskLevel
        };
    }
};