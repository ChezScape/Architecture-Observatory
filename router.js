export function navigate(route) {

    console.log(
        "ROUTE:",
        route
    );

    const root =
        document.getElementById(
            "app-root"
        );

    if (!root) {

        console.error(
            "ROOT NOT FOUND"
        );

        return;
    }

    root.innerHTML = `
        <div style="
            color:white;
            padding:40px;
            font-family:sans-serif;
        ">
            <h1>
                Architecture Observatory
            </h1>

            <p>
                Router working successfully.
            </p>

            <p>
                Current route:
                ${route}
            </p>
        </div>
    `;
}