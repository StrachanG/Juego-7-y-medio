document.addEventListener("DOMContentLoaded", function() {

  // Lo primero en un juego de cartas es presentar las cartas de la baraja. (1)
  // Para empezar definimos en un array las rutas de las imágenes de las cartas del juego, en este caso solo copas.

  const cartasCopas: string[] = [
      "src/img/baraja-svg/1_as-copas.svg",
      "src/img/baraja-svg/2_dos-copas.svg",
      "src/img/baraja-svg/3_tres-copas.svg",
      "src/img/baraja-svg/4_cuatro-copas.svg",
      "src/img/baraja-svg/5_cinco-copas.svg",
      "src/img/baraja-svg/6_seis-copas.svg",
      "src/img/baraja-svg/7_siete-copas.svg",
      "src/img/baraja-svg/10_sota-copas.svg",
      "src/img/baraja-svg/11_caballo-copas.svg",
      "src/img/baraja-svg/12_rey-copas.svg",
  ];
  // Además definimos en otro array el valor de estas cartas.
  const valoresCartas: { [rutaImagen: string]: number } = {
      "src/img/baraja-svg/back-1.svg": 0, // Valor para la carta de la parte trasera (0 puntos)
      "src/img/baraja-svg/1_as-copas.svg": 1,
      "src/img/baraja-svg/2_dos-copas.svg": 2,
      "src/img/baraja-svg/3_tres-copas.svg": 3,
      "src/img/baraja-svg/4_cuatro-copas.svg": 4,
      "src/img/baraja-svg/5_cinco-copas.svg": 5,
      "src/img/baraja-svg/6_seis-copas.svg": 6,
      "src/img/baraja-svg/7_siete-copas.svg": 7,
      "src/img/baraja-svg/10_sota-copas.svg": 0.5, // Las figuras valen medio punto
      "src/img/baraja-svg/11_caballo-copas.svg": 0.5,
      "src/img/baraja-svg/12_rey-copas.svg": 0.5,
    };
    // Creamos una función para obtener el valor de la carta de copas basado en su ruta de imagen
  function obtenerValorCarta(rutaImagen: string): number | undefined {
      return valoresCartas[rutaImagen];
  }
  // Para llevar un sumatorio de la puntuación del jugador, creamos el inventario de cartas (2)
  const valoresCartasInventario: { [rutaImagen: string]: number } = {};
  
  // Creamos una función para actualizar la puntuación total que contendrá diferentes elementos (4)
  function actualizarPuntuacionTotal(): void {
  
      // Creamos una variable llamada puntuacionTotal y la inicializamos con un valor '0'.
      // Representa la suma total de puntos acumulador por el jugador.
      let puntuacionTotal = 0;

      // Definimos un elemento <div> del html que mostrará la puntuación del jugador (3)
      const puntuacionElemento = document.getElementById("puntuacion");

          // Sumar los valores de todas las cartas en el inventario-

      // bucle for...in que itera sobre todas las claves (keys) del objeto valoresCartasInventario.
      for (const rutaImagen in valoresCartasInventario) {
          // El condicional if verifica si el objeto valoresCartasInventario tiene su propia propiedad llamada rutaImagen.
          if (valoresCartasInventario.hasOwnProperty(rutaImagen)) {
              // El propósito de este bucle es calcular la suma total de los valores de las cartas almacenadas en valoresCartasInventario.
              puntuacionTotal += valoresCartasInventario[rutaImagen];
          }
      }

          // Verifica si puntuacionElemento es un objeto válido. Si es null o undefined, el bloque de código no se ejecutará.
          if (puntuacionElemento) {
          // Usa la propiedad innerText para cambiar el texto que se muestra dentro del elemento HTML.
          // "Puntuación total: " se concatena con el valor de puntuacionTotal, para mostrar el resultado en pantalla.
          puntuacionElemento.innerText = "Puntuación total: " + puntuacionTotal;
      }

  }
  
  // Hasta este punto he definido las cartas del juego y les he asignado valores. 
  // Esto permite realizar cálculos y operaciones basadas en esos valores durante el juego la baraja de cartas (1), 
  // hemos creado un inventario de cartas donde se pueden agregar las cartas y llevar un sumatorio del valor de las cartas del invetario (2),
  // también hemos definido un elemento <div> del html que mostrará la puntuación del jugador, inicializando en '0' (3),
  // función para actualizar la puntuación total en el elemento <div> (4), 




      // Una vez tenemos creado todo este contexto, Vamos a definir todo el conjunto variables y funciones que 
      // proviene de la acción del usuario



// Para empezar vamos a hacerlo creando una variable que seleccione una carta aleatoria y secreta cuando se le pida.

    let cartaSeleccionada: string = ""; // Variable global para mantener la carta seleccionada en secreto
    
    // Vamos a crear una función para seleccionar una carta aleatoria y mantenerla en secreto.
      // Luego habrá que definir el botón que realice esta función, lo haremos mas adelante.
    function pedirCarta(): void {
      // Seleccionar una carta aleatoria del array
      cartaSeleccionada = cartasCopas[Math.floor(Math.random() * cartasCopas.length)];
      console.log("Carta seleccionada en secreto:", cartaSeleccionada); // Solo para verificar en la consola
    
      // Establece la ruta de la imagen para mostrar la parte trasera de una carta (a modo de ocultación). 
      // Esto puede ser útil para "limpiar" o restablecer la imagen antes de mostrar una carta real 
      // o cuando se quiere ocultar la carta que se mostró anteriormente.
      const imagenCarta = document.getElementById("muestra-carta-img") as HTMLImageElement;
      if (imagenCarta) {
        imagenCarta.setAttribute("src", "src/img/baraja-svg/back-1.svg"); // Limpiar la imagen
      }
    }
    // Una vez tenemos la carta seleccionada oculta, mostrando la parte trasera, 
    // voy a crear una función para mostrar la carta seleccionada en secreto.
      // Luego habrá que definir el botón que realice esta función, lo haremos mas adelante.
    function mostrarCarta(): void {
      // busca obtener el elemento HTML con el ID "muestra-carta-img". 
      // Al hacer un "casting" a HTMLImageElement, el código asume que el elemento es una imagen 
      // y que se pueden usar métodos y propiedades relacionados con imágenes, como setAttribute("src", ...).
      const imagenCarta = document.getElementById("muestra-carta-img") as HTMLImageElement;
      // El condicional if (imagenCarta && cartaSeleccionada) verifica dos cosas:
          // Que imagenCarta no sea null o undefined, es decir, que el elemento exista en el DOM. 
              // Esto evita errores al intentar modificar un elemento que no está presente.
          // Que cartaSeleccionada tenga un valor asignado, lo cual significa que hay una carta lista para mostrar.
      if (imagenCarta && cartaSeleccionada) {
        imagenCarta.setAttribute("src", cartaSeleccionada);
      }
    }    
  // También tengo que crear una función que muestre la puntuación del jugador en el <div> que mostrará la puntuación
    function muestraPuntuacion(puntuacion: number): void {
      // Obtenemos el <div> donde queremos mostrar la puntuación en pantalla
      const puntuacionElemento = document.getElementById("puntuacion");
      if (puntuacionElemento) {
        puntuacionElemento.innerText = "Puntuación: " + puntuacion;
      }
    }

  // También tengo que crear una función que muestre la puntuación del jugador en el <div> al final del juego
  function muestraPuntuacion2(puntuacionTotal: number): void {
    // Obtenemos el <div> donde queremos mostrar la puntuación en pantalla
    const muestraPuntuacion2 = document.getElementById("puntuacion-plantarse");  
    // El condicional garantiza que el código solo intente actualizar la puntuación si el elemento existe.

    if (muestraPuntuacion2) {
      muestraPuntuacion2.innerText = "Puntuación: " + puntuacionTotal;
    }
  }




    // Ahora vamos a crear el botón pedir carta. 
    // Y vamos a definir todos los eventos que se activan al hacer clic en él.
      // Para ello buscamos el boton con id "btn-pedir-carta".  
    const btnPedirCarta = document.getElementById("btn-pedir-carta");
    // Si el condicional es verdadero, entonces el código dentro del bloque de if se ejecuta. 
    // Aquí, se usa addEventListener("click", ...) para agregar dos acciones al botón:
      // Llamar a la función pedirCarta(), que se encarga de seleccionar y ocultar una carta del mazo.
      // Llamar a muestraPuntuacion(obtenerValorCarta(cartaSeleccionada)), para mostrar 
          // la puntuación basada en el valor de la carta seleccionada.
    if (btnPedirCarta) {
      btnPedirCarta.addEventListener("click", () => {
        pedirCarta();
        muestraPuntuacion(obtenerValorCarta(cartaSeleccionada));
      });
    }
    // Ahora vamos a crear el botón mostrar carta.       
    // Y vamos a definir todos los eventos que se activan al hacer clic en él.
      // Para ello buscamos el boton con id "btn-mostrar-carta".
  const btnMostrarCarta = document.getElementById("btn-mostrar-carta");
  // Si el condicional es verdadero, entonces el código dentro del bloque de if se ejecuta. 
    // Aquí, se usa addEventListener("click", ...) para llamar a la funcion mostrarCarta().
  if (btnMostrarCarta) {
    btnMostrarCarta.addEventListener("click", () => {
      // Mostrar la carta al usuario
      mostrarCarta();
      // Obtener la URL de la carta mostrada
      const urlCartaMostrada = cartaSeleccionada;

// Este bloque de código realiza varias operaciones para agregar una carta a un inventario visual, 
// y realiza controles para manejar escenarios en los que el inventario esté lleno
// o el elemento que representa el inventario no exista.
  
      // Se busca el elemento HTML que representa el contenedor del inventario de cartas
      const inventarioCartas = document.querySelector(".dashboard-cards-main");

      if (inventarioCartas) {
          // Si el inventario existe, se obtienen todas las imágenes de cartas dentro del inventario en imagenesCartas
        const imagenesCartas = inventarioCartas.querySelectorAll(".card-img");

        let cartaEncontrada = false;
        // El bucle for itera sobre todas las imágenes (imagenesCartas) para buscar un lugar vacío (una carta con src vacío o alt como "carta-oculta").
        for (let i = 0; i < imagenesCartas.length; i++) {
          const img = imagenesCartas[i] as HTMLImageElement;
          // si se encuentra un espacio vacío o un alt "carta-oculta", se realiza lo siguiente:
          if (img.src === "" || img.alt === "carta-oculta") {
            img.src = urlCartaMostrada; // Asignar la URL de la carta mostrada a la imagen.
            img.alt = ""; // Remover la indicación de carta oculta 
            img.classList.remove("d-hidden"); // Eliminar la clase d-hidden para mostrar la carta
            valoresCartasInventario[urlCartaMostrada] = obtenerValorCarta(urlCartaMostrada); // Agregar el valor de la carta al inventario 
            actualizarPuntuacionTotal(); // Actualizar la puntuación total
            cartaEncontrada = true; // Se marca que se encontró un lugar para la carta (cartaEncontrada = true;).
            break; // y se interrumpe el bucle con break;.
          }
        }
        if (!cartaEncontrada) { // Si no encuentra un lugar para agregar la carta, mostrará un mensaje al usuario indicando que su inventario está lleno.
          console.log("El inventario de cartas está lleno. No se puede agregar más cartas.");
        }
      } else { // Si inventarioCartas no existe, se imprime un mensaje en la consola indicando que no se encontró el contenedor del inventario.
        console.log("No se encontró el contenedor del inventario de cartas.");
      }
    });
  }


  // Ahora vamos a crear el botón plantarse.       
    // Y vamos a definir todos los eventos que se activan al hacer clic en él.
      // Para ello buscamos el boton con id "btn-plantarse".
  const btnPlantarse = document.getElementById("btn-plantarse");
  if (btnPlantarse) {
      btnPlantarse.addEventListener("click", () => {
          // Calcular la puntuación total actual
          actualizarPuntuacionTotal();
          // Desactivar los botones de "Pedir carta" y "Mostrar carta" después de plantarse
          // Verificar si btnPedirCarta y btnMostrarCarta están definidos para evitar errores
        const btnPedirCarta = document.getElementById("btn-pedir-carta");
        const btnMostrarCarta = document.getElementById("btn-mostrar-carta");

        if (btnPedirCarta) {
            btnPedirCarta.disabled = true;
        }

        if (btnMostrarCarta) {
            btnMostrarCarta.disabled = true;
        }
  
  
          // Mostrar mensaje según la puntuación
  const puntuacionElemento = document.getElementById("puntuacion");
  if (puntuacionElemento) {
      const puntuacionTexto = puntuacionElemento.innerText.replace("Puntuación total: ", "");
      const puntuacion = parseFloat(puntuacionTexto);
      let mensaje = "";
      if (puntuacion < 4) {
          mensaje = "Has sido muy conservador.";
      } else if (puntuacion === 5) {
          mensaje = "Te ha entrado el canguelo eh?";
      } else if (puntuacion >= 6 && puntuacion <= 7) {
          mensaje = "Casi casi...";
      } else if (puntuacion === 7.5) {
          mensaje = "¡Lo has clavado! ¡Enhorabuena!";
      }
  


      // Mostrar el mensaje en el contenedor "texto-plantarse"
      const textoPlantarseElemento = document.getElementById("texto-plantarse");
      if (textoPlantarseElemento) {
          textoPlantarseElemento.innerText = mensaje;
      }
  }
          
      });
  }

})