/* 
La solución pasa por buscar la cantidad de días necesarios para producir
la cantidad de unidades necesarias en un rango de dias determinado. 
Este rango de busqueda de días se forma por un limite inferior igual a la 
cantidad de dias requeridos para fabricar las unidades suponiendo que todas 
las máquinas son igual de rápidas que la máquina más rapida disponible. Similarmente,
el límite superior viene dado por los dias requeridos para fabricar las unidades si todas
las máquinas son iguales a la más lenta.

Luego, se realiza una búsqueda binaria en ese rango de días posibles, calculando 
en cada iteración las unidades producidas. Dado que en general hay muchos días en que se produce
la misma cantidad de unidades (en particular la cantidad meta del problema) y lo que se busca es
la cantidad minima de días necesarios, en la busqueda binaria solo se debe proceder a buscar en el subrango
de días mayores si la cantidad probada (mid) da una cantidad ESTRICTAMENTE menor de unidades a las necesarias
*/

function unitsInDays(daysMachine, days){
    return Math.floor(days/daysMachine);
}

function numberOfUnits(daysMachines, days){
    let result = 0;

    daysMachines.forEach((numberOfMachines, daysMachine) => {
        result += numberOfMachines * unitsInDays(daysMachine, days);
    });

    return result;
}

// Complete the minTime function below.
function minTime(machines, goal) {
    let fastest = Number.MAX_VALUE; // máquina más rápida
    let slowest = 0; // máquina más lenta
    const n = machines.length;
    /*
    mapa de maquinas en forma {"dias por unidad" : cantidad de maquinas} sirve para reducir 
    iteraciones en el cáculo de la producción de unidades 
    */
    const daysMachines = new Map();

    machines.forEach(days => {
        daysMachines.set(days, daysMachines.get(days) ? daysMachines.get(days) + 1 : 1)
        
        //busqueda de las máquinas más rapida y más lenta
        if(days < fastest){
            fastest = days;
        }

        if(days > slowest){
            slowest = days;
        }
    });
    // calculo de límites del rango de días de búsqueda
    let lower = Math.ceil(goal * fastest/n); // rango inferior, suponiendo n máquinas igual a la más rápida
    let upper = Math.ceil(goal * slowest/n); // rango inferior, suponiendo n máquinas igual a la más lenta

    while(upper - lower > 1){

        let mid = Math.floor(lower + (upper - lower) / 2);

        const numUnits = numberOfUnits(daysMachines, mid);


        if(numUnits < goal){ //solo si numUnits es estrictamente inferior a la meta, se busca en subrango de días mayores
            lower = mid;
        } else {
            upper = mid;
        }
    }

    return upper; // se devuelve el ceiling del rango, ya que lower arroja una canitdad de unidades menores a la meta
}

console.log(minTime([4,5,6], 12));