import { Bus } from "../runtime/bus.js";

export function createTimeDebugger() {
    let index = 0;

    function stepForward() {
        index++;
        return Bus.get().slice(0, index);
    }

    function stepBack() {
        index = Math.max(0, index - 1);
        return Bus.get().slice(0, index);
    }

    function reset() {
        index = 0;
    }

    return { stepForward, stepBack, reset };
}