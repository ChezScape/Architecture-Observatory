// ========================================
// FULL AUTONOMOUS DEBUG AGENT (SAFE MODE)
// ========================================
//
// PURPOSE:
// High-level interface that combines all
// engines into a single debug assistant UI.
//
// NOTE:
// This is NOT autonomous execution — only
// a diagnostic assistant interface.
//
// ========================================

import { RuntimeStore } from "../runtime/runtimeStore.js";

import { InsightAIEngine } from "../analysis/insightAIEngine.js";

import { PredictiveFailureEngine } from "../analysis/predictiveFailureEngine.js";

import { SelfHealingEngine } from "../analysis/selfHealingEngine.js";

import { RuntimeIntentInferenceEngine } from "../analysis/runtimeIntentInferenceEngine.js";

import { RuntimeMetaReasoningKernel } from "../runtime/runtimeMetaReasoningKernel.js";

export function mountFullAutonomousDebugAgent(root) {

    const container = document.createElement("div");

    container.style.padding = "12px";

    container.style.border = "1px solid #444";

    container.innerHTML = `
        <h3>Autonomous Debug Agent (SAFE MODE)</h3>
        <div id="agent"></div>
    `;

    const panel = container.querySelector("#agent");

    function render() {

        const traces = RuntimeStore.getTraces();

        const insights = InsightAIEngine.analyse();

        const predictions = PredictiveFailureEngine.analyse();

        const healing = SelfHealingEngine.analyse();

        const intents = RuntimeIntentInferenceEngine.infer();

        const meta = RuntimeMetaReasoningKernel.evaluate();

        panel.innerHTML = `
            <div>Traces: ${traces.length}</div>
            <div>Insights: ${insights.length}</div>
            <div>Risk: ${predictions.riskLevel}</div>
            <div>Health: ${healing.status}</div>
            <div>Intent: ${intents[0]?.type || "UNKNOWN"}</div>
            <div>Meta Score: ${meta.systemSelfAwarenessScore}</div>

            <hr />

            <div style="font-size:12px">
                ${insights[0]?.summary || "No dominant insight"}
            </div>
        `;
    }

    setInterval(render, 1000);

    render();

    root.appendChild(container);
}