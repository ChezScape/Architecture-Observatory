// ========================================
// RUNTIME DASHBOARD
// ========================================

import { RuntimeStore }
    from "../runtime/runtimeStore.js";

export function mountDashboard(root) {

    const panel =
        document.createElement("div");

    panel.className = "panel";

    panel.innerHTML = `
        <h2>System Dashboard</h2>

        <div id="dashboard-stats"></div>
    `;

    root.appendChild(panel);

    const stats =
        panel.querySelector("#dashboard-stats");

    function render() {

        const traces =
            RuntimeStore.getTraces();

        const perf =
            RuntimeStore.getPerformance();

        stats.innerHTML = `
            <div>
                📊 Traces:
                ${traces.length}
            </div>

            <div>
                ⚡ FPS:
                ${perf.fps || 0}
            </div>

            <div>
                🧠 Memory:
                ${perf.memory || 0} MB
            </div>

            <div>
                📦 Snapshots:
                ${RuntimeStore
                    .getSnapshots()
                    .length}
            </div>
        `;
    }

    render();

    setInterval(render, 1000);
}