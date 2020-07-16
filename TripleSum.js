function binarySearch(arr, val, start, end) {
    console.log(`start: ${start}`)
    console.log(`end: ${end}`)
    //base case
    if (start === end) {
        if (val >= arr[start]) {
            return start
        } else {
            return (start - 1)
        }
    }

    const medium = Math.floor((start + end) / 2);

    if (arr[medium] === val) {
        return medium;
    } else if (val < arr[medium]) {
        return binarySearch(arr, val, start, medium - 1)
    } else {
        return binarySearch(arr, val, medium + 1, end)
    }
}

// Complete the triplets function below.
function triplets(a, b, c) {
    a.sort((a1, a2) => a1 - a2);
    c.sort((a1, a2) => a1 - a2);

    const d = [...new Set(b)];

    let result = 0;

    for (let i = 0; i < d.length; i++) {
        const tempA = binarySearch(a, d[i], 0, a.length - 1) + 1
        const tempB = binarySearch(c, d[i], 0, c.length - 1) + 1

        console.log(`tempA: ${tempA}`)
        console.log(`tempB: ${tempB}`)

        result = result + tempA * tempB
    }

    return result;
}

console.log(triplets([1, 3, 5], [2, 3], [1, 2, 3]))