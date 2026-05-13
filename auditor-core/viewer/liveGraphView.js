export function mountLiveGraph(root) {

    const graph = document.createElement("div");

    graph.innerHTML = "<h3>Live Graph</h3>";

    root.appendChild(graph);
}