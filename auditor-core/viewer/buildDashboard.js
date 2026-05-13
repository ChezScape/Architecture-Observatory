export function mountBuildDashboard(root, stats) {

    const panel = document.createElement("div");

    panel.innerHTML = `
        <h3>Build Dashboard</h3>
        <p>Bundle Size: ${stats.bundleSize}</p>
        <p>Trace Count: ${stats.traceCount}</p>
        <p>Health: ${stats.health}</p>
    `;

    root.appendChild(panel);
}