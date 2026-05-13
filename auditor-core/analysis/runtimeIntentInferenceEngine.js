// ========================================
// RUNTIME INTENT INFERENCE ENGINE
// ========================================
//
// PURPOSE:
// Infers probable user/system intent behind
// runtime event patterns.
//
// ========================================

import { RuntimeStore } from "../runtime/runtimeStore.js";

export const RuntimeIntentInferenceEngine = {

    infer() {

        const traces = RuntimeStore.getTraces();

        const intents = [];

        let recentClicks = 0;
        let recentErrors = 0;
        let recentStateChanges = 0;

        const window = traces.slice(-50);

        window.forEach(event => {

            if (event.type === "CLICK") recentClicks++;

            if (event.type === "ERROR") recentErrors++;

            if (event.type === "STATE_CHANGE") recentStateChanges++;
        });

        // ------------------------------------
        // INTENT: USER EXPLORATION
        // ------------------------------------

        if (recentClicks > 10 && recentErrors === 0) {

            intents.push({
                type: "EXPLORATION",
                confidence: 0.7,
                explanation: "User is actively interacting without system failure signals"
            });
        }

        // ------------------------------------
        // INTENT: SYSTEM DEBUGGING
        // ------------------------------------

        if (recentErrors > 3) {

            intents.push({
                type: "DEBUGGING",
                confidence: 0.8,
                explanation: "Error patterns suggest debugging or unstable runtime state"
            });
        }

        // ------------------------------------
        // INTENT: STATE MANIPULATION HEAVY FLOW
        // ------------------------------------

        if (recentStateChanges > 10) {

            intents.push({
                type: "STATE_HEAVY_WORKFLOW",
                confidence: 0.75,
                explanation: "Frequent state changes indicate workflow processing"
            });
        }

        return intents;
    }
};