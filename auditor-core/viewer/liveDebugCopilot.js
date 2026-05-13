// ========================================
// LIVE DEBUG COPILOT
// ========================================
//
// PURPOSE:
// Human-readable runtime assistant that
// explains what the system is doing.
//
// ========================================

import { RuntimeStore } from "../runtime/runtimeStore.js";

import { CausalGraphEngine } from "../analysis/causalGraphEngine.js";

import { InsightAIEngine } from "../analysis/insightAIEngine.js";

import { SelfHealingEngine } from "../analysis/selfHealingEngine.js";

export function mountLiveDebugCopilot(root) {

    const container = document.createElement("div");

    container.style.padding = "12px";

    container.style.border = "1px solid #333";

    container.style.marginTop = "12px";

    container.innerHTML = `
        <h3>Live Debug Copilot</h3>
        <div id="copilot-output">Analysing runtime...</div>
    `;

    const output = container.querySelector("#copilot-output");

    function update() {

        const traces = RuntimeStore.getTraces();

        const insights = InsightAIEngine.analyse();

        const graph = CausalGraphEngine.build();

        const health = SelfHealingEngine.analyse();

        output.innerHTML = `
            <div><b>Traces:</b> ${traces.length}</div>
            <div><b>Nodes:</b> ${graph.nodes.length}</div>
            <div><b>Insights:</b> ${insights.length}</div>
            <div><b>Status:</b> ${health.status}</div>
            <div><b>Issues:</b> ${health.issues.length}</div>
        `;
    }

    setInterval(update, 1000);

    update();

    root.appendChild(container);
}