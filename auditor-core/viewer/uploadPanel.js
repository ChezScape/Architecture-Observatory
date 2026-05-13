// ========================================
// UPLOAD PANEL
// ========================================

import { PortableLoader }
    from "../pipeline/portableLoader.js";

import { PortableSandbox }
    from "../runtime/portableSandbox.js";

import { PortableAnalysisBridge }
    from "../analysis/portableAnalysisBridge.js";

import { mountUploadPanel }
from "./viewer/uploadPanel.js";

export function mountRuntimeView(root) {

    root.innerHTML = "";

    const container =
        document.createElement("div");

    container.style.padding = "20px";

    root.appendChild(container);

    mountUploadPanel(container);
}

export function mountUploadPanel(root) {

    const panel =
        document.createElement("div");

    panel.className = "panel";

    panel.innerHTML = `
        <h2>Portable HTML Analysis</h2>

        <p>
            Load a portable HTML file into
            the Observatory runtime.
        </p>

        <input
            type="file"
            id="portable-input"
            accept=".html,.htm"
        />

        <div id="portable-report"></div>

        <div id="portable-runtime"></div>
    `;

    root.appendChild(panel);

    const input =
        panel.querySelector("#portable-input");

    const reportEl =
        panel.querySelector("#portable-report");

    const runtimeEl =
        panel.querySelector("#portable-runtime");

    input.addEventListener(
        "change",
        async (e) => {

            const file =
                e.target.files[0];

            if (!file) return;

            reportEl.innerHTML =
                "<p>Loading...</p>";

            try {

                // ------------------------
                // LOAD FILE
                // ------------------------

                const loaded =
                    await PortableLoader.load(file);

                // ------------------------
                // ANALYSE
                // ------------------------

                const analysis =
                    PortableAnalysisBridge
                        .analyse(loaded.html);

                // ------------------------
                // REPORT
                // ------------------------

                reportEl.innerHTML = `
                    <div class="card">

                        <div class="card-title">
                            File
                        </div>

                        <div class="card-value">
                            ${loaded.name}
                        </div>

                        <br/>

                        <div>
                            📏 Size:
                            ${loaded.size} bytes
                        </div>

                        <div>
                            📜 Scripts:
                            ${analysis.scripts}
                        </div>

                        <div>
                            🎨 Styles:
                            ${analysis.styles}
                        </div>

                        <div>
                            🔘 Buttons:
                            ${analysis.buttons}
                        </div>

                        <div>
                            📦 Divs:
                            ${analysis.divs}
                        </div>

                        <div>
                            ⚠️ Inline Events:
                            ${analysis.possibleInlineEvents}
                        </div>

                        <br/>

                        <div>
                            <strong>Risks:</strong>
                        </div>

                        <ul>
                            ${
                                analysis.possibleRisks
                                    .map(r =>
                                        `<li>${r}</li>`
                                    )
                                    .join("")
                            }
                        </ul>

                    </div>
                `;

                // ------------------------
                // SANDBOX
                // ------------------------

                runtimeEl.innerHTML = "";

                const iframe =
                    PortableSandbox
                        .create(runtimeEl);

                PortableSandbox.inject(
                    iframe,
                    loaded.html
                );

            } catch (err) {

                console.error(err);

                reportEl.innerHTML = `
                    <div class="card">
                        Failed to load file.
                    </div>
                `;
            }
        }
    );
}