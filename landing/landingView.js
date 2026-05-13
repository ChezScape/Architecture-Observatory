import { navigate } from "../router.js";

export function mountLandingView(root) {

    root.innerHTML = `
        <div class="hero">

            <div class="title">
                Architecture Observatory
            </div>

            <div class="subtitle">
                Runtime intelligence platform for observing,
                simulating, and explaining system behaviour.
            </div>

            <div style="margin-top:20px; display:flex; gap:10px;">

                <button id="enter-runtime">
                    Enter Runtime
                </button>

                <button id="open-sandbox">
                    Open Sandbox
                </button>

            </div>
        </div>
    `;

    root.querySelector("#enter-runtime")
        .onclick = () => navigate("runtime");

    root.querySelector("#open-sandbox")
        .onclick = () => navigate("sandbox");
}