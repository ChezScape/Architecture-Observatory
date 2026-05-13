// ========================================
// BOOT DIAGNOSTIC LAYER
// Prevents silent failure / black screens
// ========================================

export const BootDiagnostics = {

    logs: [],

    errors: [],

    startTime: performance.now(),

    init() {

        // GLOBAL ERROR CATCH
        window.onerror = (msg, src, line, col, err) => {

            this.errors.push({
                msg,
                src,
                line,
                col,
                stack: err?.stack
            });

            this.renderOverlay();
        };

        window.onunhandledrejection = (event) => {

            this.errors.push({
                msg: "Unhandled Promise Rejection",
                reason: event.reason
            });

            this.renderOverlay();
        };

        this.log("BOOT_DIAGNOSTICS_ACTIVE");
    },

    log(message) {

        this.logs.push({
            time: performance.now() - this.startTime,
            message
        });

        console.log("[BOOT]", message);
    },

    renderOverlay() {

        let el =
            document.getElementById("boot-overlay");

        if (!el) {

            el = document.createElement("div");
            el.id = "boot-overlay";

            el.innerHTML = `
                <div class="boot-container">
                    <div class="boot-title">
                        🧠 Observatory Boot Diagnostics
                    </div>

                    <div class="boot-subtitle">
                        System failure detected or boot incomplete
                    </div>

                    <div id="boot-content"
                        style="margin-top:20px; text-align:left;">
                    </div>
                </div>
            `;

            document.body.appendChild(el);
        }

        const content =
            el.querySelector("#boot-content");

        content.innerHTML = `
            <div style="margin-bottom:10px;">
                <strong>Logs:</strong>
            </div>

            ${this.logs.map(l =>
                `<div>🟢 ${l.message}</div>`
            ).join("")}

            <br/>

            <div style="margin-bottom:10px;">
                <strong>Errors:</strong>
            </div>

            ${this.errors.map(e =>
                `<div style="color:#ff5c7a;">
                    🔴 ${e.msg || e.reason}
                </div>`
            ).join("")}
        `;
    }
};