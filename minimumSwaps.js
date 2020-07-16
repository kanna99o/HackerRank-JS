'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the minimumSwaps function below.
function minimumSwaps(arr) {
    let swaps = 0;
    let currentIndex = 0;
    
    let lowerNumber;

    // find minimum number
    arr.forEach(number => {
        if(!lowerNumber){
            lowerNumber = number;
        } else {
            if(number < lowerNumber) lowerNumber = number;
        }
    });

    while(currentIndex < arr.length){
        const currentNumber = arr[currentIndex];
        const correctNumber = lowerNumber + currentIndex;
        if(currentNumber !== correctNumber){
            const correctIndex = currentNumber - lowerNumber;
            swap(arr, currentIndex, correctIndex);
            swaps++;
        } else {
            currentIndex++;
        }
    }

    return swaps;

}

function swap(arr, right, left){
    let a = arr[right];
    arr[right] = arr[left];
    arr[left] = a;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const res = minimumSwaps(arr);

    ws.write(res + '\n');

    ws.end();
}
