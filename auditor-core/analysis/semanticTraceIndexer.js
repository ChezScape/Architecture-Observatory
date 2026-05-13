// ========================================
// SEMANTIC TRACE INDEXER
// ========================================
//
// PURPOSE:
// Converts raw traces into searchable
// semantic structures.
//
// ========================================

import { RuntimeStore } from "../runtime/runtimeStore.js";

export const SemanticTraceIndexer = {

    buildIndex() {

        const traces = RuntimeStore.getTraces();

        const index = new Map();

        traces.forEach((event) => {

            const key = event.type;

            if (!index.has(key)) {

                index.set(key, {
                    type: key,
                    count: 0,
                    categories: new Set(),
                    timestamps: []
                });
            }

            const entry = index.get(key);

            entry.count++;

            entry.timestamps.push(event.timestamp);

            if (event.category) {
                entry.categories.add(event.category);
            }
        });

        // Convert Sets → arrays
        return Array.from(index.values()).map(entry => ({
            ...entry,
            categories: Array.from(entry.categories)
        }));
    },

    query(type) {

        const index = this.buildIndex();

        return index.find(entry => entry.type === type);
    }
};