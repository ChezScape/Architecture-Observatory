export function mountMobileViewer(root) {

    const mobilePanel = document.createElement("div");

    mobilePanel.innerHTML = `
        <h3>Mobile Viewer</h3>
    `;

    root.appendChild(mobilePanel);
}