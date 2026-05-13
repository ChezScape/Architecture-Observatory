// ========================================
// SAFE RUNTIME VIEW
// ========================================

export function mountRuntimeView(root) {

    root.innerHTML = `
        <div style="
            padding:40px;
            color:white;
            font-family:sans-serif;
        ">

            <h1>
                🧠 Runtime Observatory
            </h1>

            <p>
                Runtime loaded successfully.
            </p>

            <div style="
                margin-top:20px;
                padding:20px;
                border:1px solid rgba(255,255,255,0.2);
                border-radius:12px;
                background:rgba(255,255,255,0.03);
            ">

                Portable Runtime Ready

            </div>

        </div>
    `;
}