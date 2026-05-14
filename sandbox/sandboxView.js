export function mountSandboxView(root) {

    root.innerHTML = `
        <div class="hud-bar">

            <div>
                Sandbox Environment
            </div>

            <div class="status warning">
                ISOLATED
            </div>

        </div>

        <div class="panel">

            <h2>Input Console</h2>

            <p>
                Paste architecture definitions, runtime logs,
                or experimental modules below.
            </p>

            <textarea
                rows="10"
                placeholder="Enter data..."
                style="
                    margin-top: 12px;
                    width: 100%;
                "
            ></textarea>

            <div style="margin-top: 12px;">

                <button onclick="alert('Sandbox execution placeholder')">
                    Execute
                </button>

            </div>

        </div>
    `;
}