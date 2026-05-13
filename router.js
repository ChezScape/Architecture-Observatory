import { mountLandingView } from "./viewer/landingView.js";
import { mountRuntimeView } from "./viewer/runtimeView.js";
import { mountSandboxView } from "./viewer/sandbox.js";

export function initRouter() {

    const root =
        document.getElementById("app-root");

    root.innerHTML = `
        <div id="view-container"></div>
    `;

    navigate("landing");
}

export function navigate(route) {

    const container =
        document.getElementById("view-container");

    if (!container) return;

    if (route === "landing") {
        mountLandingView(container);
    }

    if (route === "runtime") {
        mountRuntimeView(container);
    }

    if (route === "sandbox") {
        mountSandboxView(container);
    }
}