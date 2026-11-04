// Diccionario que vincula el ID del input con su respuesta correcta
const respuestasCorrectas = {
    "casilla1": "vesicula seminal",
    "casilla2": "prostata" // Es recomendable evitar tildes en la validación base o aplicar una función para removerlas
};

function comprobarRespuestas() {
    // Iterar sobre cada clave del diccionario
    for (let idCasilla in respuestasCorrectas) {
        
        let input = document.getElementById(idCasilla);
        // Normalización: pasar a minúsculas y quitar espacios en los bordes
        let respuestaUsuario = input.value.trim().toLowerCase();
        let respuestaReal = respuestasCorrectas[idCasilla];

        // Reiniciar las clases por si el usuario se equivocó y está intentando de nuevo
        input.classList.remove("correcto", "incorrecto");

        // Validar si hay texto y si coincide
        if (respuestaUsuario === respuestaReal) {
            input.classList.add("correcto");
        } else if (respuestaUsuario !== "") {
            input.classList.add("incorrecto");
        }
    }
}