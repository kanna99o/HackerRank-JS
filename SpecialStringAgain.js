function substrCount(n, s) {
    let result = 0;
    
    //variable para buscar secuencia continua
    let count = 1;

    //variables para buscar secuencia con pivote (tracker)
    let l1 = '';
    let c1 = 0;

    let pivot = '';

    let l2 = '';
    let c2 = 0;
        
    for (let i = 0; i < n; i++){
        // buscando secuencia de la misma letra. Ej: "aaaa"
        if(i > 0 && s[i] === s[i - 1]) {
            count++;
        } else {
            count = 1;
        }

        result += count;

        // buscando secuencia con letra pivote: Ej: "aabaa"
        // tracker sin pivote y sin l2 (este caso abarca a tracker vacio)
        if( pivot === '' && c2 === 0){
            if(l1 === ''){ // sin l1 => nueva letra se convierte en l1
                l1 = s[i];
                c1++;
            } else if(s[i] === l1){ // letra nueva suma a actual l1
                c1++;
            } else { // letra nueva distinta a l1 => letra nueva es pivote
                pivot = s[i];
            }
        } else if(pivot !== ''){ //tracker con l1 y pivote
            if(l2 === ''){ // nuevo l2 debe ser igual a l1
                if(s[i] === l1){
                    l2 = s[i];
                    c2 = 1;
                    result++;
                } else { //si s[i] no es igual a l1
                    if(s[i] === pivot){ // reset tracker => pivot pasa a se l1 con c1 = 2
                        l1 = pivot;
                        c1 = 2;

                        pivot = '';
                    } else{ // reset tracker => pivot pasa a ser l1 con c1 = 1
                        l1 = pivot;
                        c1 = 1;

                        pivot = s[i];
                    }
                }
            } else if(l2 === s[i]) { //nueva letra es igual a l2 existente
                c2++;
                if(c2 <= c1){
                    result++;
                } else {
                    pivot = '';
                    l1 = l2;
                    c1 = c2;

                    l2 = ''
                    c2 = 0;
                }
            } else { // si nueva letra no es igual a l2, se debe armar tracker de nuevo
                if(c2 === 1 && s[i] === pivot){  
                    /* si s[i] es igual a pivot y c2 === 1, es posible formar un nuevo termino (de 3 letras)
                    con s[i]. Es decir, los punteros se desplazan a la derecha en 1: 
                    pivot es l1, l2 es pivot y l2 es s[i] */
                    l1 = pivot;
                    c1 = 1;
                    pivot = l2;
                    l2 = s[i];
                    c2 = 1;

                    result++;
                }
                else{ // si c2 es mayor a 1, implica que l1 y pivot deben ser descartados, siendo rescatado solo l2. Es decir l1 toma valor l2 y pivot es s[i]
                    pivot = s[i];
                    l1 = l2;
                    c1 = c2;

                    l2 = ''
                    c2 = 0;
                }
            }
        }
    }

    return result;

}

console.log(substrCount(7, 'abcbaba'));