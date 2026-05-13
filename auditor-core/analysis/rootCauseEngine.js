export function explain(trace) {
    const reasons = [];

    const dom = trace.filter(t => t.type === "DOM_QUERY").length;
    const events = trace.filter(t => t.type === "EVENT_RUN").length;
    const state = trace.filter(t => t.type === "STATE_MUTATION").length;

    if (state > 200) {
        reasons.push("State churn is destabilising UI flow");
    }

    if (events > 150) {
        reasons.push("Event storm → execution order becomes unpredictable");
    }

    if (dom > 300) {
        reasons.push("UI is too tightly coupled to DOM reads");
    }

    return reasons;
}