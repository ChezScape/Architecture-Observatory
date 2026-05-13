import { navigate } from "../router.js";

export function mountSandboxView(root) {

    root.innerHTML = `
        <div style="padding:20px">

            <h2>Sandbox</h2>

            <p>Inject runtime simulation events</p>

            <textarea id="sandbox-input"
                style="
                    width:100%;
                    height:200px;
                    background:#0b1430;
                    color:white;
                    border:1px solid #333;
                    padding:10px;
                "
            >
{ "type": "CLICK", "value": "test_event" }
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