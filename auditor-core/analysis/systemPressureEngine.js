// ========================================
// SYSTEM PRESSURE ENGINE
// ========================================

import { RuntimeStore } from "../runtime/runtimeStore.js";

export const SystemPressureEngine = {

    analyze() {

        const traces = RuntimeStore.getTraces();

        const eventsPerSecond = {};

        traces.forEach((event) => {

            const sec = Math.floor(event.timestamp / 1000);

            eventsPerSecond[sec] =
                (eventsPerSecond[sec] || 0) + 1;
        });

        const spikes = Object.entries(eventsPerSecond)
            .filter(([, count]) => count > 50)
            .map(([time, count]) => ({
                time: Number(time),
                count
            }));

        const total = traces.length;

        const pressure = total > 1000 ? "HIGH"
            : total > 300 ? "MEDIUM"
            : "LOW";

        return {
            totalEvents: total,
            pressure,
            spikes
        };
    }
};