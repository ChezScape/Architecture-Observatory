export function navigate(route) {

    document.body.innerHTML = `
        <div style="
            background:#05060a;
            color:white;
            padding:40px;
            font-family:sans-serif;
            min-height:100vh;
        ">
            <h1>
                ROUTER WORKING
            </h1>

            <p>
                Route:
                ${route}
            </p>
        </div>
    `;
}