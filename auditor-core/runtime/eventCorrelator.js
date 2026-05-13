// ========================================
// EVENT CORRELATOR
// ========================================

import { RuntimeStore } from "./runtimeStore.js";

export const EventCorrelator = {

    buildChains() {

        const traces = RuntimeStore.getTraces();

        const chains = [];

        let currentChain = [];

        let lastEvent = null;

        traces.forEach((event) => {

            if (!lastEvent) {

                currentChain.push(event);

            } else {

                const timeGap =
                    event.timestamp - lastEvent.timestamp;

                // New chain if gap too large
                if (timeGap > 500) {

                    chains.push(currentChain);

                    currentChain = [];
                }

                currentChain.push(event);
            }

            lastEvent = event;
        });

        if (currentChain.length) {
            chains.push(currentChain);
        }

        return chains;
    },

    findRootCauses() {

        const chains = this.buildChains();

        return chains.map((chain) => {

            const root = chain[0];

            const last = chain[chain.length - 1];

            return {
                root,
                outcome: last,
                length: chain.length
            };
        });
    }
};