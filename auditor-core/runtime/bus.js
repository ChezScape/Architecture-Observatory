// ========================================
// EVENT BUS
// ========================================

import { Trace }
    from "./tracer.js";

export const Bus = {

    channels: {},

    init() {

        console.log(
            "[Bus] Online"
        );
    },

    on(event, callback) {

        if (!this.channels[event]) {

            this.channels[event] = [];
        }

        this.channels[event]
            .push(callback);

        Trace.log({
            type: "BUS_SUBSCRIBE",
            source: "Bus",
            message: `Subscribed to ${event}`
        });
    },

    emit(event, payload = {}) {

        const listeners =
            this.channels[event] || [];

        Trace.log({
            type: "BUS_EMIT",
            source: "Bus",
            message: `Event emitted: ${event}`,
            payload
        });

        for (const callback of listeners) {

            try {

                callback(payload);

            } catch (err) {

                Trace.error({
                    type: "BUS_HANDLER_FAILURE",
                    source: "Bus",
                    message: err.message
                });
            }
        }
    },

    clear(event) {

        if (event) {

            delete this.channels[event];

            return;
        }

        this.channels = {};
    }
};