// ========================================
// GLOBAL EVENT BUS
// ========================================

const listeners = new Map();

const wildcardListeners = new Set();

export const Bus = {

    // ====================================
    // EMIT EVENT
    // ====================================

    emit(event = {}) {

        if (!event.type) {
            return;
        }

        // --------------------------------
        // Exact listeners
        // --------------------------------

        const handlers = listeners.get(event.type);

        if (handlers) {

            handlers.forEach((handler) => {

                try {
                    handler(event);
                }
                catch (err) {
                    console.error(
                        "Bus handler failed",
                        err
                    );
                }

            });
        }

        // --------------------------------
        // Wildcard listeners
        // --------------------------------

        wildcardListeners.forEach((handler) => {

            try {
                handler(event);
            }
            catch (err) {
                console.error(
                    "Wildcard handler failed",
                    err
                );
            }

        });
    },

    // ====================================
    // ADD LISTENER
    // ====================================

    on(type, callback) {

        // Wildcard support
        if (type === "*") {

            wildcardListeners.add(callback);

            return;
        }

        if (!listeners.has(type)) {

            listeners.set(type, new Set());
        }

        listeners
            .get(type)
            .add(callback);
    },

    // ====================================
    // REMOVE LISTENER
    // ====================================

    off(type, callback) {

        if (type === "*") {

            wildcardListeners.delete(callback);

            return;
        }

        if (!listeners.has(type)) {
            return;
        }

        listeners
            .get(type)
            .delete(callback);
    },

    // ====================================
    // DEBUG
    // ====================================

    listenerCount(type) {

        if (type === "*") {
            return wildcardListeners.size;
        }

        return listeners.get(type)?.size || 0;
    }
};