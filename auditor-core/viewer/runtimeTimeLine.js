// ========================================
// RUNTIME TIMELINE VIEWER
// ========================================

import { RuntimeStore } from "../runtime/runtimeStore.js";

export function mountRuntimeTimeline(root) {

    const container = document.createElement("div");

    container.style.padding = "12px";

    container.style.border = "1px solid #333";

    container.innerHTML = `
        <h3>Runtime Timeline</h3>
        <div id="timeline"></div>
    `;

    const timeline = container.querySelector("#timeline");

    const traces = RuntimeStore.getTraces();

    traces.slice(-50).forEach((event) => {

        const item = document.createElement("div");

        item.style.margin = "4px 0";

        item.style.fontSize = "12px";

        item.textContent =
            `${event.type} @ ${event.timestamp}`;

        timeline.appendChild(item);
    });

    root.appendChild(container);
}