export function buildHeatmap(trace) {
    const map = {};

    for (const e of trace) {
        map[e.type] = (map[e.type] || 0) + 1;
    }

    return Object.entries(map).map(([key, value]) => ({
        id: key,
        intensity: value
    }));
}