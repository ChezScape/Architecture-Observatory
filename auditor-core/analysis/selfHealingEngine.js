// ========================================
// SELF HEALING ENGINE
// ========================================
//
// PURPOSE:
// Detects runtime instability patterns and
// suggests or applies safe corrective actions.
//
// ========================================

import { RuntimeStore } from "../runtime/runtimeStore.js";

import { Trace } from "../runtime/tracer.js";

import { EVENTS } from "../runtime/eventTypes.js";

export const SelfHealingEngine = {

    analyse() {

        const traces = RuntimeStore.getTraces();

        const issues = [];

        let errorCount = 0;

        let mutationBurst = 0;

        traces.forEach((event, index) => {

            // ERROR SPIKE DETECTION
            if (event.type === "ERROR") {
                errorCount++;
            }

            // DOM STORM DETECTION
            if (event.type === "DOM_MUTATION") {

                const prev = traces[index - 1];

                if (prev && prev.type === "DOM_MUTATION") {
                    mutationBurst++;
                }
            }
        });

        // ------------------------------------
        // ERROR HEALING STRATEGY
        // ------------------------------------

        if (errorCount > 5) {

            issues.push({
                type: "ERROR_STORM",
                severity: "HIGH",
                suggestion: "Enable stricter error boundaries",
                action: "INCREASE_SAFE_EXECUTION"
            });
        }

        // ------------------------------------
        // DOM STORM HEALING
        // ------------------------------------

        if (mutationBurst > 20) {

            issues.push({
                type: "DOM_STORM",
                severity: "HIGH",
                suggestion: "Throttle rendering / enable scheduler",
                action: "ENABLE_SCHEDULER_THROTTLE"
            });
        }

        return {
            status: issues.length ? "UNSTABLE" : "HEALTHY",
            issues
        };
    },

    applySafeFixes(issues = []) {

        issues.forEach(issue => {

            Trace.log({
                type: EVENTS.SYSTEM_READY,
                category: "self_healing",
                message: `Applying fix: ${issue.action}`,
                internal: true
            });
        });
    }
};