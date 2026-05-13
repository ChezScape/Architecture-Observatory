import { Trace } from "./tracer.js";

import { EVENTS } from "./eventTypes.js";

export function installDOMInterceptor() {

    const observer = new MutationObserver((mutations) => {

        mutations.forEach((mutation) => {

            Trace.log({
                type: EVENTS.DOM_MUTATION,
                category: mutation.type,
                target: mutation.target?.nodeName
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
    });
}