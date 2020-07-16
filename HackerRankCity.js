// método necesario para la multiplicación de números grandes en módulo m (Javascript no tiene ningún manejo de números grandes)
function mult(a, b, m){
    let result = 0;
    a %= m;

    while(b > 0){
        if(b % 2 > 0){
            result = (result + a) % m;
        }

        a = (2 * a) % m;
        b = Math.floor(b/2);
    }

    return result
}

/*
 * Complete the hackerrankCity function below.
 */


function hackerrankCity(A) {
    const m = 1000000007;
    let C = 1;
    let E = 0;
    let Z = 0;
    let D = 0;
    A = [0, ...A]

    for(let i = 1; i < A.length; i++){
        const CX = C, EX = E, ZX = Z, DX = D
        C = ((4*CX)%m + 2) % m
        Z = ((2*ZX)%m + (3*A[i])%m)%m;
        E = ((4*EX)%m + (8*CX*A[i])%m + 3*A[i] + mult(3*CX, ZX, m) + ((2*ZX) % m) % m) % m
        D =  (((4 * DX) % m) + ((12*(A[i]%m)%m)*CX)%m + (8*EX)%m + (A[i])%m + mult(12*CX, EX, m) + 16*A[i]*mult(CX, CX, m)) % m
    }

    return D;

}