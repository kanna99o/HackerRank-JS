// La solución al problema solo pasa por implementar Union-Find para llevar registro de los circulos de amigos.
class UnionFind{
    constructor(n){
        this.p = new Map();
        this.size = new Map();
        this.largestSet = 1;
    }

    find(node){
        if(this.p.get(node) == null){
            this.p.set(node, node);
            this.size.set(node, 1);
        }

        if(this.p.get(node) === node){
            return node;
        }

        return this.find(this.p.get(node));
    }

    updateLargest (node){
        if(this.size.get(node) > this.largestSet){
            this.largestSet = this.size.get(node);
        }
    }

    union(node1, node2){
        // find the root of each node
        const r1 = this.find(node1);
        const r2 = this.find(node2);

        if(r1 === r2) return;

        if(this.size.get(r2) >= this.size.get(r1)){
            this.size.set(r2, this.size.get(r2) + this.size.get(r1));
            this.p.set(r1, r2);
            
            this.updateLargest(r2);
        } else {
            this.size.set(r1, this.size.get(r2) + this.size.get(r1));
            this.p.set(r2, r1);

            this.updateLargest(r1);
        }
    }

    sameSet(node1, node2){
        return find(node1) === find(node2);
    }
}

// Complete the maxCircle function below.
function maxCircle(queries) {
    const uf = new UnionFind(1000000000);
    const result = [];

    for(let i = 0; i < queries.length; i++){
        const q = queries[i];
        uf.union(q[0], q[1]);
        result.push(uf.largestSet);
    }

    return result;
}