// ========================================
// INSIGHT AI ENGINE
// ========================================
//
// PURPOSE:
// Converts causal graphs + traces into
// human-readable explanations of system behaviour.
//
// ========================================

import { RuntimeStore } from "../runtime/runtimeStore.js";

import { CausalGraphEngine } from "./causalGraphEngine.js";

export const InsightAIEngine = {

    analyse() {

        const traces = RuntimeStore.getTraces();

        const graph = CausalGraphEngine.build();

        const insights = [];

        let lastStateChange = null;

        traces.forEach((event) => {

            // Detect state-driven chains
            if (event.type === "STATE_CHANGE") {

                lastStateChange = event;
            }

            // Detect DOM reactions
            if (event.type === "DOM_MUTATION" && lastStateChange) {

                insights.push({
                    type: "STATE_TO_DOM_FLOW",
                    summary:
                        `State change triggered DOM mutation (${lastStateChange.key})`,
                    root: lastStateChange,
                    outcome: event
                });
            }

            // Detect rapid event bursts
            if (event.type === "CLICK") {

                const burst = traces.filter((t) =>
                    Math.abs(t.timestamp - event.timestamp) < 200
                ).length;

                if (burst > 5) {

                    insights.push({
                        type: "EVENT_BURST",
                        summary: "High interaction burst detected",
                        intensity: burst
                    });
                }
            }
        });

        // Structural insight
        insights.push({
            type: "GRAPH_SUMMARY",
            summary: `Graph contains ${graph.nodes.length} nodes and ${graph.edges.length} edges`
        });

        return insights;
    }
};