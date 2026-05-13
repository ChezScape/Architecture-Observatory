// ========================================
// ARCHITECTURE DIFF ENGINE
// ========================================
//
// PURPOSE:
// Compares expected architecture vs runtime behaviour
// and detects structural drift.
//
// ========================================

import { RuntimeStore } from "../runtime/runtimeStore.js";

export const ArchitectureDiffEngine = {

    analyse(expectedStructure = []) {

        const traces = RuntimeStore.getTraces();

        const actualTypes = new Set(
            traces.map(t => t.type)
        );

        const missing = [];
        const unexpected = [];

        // Expected but not seen
        expectedStructure.forEach((expected) => {

            if (!actualTypes.has(expected)) {

                missing.push(expected);
            }
        });

        // Seen but not expected
        actualTypes.forEach((type) => {

            if (!expectedStructure.includes(type)) {

                unexpected.push(type);
            }
        });

        const driftScore =
            (missing.length + unexpected.length) /
            (expectedStructure.length || 1);

        return {

            expected: expectedStructure,
            missing,
            unexpected,
            driftScore,

            status:
                driftScore > 0.5 ? "UNSTABLE"
                : driftScore > 0.2 ? "DRIFTING"
                : "STABLE"
        };
    }
};