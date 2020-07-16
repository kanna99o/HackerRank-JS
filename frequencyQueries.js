'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the freqQuery function below.
function freqQuery(queries) {
    const data = {};
    const freq = {};

    const result = [];

    queries.forEach(([queryType, queryNumber]) => {
        if(queryType === 1){
            //update frequency
            if(data[queryNumber] && freq[data[queryNumber]] && freq[data[queryNumber]][queryNumber]){
                delete freq[data[queryNumber]][queryNumber]
            }

            data[queryNumber] = (data[queryNumber] || 0) + 1;

            //update frequency
            if(freq[data[queryNumber]]){
                freq[data[queryNumber]][queryNumber] = true;
            } else {
                freq[data[queryNumber]] = { [queryNumber]: true };
            }
        } else if(queryType === 2){
            //update frequency
            if(data[queryNumber] && data[queryNumber] > 0){
                if(freq[data[queryNumber]] && freq[data[queryNumber]][queryNumber]){
                    delete freq[data[queryNumber]][queryNumber]
                }

                data[queryNumber] = data[queryNumber] - 1;
            }

            //update frequencies
            if(data[queryNumber] && data[queryNumber] > 0){
                if(freq[data[queryNumber]]){
                    freq[data[queryNumber]][queryNumber] = true;
                } else {
                    freq[data[queryNumber]] = { [queryNumber]: true };
                }
            }
        } else {
            // look for frequency of queryNumber
            if(freq[queryNumber] && Object.keys(freq[queryNumber]).length > 0){
                result.push(1);
            } else {
                result.push(0);
            }
        }
    });

    return result;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    let queries = Array(q);

    for (let i = 0; i < q; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const ans = freqQuery(queries);

    ws.write(ans.join('\n') + '\n');

    ws.end();
}
