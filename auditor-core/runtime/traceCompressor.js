// ========================================
// TRACE COMPRESSOR
// ========================================

import { Trace } from "./tracer.js";

export const TraceCompressor = {

    compress() {

        const traces = Trace.get();

        const compressed = [];

        let previous = null;

        traces.forEach((event) => {

            // Merge repeated sequential events
            if (
                previous &&
                previous.type === event.type
            ) {

                previous.count =
                    (previous.count || 1) + 1;

                previous.lastTimestamp =
                    event.timestamp;

                return;
            }

            previous = {
                ...event,
                count: 1
            };

            compressed.push(previous);
        });

        return compressed;
    }
};