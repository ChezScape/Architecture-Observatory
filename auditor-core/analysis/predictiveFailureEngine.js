// ========================================
// PREDICTIVE FAILURE ENGINE
// ========================================
//
// PURPOSE:
// Detects patterns that historically lead
// to errors and predicts likely failures.
//
// ========================================

import { RuntimeStore } from "../runtime/runtimeStore.js";

export const PredictiveFailureEngine = {

    analyse() {

        const traces = RuntimeStore.getTraces();

        const patterns = {
            errorAfterDomMutation: 0,
            errorAfterStateChange: 0,
            rapidClicksBeforeError: 0
        };

        for (let i = 0; i < traces.length - 1; i++) {

            const current = traces[i];
            const next = traces[i + 1];

            // DOM → ERROR pattern
            if (
                current.type === "DOM_MUTATION" &&
                next.type === "ERROR"
            ) {
                patterns.errorAfterDomMutation++;
            }

            // STATE → ERROR pattern
            if (
                current.type === "STATE_CHANGE" &&
                next.type === "ERROR"
            ) {
                patterns.errorAfterStateChange++;
            }

            // CLICK BURST → ERROR
            if (current.type === "CLICK") {

                let burst = 0;

                for (let j = i; j < i + 5 && j < traces.length; j++) {
                    if (traces[j].type === "CLICK") burst++;
                }

                if (burst >= 4 && next?.type === "ERROR") {
                    patterns.rapidClicksBeforeError++;
                }
            }
        }

        const riskScore =
            patterns.errorAfterDomMutation * 2 +
            patterns.errorAfterStateChange * 2 +
            patterns.rapidClicksBeforeError * 3;

        return {
            patterns,
            riskScore,
            riskLevel:
                riskScore > 10 ? "HIGH"
                : riskScore > 4 ? "MEDIUM"
                : "LOW"
        };
    }
};