// ========================================
// LIVE SYSTEM STATUS BADGE
// ========================================

import { RuntimeStore } from "../runtime/runtimeStore.js";
import { PredictiveFailureEngine } from "../analysis/predictiveFailureEngine.js";

export function mountStatusBadge(root) {

    const el = document.createElement("div");

    el.style.position = "fixed";
    el.style.bottom = "12px";
    el.style.right = "12px";
    el.style.zIndex = "9999";

    el.style.padding = "10px 12px";
    el.style.borderRadius = "12px";
    el.style.border = "1px solid rgba(94, 234, 212, 0.4)";
    el.style.background = "rgba(0,0,0,0.65)";
    el.style.color = "#d7e1ff";
    el.style.fontSize = "12px";
    el.style.fontFamily = "monospace";
    el.style.backdropFilter = "blur(8px)";

    function update() {

        const traces = RuntimeStore.getTraces();
        const risk = PredictiveFailureEngine.analyse()?.riskLevel || "UNKNOWN";

        let status = "STABLE";

        if (risk === "HIGH") status = "DEGRADED";
        else if (traces.length > 1200) status = "HEAVY LOAD";
        else if (risk === "MEDIUM") status = "UNSTABLE";

        el.innerHTML = `
🧠 System: ${status}
📊 Traces: ${traces.length}
⚠️ Risk: ${risk}
        `;
    }

    update();
    setInterval(update, 1000);

    root.appendChild(el);
}
