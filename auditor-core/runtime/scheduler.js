// ========================================
// RENDER SCHEDULER
// ========================================

import { Trace } from "./tracer.js";

import { EVENTS } from "./eventTypes.js";

const queue = [];

let running = false;

export const Scheduler = {

    enqueue(task) {

        queue.push(task);

        if (!running) {
            processQueue();
        }
    },

    size() {
        return queue.length;
    }
};

// ========================================
// PROCESS QUEUE
// ========================================

async function processQueue() {

    running = true;

    while (queue.length > 0) {

        const task = queue.shift();

        try {

            await task();

        } catch (err) {

            Trace.log({
                type: EVENTS.ERROR,
                category: "scheduler",
                message: err.message
            });
        }

        // Yield to browser
        await nextFrame();
    }

    running = false;
}

// ========================================
// NEXT FRAME
// ========================================

function nextFrame() {

    return new Promise((resolve) => {

        requestAnimationFrame(() => {
            resolve();
        });
    });
}