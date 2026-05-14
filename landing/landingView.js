export function mountLandingView(
    root
) {

    root.innerHTML = `
        <section class="hero">

            <h1 class="title">
                Architecture Observatory
            </h1>

            <p class="subtitle">
                Runtime intelligence,
                architectural tracing,
                portable sandbox analysis,
                and live system diagnostics.
            </p>

            <div
                style="
                    margin-top:30px;
                    display:flex;
                    gap:12px;
                    flex-wrap:wrap;
                    justify-content:center;
                "
            >

                <button
                    onclick="
                        location.hash='runtime'
                    "
                >
                    Open Runtime
                </button>

                <button
                    onclick="
                        location.hash='sandbox'
                    "
                >
                    Open Sandbox
                </button>

            </div>

        </section>
    `;
}