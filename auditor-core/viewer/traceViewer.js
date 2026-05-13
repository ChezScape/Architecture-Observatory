import { Trace } from "../runtime/tracer.js";

export function mountTraceViewer(root) {

    const container = document.createElement("pre");

    container.innerText = JSON.stringify(
        Trace.get(),
        null,
        2
    );

    root.appendChild(container);
}