export function mountDashboard(root) {

    const panel = document.createElement("div");

    panel.innerHTML = `
        <h2>Architecture Observatory</h2>
    `;

    root.appendChild(panel);
}