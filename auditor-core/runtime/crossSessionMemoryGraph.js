// ========================================
// CROSS SESSION MEMORY GRAPH
// ========================================
//
// PURPOSE:
// Stores lightweight persistent knowledge
// across sessions (conceptual memory graph).
//
// NOTE:
// This assumes RuntimeStore persistence or localStorage.
//
// ========================================

export const CrossSessionMemoryGraph = {

    load() {

        const raw = localStorage.getItem("memory_graph");

        return raw ? JSON.parse(raw) : {
            nodes: [],
            edges: []
        };
    },

    save(graph) {

        localStorage.setItem(
            "memory_graph",
            JSON.stringify(graph)
        );
    },

    updateFromRuntime(traces) {

        const graph = this.load();

        traces.forEach(event => {

            const nodeId = event.type;

            if (!graph.nodes.includes(nodeId)) {
                graph.nodes.push(nodeId);
            }

            if (event.relatedTo) {

                graph.edges.push({
                    from: event.relatedTo,
                    to: event.type,
                    timestamp: event.timestamp
                });
            }
        });

        this.save(graph);

        return graph;
    },

    query(type) {

        const graph = this.load();

        return {
            node: type,
            connections: graph.edges.filter(e =>
                e.from === type || e.to === type
            )
        };
    }
};