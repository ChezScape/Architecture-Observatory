import { navigate } from "./router.js";

console.log("APP STARTED");

window.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "DOM LOADED"
        );

        const root =
            document.getElementById(
                "app-root"
            );

        console.log(
            "ROOT:",
            root
        );

        if (!root) {

            document.body.innerHTML = `
                <div style="
                    color:white;
                    background:black;
                    padding:20px;
                    font-family:sans-serif;
                ">
                    APP ROOT MISSING
                </div>
            `;

            return;
        }

        navigate("landing");
    }
);