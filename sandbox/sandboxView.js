import { navigate } from "../router.js";

export function mountSandboxView(container) {

    container.innerHTML = `
        <h1 style="color:white;">
            SANDBOX
        </h1>
    `;
} "type": "CLICK", "value": "test_event" }
            </textarea>

            <br/><br/>

            <button id="inject-btn">
                Inject Event
            </button>

            <button id="back-btn">
                Back
            </button>

            <pre id="sandbox-output"></pre>

        </div>
    `;

    root.querySelector("#inject-btn")
        .onclick = () => {

            const value =
                root.querySelector("#sandbox-input").value;

            try {

                const parsed = JSON.parse(value);

                root.querySelector("#sandbox-output")
                    .innerText =
                        JSON.stringify(parsed, null, 2);

                console.log("[Sandbox]", parsed);

            } catch {

                root.querySelector("#sandbox-output")
                    .innerText =
                        "Invalid JSON";
            }
        };

    root.querySelector("#back-btn")
        .onclick = () => navigate("landing");
}