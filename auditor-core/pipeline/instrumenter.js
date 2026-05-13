// ========================================
// PIPELINE INSTRUMENTOR
// ========================================

import { Bus } from "../runtime/bus.js";
import { Trace } from "../runtime/tracer.js";

export const Instrumentor = {

    active: false,

    init() {

        this.active = true;

        Trace.log({
            type: "INSTRUMENTOR_INIT",
            source: "Instrumentor"
        });
    },

    instrumentHTML(html) {

        if (!this.active) return html;

        // Lightweight instrumentation injection
        const probe = `
            <script>
                window.__OBSERVATORY_ACTIVE__ = true;

                window.addEventListener("error", (e) => {
                    console.error("[OBSERVATORY ERROR]", e.message);
                });
            </script>
        `;

        Bus.emit("instrumentation:html", { html });

        return probe + html;
    }
};