// ========================================
// SNAPSHOT ENGINE
// ========================================

import { RuntimeStore } from "./runtimeStore.js";
import { Trace } from "./tracer.js";

import { EVENTS } from "./eventTypes.js";

const snapshots = [];

export const SnapshotEngine = {

    create(label = "snapshot") {

        const snapshot = {

            id: crypto.randomUUID(),

            label,

            timestamp: Date.now(),

            dom: document.body.innerHTML,

            traces: structuredClone(
                Trace.get()
            )
        };

        snapshots.push(snapshot);
        RuntimeStore.saveSnapshot(snapshot);

        Trace.log({
            type: EVENTS.SYSTEM_READY,
            category: "snapshot",
            message: `Snapshot created: ${label}`
        });

        return snapshot;
    },

    getAll() {
        return snapshots;
    },

    get(id) {

        return snapshots.find(
            (snapshot) => snapshot.id === id
        );
    },

    restore(id) {

        const snapshot = this.get(id);

        if (!snapshot) {
            return;
        }

        document.body.innerHTML = snapshot.dom;

        Trace.log({
            type: EVENTS.SYSTEM_READY,
            category: "snapshot_restore",
            message: `Snapshot restored: ${snapshot.label}`
        });
    }
};