function inOrderTraversal(indexes, index = 1){

    if(index == -1) return '';

    const childsOfCurrent = indexes[index - 1];
    const leftChild = childsOfCurrent[0];
    const rightChild = childsOfCurrent[1];

    return [...inOrderTraversal(indexes,leftChild), index, ...inOrderTraversal(indexes,rightChild)];
}


function nodesByLevel(indexes, map = {}, index = 1, level = 1){

    if(index === -1) return;
    
    if(map[level]){
        map[level].push(index);
    } else {
        map[level] = [index];
    }

    const nextNodes = indexes[index - 1];
    const leftNode = nextNodes[0];
    const rightNode = nextNodes[1];

    if(leftNode > -1) nodesByLevel(indexes, map, leftNode, level + 1);
    if(rightNode > - 1) nodesByLevel(indexes, map, rightNode, level + 1);

    if(index === 1) return map;

}

function swapKLevels(levelMap, indexes, k){
    const orderedLevels = Object.keys(levelMap).sort((a,b) => a - b);
    const maxLevel = orderedLevels[orderedLevels.length - 1];

    for(let i = k; i <= maxLevel; i = i + k){
        const levelNodes = levelMap[i];

        levelNodes.forEach(levelNode => {
            const children = indexes[levelNode - 1];
            
            //swap children
            const left = children[0];
            children[0] = children[1];
            children[1] = left;
        });
    }
}


const indexes = [[2,3], [4, -1], [5, -1], [6, -1],[7, 8], [-1 , 9], [-1, -1], [10, 11], [-1, -1], [-1, -1], [-1, -1]];

const levelMap = nodesByLevel(indexes);

swapKLevels(levelMap, indexes, 2);

console.log(inOrderTraversal(indexes));

swapKLevels(levelMap, indexes, 4);

console.log(inOrderTraversal(indexes));
