import { Trace } from "./tracer.js";

import { EVENTS } from "./eventTypes.js";

const trackedEvents = [
    "click",
    "input",
    "change",
    "keydown",
    "scroll"
];

export function installEventInterceptor() {

    trackedEvents.forEach((eventName) => {

        window.addEventListener(eventName, (event) => {

            Trace.log({
                type: eventName.toUpperCase(),
                category: "ui_event",
                target: event.target?.tagName
            });
        }, true);
    });
}