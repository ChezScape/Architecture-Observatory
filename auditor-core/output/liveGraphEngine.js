export function updateLiveGraph(graph, event) {

    graph.nodes.push({
        id: crypto.randomUUID(),
        label: event.type
    });

    return graph;
}