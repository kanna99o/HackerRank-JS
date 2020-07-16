function unboundedKnapsack(k, arr) {
    return k - minimalRemainder(k, arr)
}

function minimalRemainder(k, arr) {
    if (k < arr[0]) return k;

    let returnValue = arr[arr.length - 1] + 1;

    for (let i = 0; i < arr.length; i++) {
        const result1 = minimalRemainder(k - arr[i], arr)
        if (result1 < returnValue && result1 >= 0) returnValue = result1;
    }

    return returnValue
}

console.log(unboundedKnapsack(11, [3, 7, 9]))