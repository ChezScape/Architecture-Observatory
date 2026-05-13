// ========================================
// EXPLAINABLE SYSTEM GPT BRIDGE
// ========================================
//
// PURPOSE:
// Converts runtime + analysis data into
// structured natural language explanations.
//
// (NO external API required — just formatter layer)
//
// ========================================

import { RuntimeStore } from "../runtime/runtimeStore.js";

import { InsightAIEngine } from "./insightAIEngine.js";

import { PredictiveFailureEngine } from "./predictiveFailureEngine.js";

import { CausalGraphEngine } from "./causalGraphEngine.js";

export const ExplainableSystemGPTBridge = {

    explain() {

        const traces = RuntimeStore.getTraces();

        const insights = InsightAIEngine.analyse();

        const prediction = PredictiveFailureEngine.analyse();

        const graph = CausalGraphEngine.build();

        return this._format({

            traceCount: traces.length,

            insightCount: insights.length,

            nodeCount: graph.nodes.length,

            edgeCount: graph.edges.length,

            riskLevel: prediction.riskLevel,

            topInsight: insights[0] || null
        });
    },

    _format(data) {

        return `
SYSTEM ANALYSIS REPORT

- Total Events: ${data.traceCount}
- Insights Generated: ${data.insightCount}
- Graph Nodes: ${data.nodeCount}
- Graph Edges: ${data.edgeCount}

- System Risk Level: ${data.riskLevel}

${data.topInsight ? `
PRIMARY OBSERVATION:
${data.topInsight.summary || data.topInsight.type}
` : ""}

INTERPRETATION:
The system is currently operating in a ${
            data.riskLevel === "HIGH"
                ? "high instability"
                : data.riskLevel === "MEDIUM"
                ? "moderate fluctuation"
                : "stable"
        } state.
        `.trim();
    }
};