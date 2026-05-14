export function mountSandboxView(root) {

    root.innerHTML = `
        <div class="hud-bar">
            <div>Sandbox Environment</div>
            <div class="status warning">ISOLATED</div>
        </div>

        <div class="panel">

            <h2>Input Console</h2>

            <textarea id="input" rows="10" style="width:100%;"></textarea>

            <button id="run" style="margin-top:12px;">
                Execute
            </button>

            <h3 style="margin-top:20px;">Output</h3>

            <pre id="output" style="
                background: rgba(0,0,0,0.3);
                padding: 12px;
                border-radius: 10px;
                min-height: 100px;
            "></pre>

        </div>
    `;

    const input =
        root.querySelector("#input");

    const output =
        root.querySelector("#output");

    root.querySelector("#run")
        .addEventListener("click", () => {

            const value =
                input.value.trim();

            if (!value) {

                output.textContent =
                    "No input provided";

                return;
            }

            output.textContent =
                "EXECUTED:\n\n" + value;
        });
}