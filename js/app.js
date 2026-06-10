const galeria = document.getElementById("galeria");
const buscar = document.getElementById("buscar");
let todasLasTarjetas = [];

const modal = document.createElement("div");
modal.id = "modal";
modal.innerHTML = `
  <div id="modal-contenido">
    <button id="modal-cerrar">✕</button>
    <img id="modal-img" src="" alt="">
    <h2 id="modal-nombre"></h2>
    <div id="modal-info"></div>
  </div>
`;
document.body.appendChild(modal);

document.getElementById("modal-cerrar").addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

async function mostrarDetalle(raza, imagen) {
  document.getElementById("modal-img").src = imagen;
  document.getElementById("modal-nombre").textContent = raza;
  document.getElementById("modal-info").innerHTML = "<p>Cargando información...</p>";
  modal.style.display = "flex";

  try {
    const res = await fetch(`https://api.api-ninjas.com/v1/dogs?name=${raza}`, {
      headers: { "X-Api-Key": "NN7F4S1T9nclEGAXi3h8594cy2ir2dpldEWpx57k" }
    });
    const datos = await res.json();

    if (datos.length > 0) {
      const d = datos[0];
      document.getElementById("modal-info").innerHTML = `
        <p><strong>Esperanza de vida:</strong> ${d.min_life_expectancy ?? "?"} - ${d.max_life_expectancy ?? "?"} años</p>
        <p><strong>Peso:</strong> ${d.min_weight_male ?? "?"} - ${d.max_weight_male ?? "?"} kg</p>
        <p><strong>Energía:</strong> ${"⭐".repeat(d.energy ?? 0)}</p>
        <p><strong>Inteligencia:</strong> ${"⭐".repeat(d.trainability ?? 0)}</p>
        <p><strong>Amigable:</strong> ${"⭐".repeat(d.good_with_children ?? 0)}</p>
      `;
    } else {
      document.getElementById("modal-info").innerHTML = "<p>No hay información disponible para esta raza.</p>";
    }
  } catch (error) {
    document.getElementById("modal-info").innerHTML = "<p>No se pudo cargar la información.</p>";
  }
}

async function cargarDatos() {
  galeria.innerHTML = "<p style='color:white;text-align:center;grid-column:1/-1'>Cargando razas...</p>";
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
        <p class="ver-mas">Ver información</p>
      `;

      card.addEventListener("click", () => mostrarDetalle(raza, imagen));
      galeria.appendChild(card);
      todasLasTarjetas.push(card);
    }

  } catch (error) {
    galeria.innerHTML = "<p style='color:#e94560;text-align:center;grid-column:1/-1'>No se pudieron cargar los datos.</p>";
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
