// ========================================
// PORTABLE SANDBOX
// ========================================

import { Trace }
    from "./tracer.js";

export class PortableSandbox {

    static create(root) {

        const iframe =
            document.createElement("iframe");

        iframe.className =
            "portable-runtime";

        iframe.style.width = "100%";

        iframe.style.height = "700px";

        iframe.style.border =
            "1px solid rgba(255,255,255,0.1)";

        iframe.style.borderRadius = "16px";

        iframe.style.background =
            "#05060a";

        iframe.setAttribute(
            "sandbox",
            "allow-scripts allow-same-origin"
        );

        root.appendChild(iframe);

        Trace.log({
            type: "SANDBOX_CREATED",
            source: "PortableSandbox"
        });

        return iframe;
    }

    static inject(iframe, html) {

        const instrumented = `
            <script>

                window.addEventListener(
                    "error",
                    (e) => {

                        console.error(
                            "[Portable Runtime Error]",
                            e.message
                        );
                    }
                );

                console.log(
                    "[Portable Runtime]",
                    "Instrumentation Active"
                );

            </script>

            ${html}
        `;

        iframe.srcdoc = instrumented;

        Trace.log({
            type: "SANDBOX_INJECT",
            source: "PortableSandbox",
            message: "Portable HTML injected"
        });
    }
}