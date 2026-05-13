export function mountDevTools(root) {

    const panel = document.createElement("div");

    panel.className = "devtools-panel";

    panel.innerHTML = `
        <h3>DevTools Panel</h3>
    `;

    root.appendChild(panel);
}