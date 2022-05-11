// inicializando valores
let showCards = 0;
let card_1 = null;
let card_2 = null;
let firstR = null;
let secondR = null;
let move = 0;
let hit = 0;
let timer = false;
let timerValue = 30;
let endTime = null;


//Apunta al documento html donde se ven los movimientos del jugador
let showMove = document.getElementById("movements");
let showHits = document.getElementById("hits");
let showTime = document.getElementById("time");


// generacion de numeros aleatorios
let number = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
//desordena el array de numeros. Math.random genera numero aleatorios entre 0 y 1
number = number.sort(() => { return Math.random() - 0.5 });
console.log(number);


//funcion para el contador de tiempo
function timerOn() {
    endTime = setInterval(() => {
        //por cada segundo se va restando un numero
        timerValue--;

        //se muestra en el html en cada segundo el contador
        showTime.innerHTML = `Time: ${timerValue} sec`;

        //cundo el contador este en 0 se corta el intervalo de tiempo 
        if (timerValue == 0) {
            clearInterval(endTime);
            blockCard();
        }

    }, 1000);
}


function blockCard() {
    //se recorre el id de los botones para pasarle los numeros del array cuando se termina el tiempo
    for (let i = 0; i <= 15; i++) {
        let cardB = document.getElementById(i);
        cardB.innerHTML = number[i];
        cardB.disabled = true; //desabilita los botones para que no se puedan pulsar cuando se termina el tiempo
    }

    Swal.fire({
        title: 'You lost !!!',
        text: 'time is up',
        imageUrl: './tony-soprano-sopranos.gif',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
    })
}


//cuando se pulsa 1 boton se pasa el id a la funcion meidante el evento -> onclick="show()"
function show(id) {

    if (timer == false) {
        //la funcion que va a activar el contador de  tiempo
        timerOn();
        timer = true; //solo ingresa una vez al if
    }

    showCards++;

    if (showCards == 1) {
        //Mostrar primer numero
        card_1 = document.getElementById(id);// busca el id del boton que se pulso 
        console.log(card_1);
        firstR = number[id]; // [3,4,7,1,3] busca mediante el id un numero en el array desordenado
        //card_1 contiene el id que se selecciono para luego mostrarlo en el html
        card_1.innerHTML = firstR;// se pasa el numero para ser mostrado en el html

        //Deshabilitar primer boton. se usa el metodo disabled. el contador se detiene
        card_1.disabled = true;//solo se puede presionar una vez en boton
        
    } else if (showCards == 2) {
        //Mostrar segundo numero 
        card_2 = document.getElementById(id);
        secondR = number[id];
        card_2.innerHTML = secondR;

        //Deshabilitar el boton
        card_2.disabled = true;

        //incrementa contador de movimientos. guarda la cantidad de intentos para mostrar en el html
        move++;
        showMove.innerHTML = `Movements: ${move}`// lo muestra en el html al contador de movimientos
        
        //compara si las tarjetas son iguales
        if (firstR == secondR) {
            // si hay un acierto el contador se reinicia 
            showCards = 0;

            //cundo hay un acierto se aumenta el contador en el html
            hit++;
            //mustra en el html los aciertos 
            showHits.innerHTML = `Hits: ${hit}`;

            if (hit == 8) {// si se completa el juego se muestra un alert 
                clearInterval(endTime); //desabilita los botones cundo se gana 

                Swal.fire({
                    title: `You win motherfucker !!!`,
                    text: `time: ${30 - timerValue} Sec`,
                    imageUrl: './win-dwight.gif',
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                })
                
            }

        } else {//si los valores no son iguales se tapan. mustra momentaneamente los valores y despues tapa el valor

            //se crea el temporisador para ocultar los numeros cuando hay un error despues de unos segundos
            setTimeout(() => {
                //al espacio del html se le pasa un espacio en blanco para borrar los numeros
                card_1.innerHTML = " ";
                card_2.innerHTML = " ";

                //habilitamos los botones
                card_1.disabled = false;
                card_2.disabled = false;

                //se reinicia el contador para ser utilizado con por los 2 primeros if 
                showCards = 0;
            }, 500);
        }
    }
}

