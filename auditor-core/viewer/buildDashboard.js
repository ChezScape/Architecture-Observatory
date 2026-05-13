// ========================================
// BUILD DASHBOARD
// ========================================

import { RuntimeStore }
from "../runtime/runtimeStore.js";

export function mountBuildDashboard(root) {

    const panel =
        document.createElement("div");

    panel.className = "panel";

    panel.innerHTML = `
        <h2>
            Runtime Dashboard
        </h2>

        <div id="dashboard-content">

            Loading runtime...

        </div>
    `;

    root.appendChild(panel);

    const content =
        panel.querySelector(
            "#dashboard-content"
        );

    // ====================================
    // RENDER LOOP
    // ====================================

    function render() {

        const traces =
            RuntimeStore.getTraces();

        const performance =
            RuntimeStore
                .getPerformance();

        const snapshots =
            RuntimeStore
                .getSnapshots();

        content.innerHTML = `
            <div>
                📊 Traces:
                ${traces.length}
            </div>

            <div>
                ⚡ FPS:
                ${performance.fps || 0}
            </div>

            <div>
                🧠 Memory:
                ${performance.memory || 0} MB
            </div>

            <div>
                📸 Snapshots:
                ${snapshots.length}
            </div>

            <div>
                🟢 Runtime Stable
            </div>
        `;
    }

    render();

    setInterval(render, 1000);
}