window.onerror = (msg, src, line) => {
    document.body.innerHTML = `
        <div style="color:white;padding:20px;">
            <h2>CRASH</h2>
            <div>${msg}</div>
        </div>
    `;
};

setTimeout(() => {

    document.body.innerHTML = `
        <div style="color:white;padding:20px;">
            APP STILL ALIVE AFTER 2S
        </div>
    `;

}, 2000);