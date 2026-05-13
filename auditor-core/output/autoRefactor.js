import { suggest } from "../analysis/refactorEngine.js";

export function generatePatch(trace) {

    const fixes = suggest(trace);

    return fixes.map(f => ({
        type: "refactor_suggestion",
        message: f,
        severity: "recommended"
    }));
}