'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the surfaceArea function below.
function surfaceArea(A) {
    let result = 0;
    for(let i = 0; i < A.length; i++){
        for(let j = 0; j < A.length[0]; j++){
            result += getArea(A, i, j);
        }
    }

    return result;

}

function getPiece(A, i, j){
    if(i < 0 || j < 0 || i > A.length - 1 || j > A.length[0] - 1){
        return 0;
    }

    return A[i][j];
}

function getArea(A, i, j){
    let result = 2;

    // up
    if (getPiece(A,i,j) > getPiece(A, i - 1, j)){
        result += (getPiece(A,i,j) - getPiece(A, i - 1, j));
    }

    //down
    if (getPiece(A,i,j) > getPiece(A, i + 1, j)){
        result += (getPiece(A,i,j) - getPiece(A, i + 1, j));
    }

    //left
    if (getPiece(A,i,j) > getPiece(A, i, j - 1)){
        result += (getPiece(A,i,j) - getPiece(A, i, j - 1));
    }

    //right
    if (getPiece(A,i,j) > getPiece(A, i, j + 1)){
        result += (getPiece(A,i,j) - getPiece(A, i, j + 1));
    }

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const HW = readLine().split(' ');

    const H = parseInt(HW[0], 10);

    const W = parseInt(HW[1], 10);

    let A = Array(H);

    for (let i = 0; i < H; i++) {
        A[i] = readLine().split(' ').map(ATemp => parseInt(ATemp, 10));
    }

    let result = surfaceArea(A);

    ws.write(result + "\n");

    ws.end();
}