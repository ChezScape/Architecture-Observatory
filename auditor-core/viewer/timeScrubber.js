import { Trace } from "../runtime/tracer.js";

export function createScrubber() {
    let index = 0;

    function stepForward() {
        const events = Trace.get();
        return events.slice(0, ++index);
    }

    function stepBack() {
        index = Math.max(0, index - 1);
        return Trace.get().slice(0, index);
    }

    return { stepForward, stepBack };
}