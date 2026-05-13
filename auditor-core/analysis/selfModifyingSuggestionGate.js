// ========================================
// SELF-MODIFYING SUGGESTION GATE
// ========================================
//
// PURPOSE:
// Evaluates whether system suggestions
// are safe to apply or must remain advisory.
//
// NOTE:
// This NEVER modifies code. It only gates it.
//
// ========================================

import { AutoPatchSuggestionEngine } from "./autoPatchSuggestionEngine.js";

import { PredictiveFailureEngine } from "./predictiveFailureEngine.js";

export const SelfModifyingSuggestionGate = {

    evaluate() {

        const patches = AutoPatchSuggestionEngine.suggest();

        const prediction = PredictiveFailureEngine.analyse();

        const allowed = [];

        const blocked = [];

        patches.suggestions.forEach(patch => {

            const safe =
                prediction.riskLevel !== "HIGH" &&
                patch.type === "PATCH_SUGGESTION";

            if (safe) {

                allowed.push({
                    ...patch,
                    approved: true
                });

            } else {

                blocked.push({
                    ...patch,
                    approved: false,
                    reason: "Risk level too high or unsafe condition detected"
                });
            }
        });

        return {
            allowed,
            blocked,
            mode:
                prediction.riskLevel === "HIGH"
                    ? "LOCKED"
                    : "ADVISORY"
        };
    }
};