import { mountDevTools } from "./viewer/devtoolsPanel.js";

import { mountBuildDashboard } from "./viewer/buildDashboard.js";

import { mountStatusBadge } from "./viewer/statusBadge.js";

import { mountFullAutonomousDebugAgent }
    from "./viewer/fullAutonomousDebugAgent.js";

import { navigate } from "../router.js";

export function mountRuntimeView(root) {

    const container = document.createElement("div");

    root.appendChild(container);

    mountDevTools(container);

    mountBuildDashboard(container, {
        bundleSize: 0,
        traceCount: 0,
        health: "OK"
    });

    mountFullAutonomousDebugAgent(container);

    mountStatusBadge(container);

    const btn = document.createElement("button");

    btn.innerText = "Back";

    btn.style.margin = "20px";

    btn.onclick = () => navigate("landing");

    container.appendChild(btn);
}