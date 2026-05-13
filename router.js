export function initRouter() {

    const root =
        document.getElementById("app-root");

    if (!root) {
        console.error("NO ROOT FOUND");
        return;
    }

    // NEVER TOUCH document.body

    root.innerHTML = `
        <div style="color:white;padding:20px;">
            <h1>LANDING VIEW LOADED ✔</h1>
        </div>
    `;
}