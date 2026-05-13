import { explain } from "../analysis/rootCauseEngine.js";

export function explainAsStory(trace) {

    const causes = explain(trace);

    if (!causes.length) {
        return "System is stable — no failure chain detected.";
    }

    return `
The system broke due to a chain of events:

${causes.map((c, i) => `${i + 1}. ${c}`).join("\n")}

This suggests architectural instability caused cascading failure across runtime layers.
    `;
}