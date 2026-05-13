// ========================================
// CAUSAL GRAPH ENGINE
// ========================================
//
// PURPOSE:
// Builds a directional cause → effect graph
// from runtime trace data.
//
// ========================================

import { RuntimeStore } from "../runtime/runtimeStore.js";

export const CausalGraphEngine = {

    build() {

        const traces = RuntimeStore.getTraces();

        const nodes = new Map();

        const edges = [];

        let previous = null;

        traces.forEach((event) => {

            const id = this._getId(event);

            // Register node
            if (!nodes.has(id)) {

                nodes.set(id, {
                    id,
                    type: event.type,
                    category: event.category || "unknown",
                    count: 1
                });

            } else {

                nodes.get(id).count++;
            }

            // Create causal link
            if (previous) {

                edges.push({
                    from: this._getId(previous),
                    to: id,
                    delta: event.timestamp - previous.timestamp
                });
            }

            previous = event;
        });

        return {
            nodes: Array.from(nodes.values()),
            edges
        };
    },

    _getId(event) {

        return `${event.type}:${event.category || "none"}`;
    }
};