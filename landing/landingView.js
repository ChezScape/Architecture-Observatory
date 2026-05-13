import { navigate } from "../router.js";

export function mountLandingView(container) {

    container.innerHTML = `
        <h1 style="color:white;">
            LANDING
        </h1>
    `;
}
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