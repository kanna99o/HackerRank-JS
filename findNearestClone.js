class Node {
    constructor(value, color) {
        this.value = value;
        this.color = color;
    }
}

class Graph {
    constructor() {
        this.adjList = {};
    }

    static distancesToRoot(parentObject) {
        const distances = {};
        Object.keys(parentObject).forEach(nodeId => {
            distances[nodeId] = Graph.distance(parentObject, nodeId);
        });

        return distances;
    }

    static distance(parentObject, nodeId) {
        let current = nodeId;

        if (parentObject[current] === -1) {
            return 0;
        }

        return 1 + Graph.distance(parentObject, parentObject[nodeId]);
    }

    addNode(node) {
        if (!this.adjList[node.value]) {
            this.adjList[node.value] = { node, edges: [] }
        }
    }

    addEdge(nodeA, nodeB) {
        if (this.adjList[nodeA.value] && this.adjList[nodeB.value]) {
            this.adjList[nodeA.value].edges.push(nodeB);
            this.adjList[nodeB.value].edges.push(nodeA);
        }
    }

    removeNode(node) {
        //remove edges too
        Object.keys(this.adjList).forEach(nodeId => {
            if (nodeId !== node.value) {
                this.adjList[nodeId].edges = this.adjList[nodeId].edges.filter(current => current.value !== node.value);
            }
        });

        if (this.adjList[node.value]) {
            delete this.adjList[node.value];
        }
    }

    BFS(startNodeId) {
        const visited = {};
        const unexplored = [];
        const parent = {};

        //init
        parent[startNodeId] = -1;
        visited[startNodeId] = true;
        unexplored.unshift(this.adjList[startNodeId].node);

        while (unexplored.length) {
            //console.log(`unexplored: ${JSON.stringify(unexplored, null, 4)}`);
            const current = unexplored.pop();
            //console.log(`current node BFS: ${current.value}`);
            //console.log(`current value: ${current.value}`)
            const neighbors = this.adjList[current.value].edges;

            neighbors.forEach(neighbor => {
                if (!visited[neighbor.value]) {
                    parent[neighbor.value] = current.value;
                    visited[neighbor.value] = true;
                    unexplored.unshift(neighbor);
                }
            });
        }

        //console.log(`parent object: ${JSON.stringify(parent, null, 4)}`)
        const distances = Graph.distancesToRoot(parent);
        //console.log(`distances object: ${JSON.stringify(distances, null, 4)}`);
        return distances;

    }
}

function findShortest(graphNodes, graphFrom, graphTo, ids, val) {
    let result = Number.MAX_VALUE;
    const graph = new Graph();

    for (let i = 1; i <= graphNodes; i++) {
        const node = new Node(i, ids[i - 1]);
        graph.addNode(node);
    }

    graphFrom.forEach((current, index) => {
        const nodeA = graph.adjList[current].node;
        const nodeB = graph.adjList[graphTo[index]].node;

        graph.addEdge(nodeA, nodeB);
    });

    //console.log(`graph: ${JSON.stringify(graph, null, 4)}`);
    // build colorMap
    const colorMap = {};
    ids.forEach((color, index) => {
        if (!colorMap[color]) {
            colorMap[color] = { [index + 1]: true }
        } else {
            colorMap[color][index + 1] = true;
        }
    })

    const colorToMatch = val;
    //console.log(`nodos de inicio para BFS: ${JSON.stringify(colorMap[colorToMatch])}`);
    Object.keys(colorMap[colorToMatch]).forEach(nodeId => {
        const distances = graph.BFS(nodeId);
        //console.log(console.log(JSON.stringify(distances, null, 4)));
        Object.keys(distances).forEach(id => {
            if (id !== nodeId && Object.keys(colorMap[colorToMatch]).includes(id) && distances[id] < result) {
                //console.log(`actualizando distancia con nodo: ${id}`);
                result = distances[id];
            }
        })
    });

    if (result === Number.MAX_VALUE) {
        return -1;
    }

    return result;

}

console.log(findShortest(5, [1, 1, 2, 3], [2, 3, 4, 5], [1, 2, 3, 3, 2], 2));