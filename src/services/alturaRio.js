let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, '0'); // Se agrega 1 al mes ya que en JavaScript los meses van de 0 a 11
let day = String(today.getDate()).padStart(2, '0');


let formattedDate = `${year}-${month}-${day}`;

let valor = 0
let estadisticas = document.getElementById("estadisticas")

const url = `https://alerta.ina.gob.ar/pub/datos/datos&timeStart=2023-09-25&timeEnd=${formattedDate}&seriesId=81&format=json`;
fetch(url)
    .then((response) => response.json())
    .then((info) => {
        const json = info.data;
        let ultimoElemento = json[json.length - 1];

        let tarjeta = document.createElement("div")
        tarjeta.classList.add("card")
        tarjeta.style.width = "18rem";

        let cardBody = document.createElement("div")
        cardBody.classList.add("card-body")

        let titulo = document.createElement("h5")
        titulo.classList.add("card-title")
        titulo.innerText = "Altura del Río Uruguay"

        let descripcion = document.createElement("p")
        descripcion.classList.add("card-text")
        descripcion.innerText = ultimoElemento.valor

        let fecha = document.createElement("p")
        fecha.classList.add("card-dia")
        fecha.innerText = formattedDate

        cardBody.appendChild(titulo)
        cardBody.appendChild(descripcion)
        cardBody.appendChild(fecha)
        tarjeta.appendChild(cardBody)
        estadisticas.appendChild(tarjeta)

    })
    fetch(url)
    .then((response) => response.json())
    .then((info) => {
        const json = info.data;
        let ultimoElemento = json[json.length - 1];

        // Almacenar el valor en localStorage
        localStorage.setItem('alturaRio', ultimoElemento.valor);

        // Resto del código para mostrar la información en la tarjeta
        let tarjeta = document.createElement("div")
        // ... Resto del código ...
    });
    let alturaRio = localStorage.getItem('alturaRio') || 0;

// Puedes utilizar 'alturaRio' en toda la barra de navegación o en cualquier lugar necesario.
// Por ejemplo, puedes asignarlo a un elemento en el DOM.
document.getElementById("alturaRioNavBar").innerText = `Altura del Río: ${alturaRio}`;