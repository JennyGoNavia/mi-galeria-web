const galeria = document.getElementById("galeria");
const buscar = document.getElementById("buscar");
let todasLasTarjetas = [];

async function cargarDatos() {
  galeria.innerHTML = "<p style='color:white;text-align:center'>Cargando razas...</p>";
  todasLasTarjetas = [];

  try {
    const res = await fetch("https://dog.ceo/api/breeds/list/all");
    if (!res.ok) throw new Error("Error " + res.status);

    const datos = await res.json();
    const razas = Object.keys(datos.message);

    galeria.innerHTML = "";

    for (const raza of razas.slice(0, 20)) {
      const imgRes = await fetch(`https://dog.ceo/api/breed/${raza}/images/random`);
      if (!imgRes.ok) continue;

      const imgDatos = await imgRes.json();
      const imagen = imgDatos.message;

      if (!imagen) continue;

      const card = document.createElement("article");
      card.className = "tarjeta";
      card.innerHTML = `
        <img src="${imagen}" alt="Foto de raza ${raza}">
        <h3>${raza}</h3>
      `;

      galeria.appendChild(card);
      todasLasTarjetas.push(card);
    }

  } catch (error) {
    galeria.innerHTML = "<p style='color:#e94560;text-align:center'>No se pudieron cargar los datos. Intenta de nuevo.</p>";
    console.error(error);
  }
}

buscar.addEventListener("input", () => {
  const termino = buscar.value.toLowerCase();
  todasLasTarjetas.forEach(card => {
    const nombre = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = nombre.includes(termino) ? "block" : "none";
  });
});

document.getElementById("cargar").addEventListener("click", cargarDatos);