console.log("APP START");

setTimeout(() => {

    const root =
        document.getElementById("app-root");

    document.body.innerHTML = `
        <div style="color:white;padding:20px;">
            ROOT CHECK AFTER 2s:<br>
            ${root}
        </div>
    `;

}, 2000);