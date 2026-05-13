// ========================================
// SAFE RUNTIME VIEW TEST
// ========================================

import { navigate }
from "../router.js";

export function mountRuntimeView(root) {

    const container =
        document.createElement("div");

    container.style.padding = "20px";
    container.style.color = "white";

    container.innerHTML = `
        <h1>Runtime Loaded</h1>

        <p>
            Observatory runtime is working.
        </p>

        <button id="back-btn">
            Back
        </button>
    `;

    root.appendChild(container);

    container
        .querySelector("#back-btn")
        .onclick = () => {

            navigate("landing");
        };
}