// 1. Definición de niveles y sus respuestas
const niveles = [
    {
        imagen: "./imagenes/Screenshot 2026-11-03 203457.png", 
        casillas: [
            { id: "c1", top: "20%", left: "78%", respuesta: "vesícula seminal" },
            { id: "c2", top: "40%", left: "76%", respuesta: "próstata" } // Ahora puedes poner tildes aquí si quieres
        ]
    },
    {
        imagen: "./imagenes/nivel2.png", 
        casillas: [
            { id: "c1", top: "10%", left: "80%", respuesta: "Uretra" },
        ]
    }
];

let nivelActual = 0;

// 2. Función para normalizar texto (quita tildes)
function quitarTildes(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// 3. Función para armar el nivel en pantalla
function cargarNivel() {
    const datosNivel = niveles[nivelActual];
    
    // Actualizar título e imagen
    document.getElementById("texto-nivel").innerText = "Nivel " + (nivelActual + 1) + " de " + niveles.length;
    document.getElementById("imagen-base").src = datosNivel.imagen;
    
    // Limpiar casillas anteriores
    const contenedor = document.getElementById("contenedor-casillas");
    contenedor.innerHTML = ""; 

    // Crear nuevas casillas
    datosNivel.casillas.forEach(datosCasilla => {
        let input = document.createElement("input");
        input.type = "text";
        input.id = datosCasilla.id;
        input.className = "input-respuesta";
        input.placeholder = "?";
        
        // Aplicar posiciones
        input.style.top = datosCasilla.top;
        input.style.left = datosCasilla.left;
        
        contenedor.appendChild(input);
    });
}

// 4. Función de validación
function comprobarRespuestas() {
    const datosNivel = niveles[nivelActual];
    let todasCorrectas = true;

    datosNivel.casillas.forEach(datosCasilla => {
        let input = document.getElementById(datosCasilla.id);
        
        // Obtener texto, limpiar espacios y pasarlo a minúsculas
        let textoUsuario = input.value.trim().toLowerCase();
        
        // Quitar tildes a ambas versiones para compararlas justamente
        let respuestaUsuarioLimpia = quitarTildes(textoUsuario);
        let respuestaRealLimpia = quitarTildes(datosCasilla.respuesta.toLowerCase());
        
        input.classList.remove("correcto", "incorrecto");

        if (respuestaUsuarioLimpia === respuestaRealLimpia) {
            input.classList.add("correcto");
        } else {
            input.classList.add("incorrecto");
            todasCorrectas = false; 
        }
    });

    // 5. Avanzar de nivel si todo está bien
    if (todasCorrectas) {
        setTimeout(() => {
            nivelActual++; 
            if (nivelActual < niveles.length) {
                alert("¡Perfecto! Pasando al siguiente nivel...");
                cargarNivel();
            } else {
                alert("¡Felicidades, completaste todos los niveles!");
                // Opcional: volver al inicio
                nivelActual = 0;
                cargarNivel();
            }
        }, 500); 
    }
}

// Arrancar el primer nivel
cargarNivel();