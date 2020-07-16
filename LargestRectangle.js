/* 
La idea central de la solución pasa por darse cuanta que para cada edificio, llendo de izquierda a derecha,
la longitud del rectangulo que puede formar se extiende hasta que aparezca otro edificio de menor altura.
Por este motivo, se itera sobre los edificios y se van metiendo en un stack de "areas activas", es decir, 
que aún no se pueden dar por finalizadas porque no aparece un adifico de menor altura que ponga fin a ese 
rectangulo de altura h[i].

Para introducir nuevos eficios en el arreglo de areas activas (push), se debe considerar dos casos:

supongamos que iteramos sobre el edifico en posición i de altura h[i],

 - si el edificio en i - 1 tiene una altura h[i - 1] < h[i], entonces el rectangulo de altura h[i] solo puede empezar en la posición i.
   por lo tanto se agrega al arreglo el par [h[i], i] (altura y indice de comienzo de rectangulo).

 - si el edificio i tienen una altura menor o igual al anterior, es decir, h[i - 1] >= h[i], significa que el rectangulo de altura h[i - 1]
   no puede seguir creciendo, por tanto ya podemos calcular su área y sacarlo del stack de áreas activas. 
   Tenemos altura h[i - 1], la posición donde comienza y donde termina (el indice actual).
   En este caso, se saca el par [h[i - 1], <indice de comienzo de h[i - 1]>] se cálcula el área y se mete en un arreglo de áreas calculadas.
   En definitiva, esto pasa para todos los edificio con altura mayor a h[i]. Eventualmente el stack de áreas activas podría quedar vacio.

   Además se debe observar que para el rectángulo de altura h[i], este debe comenzar donde comienza el primero de los rectángulos con h[j] > h[i] con j < i
   (notar que dicho índice corresponde al comienzo del último edificio que se sacó del stack de áreas activas).

   Finalmente, terminada la iteraciñon sobre los edificios, se debe calcular todas las áreas que quedan en el stack de áreas activas (asumiendo que 
   llegan hasta el final) y meterlos en el arreglo de áreas calculadas. Luego retornar el máximo de las áreas calculadas.
*/

function largestRectangle(h) {
    const activeAreas = [];
    let activeIndex = -1;
    const finishedAreas = [];

    h = [0,...h];

    for(let i = 1; i < h.length; i++){
        if(activeIndex === -1 || (activeAreas[activeIndex][0] < h[i])){
            activeAreas.push([h[i], i]);
            activeIndex++;
        } else{
            let startIndex;
            while(activeIndex >= 0 && activeAreas[activeIndex][0] >= h[i]){
                const currentArea = activeAreas.pop();
                activeIndex--;
                startIndex = currentArea[1];
                finishedAreas.push(currentArea[0]*(i - startIndex));
            }

            activeAreas.push([h[i], startIndex]);
            activeIndex++;
        }
    }

    console.log(activeAreas);

    //calculate remaining active areas
    const length = h.length;
    activeAreas.forEach(pair => {
        finishedAreas.push(pair[0] * (length - pair[1]));
    });

    console.log(finishedAreas);
    // calulate max finished area
    let maxArea = 0;

    finishedAreas.forEach(area => {
        if(area > maxArea){
            maxArea = area;
        }
    })

    return maxArea;
}

console.log(largestRectangle([1,2,3,4,5]));