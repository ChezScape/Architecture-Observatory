export function suggest(trace) {
    const suggestions = [];

    const state = trace.filter(t => t.type === "STATE_MUTATION").length;
    const dom = trace.filter(t => t.type === "DOM_QUERY").length;
    const events = trace.filter(t => t.type === "EVENT_RUN").length;

    if (state > 200) {
        suggestions.push("Split state into isolated modules (UI / logic / cache)");
    }

    if (dom > 250) {
        suggestions.push("Introduce cached DOM layer or component abstraction");
    }

    if (events > 120) {
        suggestions.push("Centralise events into dispatcher / event bus");
    }

    return suggestions;
}