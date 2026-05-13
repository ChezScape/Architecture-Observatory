import { Trace } from "./tracer.js";

import { EVENTS } from "./eventTypes.js";

const state = {};

export function setState(key, value) {

    state[key] = value;

    Trace.log({
        type: EVENTS.STATE_CHANGE,
        key,
        value
    });
}

export function getState(key) {
    return state[key];
}

export function installStateTracker() {

    Trace.log({
        type: EVENTS.SYSTEM_READY,
        category: "state_tracker",
        message: "State tracker installed"
    });
}