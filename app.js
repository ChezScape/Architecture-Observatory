window.onerror = (msg, src, line) => {
    document.body.innerHTML = `
        <div style="color:white;padding:20px;">
            <h2>CRASH DETECTED</h2>
            <div>${msg}</div>
            <div>${src}:${line}</div>
        </div>
    `;
};
document.body.innerHTML = `
    <div style="
        color:white;
        padding:40px;
        font-family:sans-serif;
    ">
        <h1>BOOT TEST</h1>
        <p>If you see this, JS is working.</p>
    </div>
`;