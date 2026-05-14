// ======================================
// Architecture Observatory - ENTRY
// ======================================

import { navigate } from "./router.js";

window.addEventListener(
    "DOMContentLoaded",
    () => {

        const root =
            document.getElementById(
                "app-root"
            );

        if (!root) {

            console.error(
                "APP ROOT NOT FOUND"
            );

            return;
        }

        navigate("landing");
    }
);

console.log("APP START");

initRouter();