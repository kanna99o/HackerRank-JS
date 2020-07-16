'use strict';

const fs = require('fs');
const path = require('path');

//process.stdin.resume();
//process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;
/*
process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('SIGINT', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});
*/
const inputFile = path.join(__dirname, '/input05.txt');

inputString = (fs.readFileSync(inputFile, 'utf8')).split('\n');

//inputString = inputString.split('\n');
//console.log(inputString);
main();


function readLine() {
    return inputString[currentLine++];
}

function ceilIndex(arr, value, l, r){ 
    // si el número buscado no está en la lista, retorna indice del numero mayor más cercano
    while(r - l > 1){
        const m = l + Math.floor((r - l)/2);
        if(arr[m] >= value){
            r = m;
        } else {
            l = m;
        }
    }

    return r;
}

function readLine() {
    return inputString[currentLine++];
}
// las explicación de este algoritmo esta en https://www.geeksforgeeks.org/longest-monotonically-increasing-subsequence-size-n-log-n/
// Complete the longestIncreasingSubsequence function below.
function longestIncreasingSubsequence(arr) {
    
    if(arr.length === 1) return 1;
    
    const lastNumbers = [arr[0]]; // arrglo con el número más grande de las listas activas
    const length = [1]; // arreglo con el largo de las listas activas
    let lastListIndex = 0; // indice de la lista activa más grande

    for(let i = 1; i < arr.length; i++){
        const current = arr[i];
        const biggest = lastNumbers[lastListIndex];
        const lowest = lastNumbers[0];

        if(current < lowest){ 
            /* Sí el numero es menor que todos los números mayores de las listas activas, 
            entonces empieza una nueva lista de largo 1 (reemplaza a la anterior, ya que 
            tiene potencial de ser más grande aquella a la que reemplaza) */
            lastNumbers[0] = current;
            length[0] = 1;
        } else if (current > biggest){ 
            /* Sí curent es mayor que los números mayores de todas las listas activas,
            entonces se debe clonar la lista más larga hasta el momento y agregar el nuevo
            numero (current). Se debe clonar (y no reemplazar) por la lista más grande podría 
            verse modificada por la aparición de un número que pueda reemplazar al más grande, 
            entonces puede potencialmente evolucionar en una lista diferente a la resultante de esta adición */
            lastNumbers[lastListIndex + 1] = current;
            length[lastListIndex + 1] = length[lastListIndex] + 1;
            lastListIndex++;
        } else { 
            /* Sí current está entre el menor y el mayor de todos los números mayores de las listas, 
            entonces puede reemplazar al final de una lista al número mayor más cercano a él */
            const indexForReplace = ceilIndex(lastNumbers, current, 0, lastListIndex);
            if(lastNumbers[indexForReplace - 1] === current){ 
                /* dado que el problema se centra en listas estrictamente crecientes, los números
                repetidos (que ya son parte de alguna lista) deben ser ignorados. Dado que se buscó con
                ceilIndex el número mayor más cercano a current, ahora se debe verificar que el número
                previo no es igual a current. Si ese es el caso, el número debe ser ignorado */
                continue;
            }
            lastNumbers[indexForReplace] = current;
        }
    }

    return length[lastListIndex];

}

function main() {
    //const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    
    const n = parseInt(readLine(), 10);

    let arr = [];

    for (let i = 0; i < n; i++) {
        const arrItem = parseInt(readLine(), 10);
        arr.push(arrItem);
    }

    let result = longestIncreasingSubsequence(arr);

    console.log(result);
    //ws.write(result + "\n");

    //ws.end();
}
