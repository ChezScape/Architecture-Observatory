// ========================================
// INTERACTIVE DEBUG NARRATIVE ENGINE
// ========================================
//
// PURPOSE:
// Converts runtime behaviour into a
// story-like explanation of system execution.
//
// ========================================

import { RuntimeStore } from "../runtime/runtimeStore.js";

import { CausalGraphEngine } from "../analysis/causalGraphEngine.js";

import { InsightAIEngine } from "../analysis/insightAIEngine.js";

export function mountInteractiveDebugNarrativeEngine(root) {

    const container = document.createElement("div");

    container.style.padding = "12px";

    container.style.border = "1px solid #333";

    container.innerHTML = `
        <h3>Debug Narrative Engine</h3>
        <div id="story"></div>
    `;

    const story = container.querySelector("#story");

    function render() {

        const traces = RuntimeStore.getTraces();

        const graph = CausalGraphEngine.build();

        const insights = InsightAIEngine.analyse();

        const last = traces[traces.length - 1];

        const narrative = [];

        // ------------------------------------
        // BUILD STORY FLOW
        // ------------------------------------

        if (last) {

            narrative.push(
                `The system observed a ${last.type} event.`
            );
        }

        if (graph.edges.length > 0) {

            narrative.push(
                `This event is connected to ${graph.edges.length} causal relationships.`
            );
        }

        if (insights.length > 0) {

            narrative.push(
                `An insight was generated: ${insights[0].summary || insights[0].type}.`
            );
        }

        narrative.push(
            `The system is currently processing ${traces.length} total events.`
        );

        story.innerHTML = `
            <div style="font-size: 12px; line-height: 1.5;">
                ${narrative.map(n => `<div>• ${n}</div>`).join("")}
            </div>
        `;
    }

    setInterval(render, 1000);

    render();

    root.appendChild(container);
}