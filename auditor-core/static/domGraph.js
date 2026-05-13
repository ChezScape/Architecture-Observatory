export function createDOMGraph() {

    const nodes = [];

    document.querySelectorAll("*").forEach((element) => {

        nodes.push({
            tag: element.tagName,
            id: element.id
        });
    });

    return nodes;
}