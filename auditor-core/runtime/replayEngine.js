// ========================================
// REPLAY ENGINE
// ========================================

import { RuntimeStore } from "./runtimeStore.js";

import { Trace } from "./tracer.js";

import { EVENTS } from "./eventTypes.js";

let replayIndex = 0;

let replaying = false;

let interval = null;

export const ReplayEngine = {

    start(speed = 1) {

        if (replaying) return;

        const traces = RuntimeStore.getTraces();

        replaying = true;

        replayIndex = 0;

        Trace.log({
            type: EVENTS.SYSTEM_READY,
            category: "replay_engine",
            message: "Replay started",
            internal: true
        });

        interval = setInterval(() => {

            if (replayIndex >= traces.length) {

                this.stop();
                return;
            }

            const event = traces[replayIndex];

            RuntimeStore.pushEvent({
                ...event,
                replay: true
            });

            replayIndex++;

        }, 1000 / speed);
    },

    stop() {

        replaying = false;

        clearInterval(interval);

        Trace.log({
            type: EVENTS.SYSTEM_READY,
            category: "replay_engine",
            message: "Replay stopped",
            internal: true
        });
    },

    reset() {

        replayIndex = 0;
    }
};