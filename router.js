export function initRouter() {

    console.log("ROUTER EXECUTING ✔");

    const root =
        document.getElementById("app-root");

    console.log("ROOT =", root);

    if (!root) return;

    // HARD VISUAL OVERRIDE
    document.body.style.background = "#000";

    root.style.position = "relative";
    root.style.zIndex = "9999";

    root.innerHTML = `
        <div style="
            color:white;
            padding:40px;
            font-size:24px;
        ">
            🚀 ROUTER SUCCESSFULLY RENDERED INTO ROOT
        </div>
    `;
}