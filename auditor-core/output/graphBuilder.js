export function buildGraph(nodes = [], links = []) {

    return {
        nodes,
        links,
        generated: Date.now()
    };
}