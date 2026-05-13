export function computeCoupling(trace) {
    const dom = trace.filter(t => t.type.startsWith("DOM")).length;
    const events = trace.filter(t => t.type.startsWith("EVENT")).length;
    const state = trace.filter(t => t.type.startsWith("STATE")).length;

    return {
        total: dom + events + state,
        dom,
        events,
        state
    };
}