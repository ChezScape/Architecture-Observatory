export function buildBreakdown(trace = []) {

    return trace.map((event, index) => ({
        step: index + 1,
        type: event.type,
        timestamp: event.timestamp
    }));
}