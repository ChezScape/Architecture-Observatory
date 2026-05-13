// ========================================
// PORTABLE SANDBOX
// ========================================

export class PortableSandbox {

    static create(root) {

        const iframe =
            document.createElement("iframe");

        iframe.style.width = "100%";
        iframe.style.height = "700px";
        iframe.style.border =
            "1px solid rgba(255,255,255,0.1)";
        iframe.style.borderRadius = "12px";
        iframe.style.background = "#05060a";

        iframe.setAttribute(
            "sandbox",
            "allow-scripts allow-same-origin"
        );

        root.appendChild(iframe);

        return iframe;
    }

    static inject(iframe, html) {

        iframe.srcdoc = html;
    }
}