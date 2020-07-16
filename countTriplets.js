function triplets(a, b, c) {
    a = [...new Set(a)].sort((a, b) => a - b)
    b = [...new Set(b)].sort((a, b) => a - b)
    c = [...new Set(c)].sort((a, b) => a - b)

    let result = 0

    let i = 0;
    let j = 0;
    let k = 0;

    while (j < b.length) {
        while (a[i] <= b[j] && i < a.length) {
            i++;
        }
        while (c[k] <= b[j] && k < c.length) {
            k++
        }
        result += i * k;
        j++;
    }

    return result;
}