
(() => {
    'use strict'

    let deck             = []

    const letrasCartas   = ['C', 'D', 'H', 'S']

    const especiales     = ['A', 'J', 'Q', 'K']

    let puntosJugador    = 0

    let puntosComputador = 0


    //REFERENCIAS DEL HTML
    var btn1 = document.querySelector('#btn1')
    var btn2 = document.querySelector('#btn2')
    var btn3 = document.querySelector('#btn3')


    const  divCartasJugador = document.querySelector('#jugador-cartas')
    const  divCartasComputador = document.querySelector('#computador-cartas')


    const puntosHTML = document.querySelectorAll('span')

   

    // funcion para crear una nueva baraja cada q pidamos la carta
    function crearDeck(){

        for( let i = 2; i <= 10; i++) {
            for( let letras of letrasCartas){
                deck.push(i + letras);          
            }
        }
        for(let especial of especiales){
            for(let letras of letrasCartas){
                deck.push(especial + letras)
            }
        }
        

        return _.shuffle(deck)
        

    }

    
    //funcion para pedir carta en especifico
    function pedirCarta(){

        if(deck.length === 0) {
            throw 'no hay cartas en el deck'
        }   
        let carta = deck.pop();

        return carta
    }

    //saber el valor de la carta

    function valorCarta(cartaAlDeck){

        const valor = cartaAlDeck.substring(0, cartaAlDeck.length - 1)

        let puntos = 0

        if(isNaN(valor)){
            puntos = 10
        }else{
            puntos = parseInt(valor)
        }

        return puntos
    }

    //TURNO DE LA COMPUTADORA

    function turnoComputadora(puntosMinimos){
        do {
        let miCarta = pedirCarta()

        puntosComputador = puntosComputador + valorCarta(miCarta)
        
        puntosHTML[1].innerText = puntosComputador

        const imgCarta = document.createElement('img')

        imgCarta.src = `assets/cartas/${miCarta}.png`

        divCartasComputador.append(imgCarta)

        imgCarta.classList.add('carta')

            if(puntosMinimos > 21){
                break;
            }

        } while ((puntosComputador < puntosMinimos) && (puntosMinimos <= 21));
        
        setTimeout(() => {
            if(puntosComputador === puntosMinimos){
                alert('nadie gana')
            }else if(puntosMinimos > 21){
                alert("computadora gana")
            }else if(puntosComputador > 21){
                alert("jugador gana")
            }else if(puntosComputador > puntosMinimos){
                alert("pc gana")
            }
        }, 100);
    }

    //EVENTO PEDIR CARTA

    btn2.addEventListener('click', function(){
        let miCarta = pedirCarta()

        puntosJugador = puntosJugador + valorCarta(miCarta)
        
        puntosHTML[0].innerText = puntosJugador

        const imgCarta = document.createElement('img')

        imgCarta.src = `assets/cartas/${miCarta}.png`

        divCartasJugador.append(imgCarta)

        imgCarta.classList.add('carta')

        if (puntosJugador > 21){
            console.log('has perdido')
            btn2.disabled = true // asi puedo deshabilitar un boton o funcion
            btn3.disabled = true
        
            turnoComputadora(puntosJugador)

        }else if(puntosJugador === 21){
            console.log('felicitaciones 21')
            btn2.disabled = true
            btn3.disabled = true
            turnoComputadora(puntosJugador)
        }
    })

    btn3.addEventListener('click', function () {
        btn2.disabled = true
        btn3.disabled = true

        turnoComputadora(puntosJugador)
    })


    btn1.addEventListener('click', function(){

        deck = []
        deck = crearDeck()

        puntosJugador     = 0;
        puntosComputador = 0;
        
        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;

        divCartasComputador.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btn2.disabled   = false;
        btn3.disabled = false;

    })
})();


