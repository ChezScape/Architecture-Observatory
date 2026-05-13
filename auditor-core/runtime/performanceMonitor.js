// ========================================
// PERFORMANCE MONITOR
// ========================================

import { RuntimeStore } from "./runtimeStore.js";
import { Trace } from "./tracer.js";

import { EVENTS } from "./eventTypes.js";

import { SETTINGS } from "../config/settings.js";

let fps = 0;

let lastFrameTime = performance.now();

let frameCount = 0;

let memoryInterval = null;

export const PerformanceMonitor = {

    start() {

        if (!SETTINGS.PERFORMANCE_MONITORING) {
            return;
        }

        monitorFPS();

        monitorMemory();

        Trace.log({
            type: EVENTS.SYSTEM_READY,
            category: "performance_monitor",
            message: "Performance monitor active"
        });
    },

    getFPS() {
        return fps;
    }
};

// ========================================
// FPS MONITORING
// ========================================

function monitorFPS() {

    function frame(now) {

        frameCount++;

        if (now >= lastFrameTime + 1000) {

            fps = frameCount;

            if (fps < 30) {

                Trace.log({
                    type: EVENTS.FPS_DROP,
                    fps
                });
            }

            frameCount = 0;

            lastFrameTime = now;
        }

        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

// ========================================
// MEMORY MONITORING
// ========================================

function monitorMemory() {

    if (!performance.memory) {
        return;
    }

    memoryInterval = setInterval(() => {

        const memory = performance.memory;

        const usedMB =
            memory.usedJSHeapSize / 1024 / 1024;

        RuntimeStore.updatePerformance({
    fps,
    memory: usedMB
});

if (usedMB > 150) {

    Trace.log({
        type: EVENTS.MEMORY_WARNING,
        usedMB: usedMB.toFixed(2)
    });
}

    }, 5000);
}