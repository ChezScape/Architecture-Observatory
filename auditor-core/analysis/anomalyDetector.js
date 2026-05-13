export function detectAnomalies(trace) {
    const slow = trace.filter(t => t.duration && t.duration > 50);

    return slow.length > 5
        ? ["Performance instability detected (slow execution bursts)"]
        : [];
}