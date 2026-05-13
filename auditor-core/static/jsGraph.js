export function createJSImportGraph(modules = []) {

    return modules.map((module) => ({
        module,
        imports: []
    }));
}