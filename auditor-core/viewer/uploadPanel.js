// ========================================
// UPLOAD PANEL
// ========================================

import { PortableLoader }
from "../pipeline/portableLoader.js";

import { PortableSandbox }
from "../runtime/portableSandbox.js";

import { PortableAnalysisBridge }
from "../analysis/portableAnalysisBridge.js";

export function mountUploadPanel(root) {

    const panel =
        document.createElement("div");

    panel.className = "panel";

    panel.innerHTML = `
        <h2>
            Portable HTML Analysis
        </h2>

        <p>
            Load a portable HTML file.
        </p>

        <input
            type="file"
            id="portable-file"
            accept=".html,.htm"
        >

        <div id="analysis-output"
            style="margin-top:20px;">
        </div>

        <div id="sandbox-output"
            style="margin-top:20px;">
        </div>
    `;

    root.appendChild(panel);

    const input =
        panel.querySelector("#portable-file");

    const analysisOutput =
        panel.querySelector("#analysis-output");

    const sandboxOutput =
        panel.querySelector("#sandbox-output");

    // ====================================
    // FILE LOAD
    // ====================================

    input.addEventListener(
        "change",
        async (event) => {

            const file =
                event.target.files[0];

            if (!file) return;

            try {

                // ------------------------
                // LOAD FILE
                // ------------------------

                const loaded =
                    await PortableLoader
                        .load(file);

                // ------------------------
                // ANALYSE
                // ------------------------

                const report =
                    PortableAnalysisBridge
                        .analyse(loaded.html);

                // ------------------------
                // OUTPUT
                // ------------------------

                analysisOutput.innerHTML = `
                    <div class="card">

                        <h3>
                            Analysis Report
                        </h3>

                        <div>
                            📄 File:
                            ${loaded.name}
                        </div>

                        <div>
                            📏 Size:
                            ${loaded.size}
                        </div>

                        <div>
                            📜 Scripts:
                            ${report.scripts}
                        </div>

                        <div>
                            🎨 Styles:
                            ${report.styles}
                        </div>

                        <div>
                            📦 Divs:
                            ${report.divs}
                        </div>

                        <div>
                            ⚠️ Inline Events:
                            ${report.inlineEvents}
                        </div>

                        <div>
                            🧠 Architecture Score:
                            ${report.architectureScore}
                        </div>

                        <br>

                        <strong>
                            Risks
                        </strong>

                        <ul>
                            ${
                                report.possibleRisks
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

                sandboxOutput.innerHTML = "";

                const iframe =
                    PortableSandbox
                        .create(
                            sandboxOutput
                        );

                PortableSandbox.inject(
                    iframe,
                    loaded.html
                );

            } catch (err) {

                console.error(err);

                analysisOutput.innerHTML = `
                    <div class="card">
                        Failed to load file.
                    </div>
                `;
            }
        }
    );
}