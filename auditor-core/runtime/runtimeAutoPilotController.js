// ========================================
// RUNTIME AUTOPILOT CONTROLLER
// ========================================
//
// PURPOSE:
// Dynamically tunes runtime subsystems
// based on health, pressure, and risk signals.
// SAFE MODE ONLY (no direct destructive actions)
//
// ========================================

import { RuntimeStore } from "./runtimeStore.js";

import { SystemPressureEngine } from "../analysis/systemPressureEngine.js";

import { SelfHealingEngine } from "../analysis/selfHealingEngine.js";

import { PredictiveFailureEngine } from "../analysis/predictiveFailureEngine.js";

import { Trace } from "./tracer.js";

import { EVENTS } from "./eventTypes.js";

let enabled = false;

export const RuntimeAutopilotController = {

    start(interval = 3000) {

        if (enabled) return;

        enabled = true;

        setInterval(() => {

            const pressure = SystemPressureEngine.analyze();

            const healing = SelfHealingEngine.analyse();

            const prediction = PredictiveFailureEngine.analyse();

            const mode = this._decideMode(pressure, healing, prediction);

            RuntimeStore.updatePerformance({
                autopilotMode: mode
            });

            Trace.log({
                type: EVENTS.SYSTEM_READY,
                category: "autopilot",
                message: `Autopilot mode: ${mode}`,
                internal: true
            });

        }, interval);
    },

    stop() {
        enabled = false;
    },

    _decideMode(pressure, healing, prediction) {

        if (
            pressure.pressure === "HIGH" ||
            prediction.riskLevel === "HIGH" ||
            healing.status === "UNSTABLE"
        ) {
            return "SAFE_MODE";
        }

        if (pressure.pressure === "MEDIUM") {
            return "THROTTLED_MODE";
        }

        return "NORMAL_MODE";
    }
};