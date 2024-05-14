$(document).ready(function(){

    //botones
    var btnNuevaPartida = $('#btn-nueva-partida');
    var btnNuevaPartidaPlantarse = $('#btn-nueva-partida-Plantarse');
    var btnPedirCarta = $('#btn-pedir-carta');
    var btnMostrarCarta = $('#btn-mostrar-carta');
    var btnPlantarse = $('#btn-plantarse');

    //contenedores
    var gameStartContainer = $('#game-start-container');
    var muestraCartaContainer = $('#muestraCartaContainer');
    var plantarPartidaContainer = $('#game-stop-container');
    var gameOverContainer = $('#game-over-container');

    // Variables del juego
    var puntuacionTotal = 0; // Reiniciar puntuación total
    var valoresCartasInventario = {}; // Reiniciar inventario de cartas

    // Función para reiniciar el juego
    function reiniciarJuego() {
        // Resetear puntuación
        puntuacionTotal = 0;

        // Resetear inventario
        valoresCartasInventario = {};

        // Restablecer contenedores
        gameStartContainer.removeClass('d-none'); // Mostrar pantalla de inicio
        plantarPartidaContainer.addClass('d-none'); // Ocultar pantalla de plantarse
        muestraCartaContainer.addClass('d-none'); // Ocultar contenedor de mostrar carta

        // Reactivar botones
        btnPedirCarta.prop("disabled", false);
        btnMostrarCarta.prop("disabled", false);

        // Restablecer la imagen de la carta
        var imagenCarta = $('#muestra-carta-img');
        if (imagenCarta.length > 0) {
            imagenCarta.attr("src", "src/img/baraja-svg/back-1.svg"); // Imagen inicial
        }

        // Actualizar la puntuación en pantalla
        var puntuacionElemento = $('#puntuacion');
        if (puntuacionElemento.length > 0) {
            puntuacionElemento.text("Puntuación: 0");
        }
    }

// Nueva partida
btnNuevaPartida.click(function() {
    reiniciarJuego(); // Llama a la función para reiniciar el juego
    gameStartContainer.toggleClass('d-none');   
    plantarPartidaContainer.addClass('d-none');
    
});

// Nueva partida
btnNuevaPartidaPlantarse.click(function() {
    reiniciarJuego(); // Llama a la función para reiniciar el juego
    plantarPartidaContainer.addClass('d-none');
    
});


    // PLANTARSE
    btnPlantarse.click(function(){
        plantarPartidaContainer.toggleClass('d-none'); 
    });

    // PEDIR CARTA
    btnPedirCarta.click(function(){
        muestraCartaContainer.removeClass('d-none');
    });


    // MOSTRAR CARTA
    btnMostrarCarta.click(function(){

        muestraCartaContainer.removeClass('d-none');

        // Ocultar el contenedor después de cierto tiempo
        setTimeout(function() {
            muestraCartaContainer.addClass('d-none');
        }, 3000); // 3000 milisegundos = 3 segundos
    });

    

    // GAME OVER






})