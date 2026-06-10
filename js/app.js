const galeria        = document.getElementById("galeria");
const buscar         = document.getElementById("buscar");
const totalRazas     = document.getElementById("total-razas");
const paginaActualTexto = document.getElementById("pagina-actual");
const btnAnterior    = document.getElementById("anterior");
const btnSiguiente   = document.getElementById("siguiente");
const infoPaginacion = document.getElementById("info-paginacion");
const bienvenida     = document.getElementById("bienvenida");
const btnCargar      = document.getElementById("cargar");

let favoritos      = [];
let datosOriginales = [];
let datosFiltrados  = [];
let paginaActual    = 1;
const tarjetasPorPagina = 8;

/* =========================
   DESCRIPCIONES
========================= */
const descripciones = {
  affenpinscher: "Perro pequeño, curioso y muy activo.",
  african:       "Raza atlética y resistente.",
  airedale:      "Terrier inteligente y muy energético.",
  akita:         "Perro fuerte, leal y protector.",
  appenzeller:   "Raza trabajadora y muy obediente.",
  australian:    "Perro pastor inteligente y activo.",
  basenji:       "Raza silenciosa y muy independiente.",
  beagle:        "Perro amigable con excelente olfato.",
  bluetick:      "Raza cazadora muy resistente.",
  borzoi:        "Perro elegante, tranquilo y veloz.",
  bouvier:       "Perro fuerte utilizado para pastoreo.",
  boxer:         "Raza juguetona, leal y protectora.",
  brabancon:     "Perro pequeño, inteligente y muy cariñoso.",
  briard:        "Perro pastor protector y obediente.",
  bulldog:       "Raza tranquila y muy amigable.",
  bullterrier:   "Perro fuerte, energético y leal.",
  cairn:         "Terrier pequeño y muy activo.",
  chihuahua:     "Raza pequeña, valiente y energética.",
  chow:          "Perro tranquilo con abundante pelaje.",
  clumber:       "Spaniel calmado y muy amigable.",
  cockapoo:      "Cruza inteligente y sociable.",
  collie:        "Perro pastor muy inteligente.",
  coonhound:     "Raza cazadora resistente y rápida.",
  corgi:         "Perro pequeño utilizado para pastoreo.",
  dachshund:     "Perro pequeño de cuerpo alargado.",
  dalmatian:     "Raza atlética y llena de energía.",
  dane:          "Gran perro elegante y amistoso.",
  deerhound:     "Perro alto y muy veloz.",
  dhole:         "Canino salvaje muy resistente.",
  dingo:         "Perro salvaje originario de Australia.",
  doberman:      "Raza inteligente y protectora.",
  elkhound:      "Perro fuerte adaptado al frío.",
  eskimo:        "Raza resistente utilizada para nieve.",
  finnish:       "Perro activo y muy amigable.",
  frise:         "Perro pequeño y cariñoso.",
  german:        "Raza fuerte y protectora.",
  greyhound:     "Perro extremadamente rápido y elegante.",
  groenendael:   "Pastor belga inteligente y protector.",
  havanese:      "Raza pequeña y muy sociable.",
  hound:         "Perro utilizado tradicionalmente para caza.",
  husky:         "Perro resistente criado para nieve.",
  keeshond:      "Perro amigable y muy peludo.",
  kelpie:        "Perro pastor activo e inteligente.",
  komondor:      "Raza protectora con pelaje característico.",
  kuvasz:        "Perro guardián fuerte y leal.",
  labrador:      "Raza amistosa ideal para familias.",
  leonberg:      "Perro gigante y muy tranquilo.",
  lhasa:         "Perro pequeño criado como guardián.",
  malamute:      "Raza fuerte utilizada para trineos.",
  malinois:      "Perro policía muy inteligente.",
  maltese:       "Perro pequeño y cariñoso.",
  mastiff:       "Raza gigante, tranquila y protectora.",
  mexicanhairless: "Perro sin pelo originario de México.",
  mountain:      "Perro fuerte adaptado a montañas.",
  newfoundland:  "Raza grande excelente nadadora.",
  otterhound:    "Perro cazador amigable y activo.",
  papillon:      "Perro pequeño con orejas características.",
  pekinese:      "Raza pequeña y elegante.",
  pembroke:      "Corgi inteligente y muy sociable.",
  pinscher:      "Perro activo y protector.",
  pitbull:       "Raza fuerte, atlética y leal.",
  pointer:       "Perro cazador rápido y obediente.",
  pomeranian:    "Perro pequeño y muy energético.",
  poodle:        "Raza extremadamente inteligente.",
  pug:           "Perro pequeño y muy cariñoso.",
  pyrenees:      "Perro grande utilizado para protección.",
  redbone:       "Raza cazadora muy resistente.",
  retriever:     "Perro amistoso y obediente.",
  ridgeback:     "Raza atlética y protectora.",
  rottweiler:    "Perro fuerte y excelente guardián.",
  saluki:        "Perro elegante y muy veloz.",
  samoyed:       "Raza amigable con abundante pelaje.",
  schipperke:    "Perro pequeño y muy activo.",
  schnauzer:     "Raza inteligente y protectora.",
  setter:        "Perro cazador elegante y rápido.",
  shepherd:      "Perro pastor muy inteligente.",
  shiba:         "Raza japonesa independiente y activa.",
  shihtzu:       "Perro pequeño y muy cariñoso.",
  spaniel:       "Raza amigable y muy sociable.",
  springer:      "Perro activo utilizado para caza.",
  stbernard:     "Perro gigante, tranquilo y protector.",
  terrier:       "Raza activa y muy energética.",
  vizsla:        "Perro atlético y muy leal.",
  weimaraner:    "Raza elegante y muy activa.",
  whippet:       "Perro rápido y muy tranquilo.",
  wolfhound:     "Perro gigante y amistoso."
};

/* =========================
   LISTAS DE CATEGORÍAS
========================= */
const razasPequeñas = new Set([
  "affenpinscher", "beagle", "bluetick", "brabancon", "cairn",
  "chihuahua", "cockapoo", "corgi", "dachshund", "eskimo",
  "frise", "havanese", "lhasa", "maltese", "papillon",
  "pekinese", "pembroke", "pinscher", "pomeranian", "poodle",
  "pug", "schipperke", "shihtzu", "terrier", "basenji"
]);

const razasGrandes = new Set([
  "african", "akita", "appenzeller", "australian", "borzoi",
  "bouvier", "boxer", "briard", "bulldog", "bullterrier",
  "clumber", "collie", "coonhound", "dane", "deerhound",
  "doberman", "elkhound", "german", "greyhound", "groenendael",
  "hound", "husky", "keeshond", "kelpie", "komondor",
  "kuvasz", "labrador", "leonberg", "malamute", "malinois",
  "mastiff", "mexicanhairless", "mountain", "newfoundland",
  "otterhound", "pitbull", "pointer", "pyrenees", "redbone",
  "retriever", "ridgeback", "rottweiler", "saluki", "samoyed",
  "schnauzer", "setter", "shepherd", "springer", "stbernard",
  "vizsla", "weimaraner", "whippet", "wolfhound"
]);

/* =========================
   MENU MOVIL
========================= */
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("menu").classList.toggle("activo");
});

/* =========================
   MODAL
========================= */
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

/* =========================
   HELPERS: mostrar / ocultar secciones
========================= */
function mostrarVista(tipo) {
  bienvenida.style.display     = tipo === "inicio"  ? "block" : "none";
  btnCargar.style.display      = tipo === "inicio"  ? "block" : "none";
  galeria.style.display        = tipo === "galeria" ? "grid"  : (tipo === "acerca" ? "flex" : "none");
  infoPaginacion.style.display = tipo === "galeria" ? "flex"  : "none";
}

/* =========================
   MODAL DETALLE
========================= */
async function mostrarDetalle(raza, imagen) {
  document.getElementById("modal-img").src = imagen;
  document.getElementById("modal-nombre").textContent = raza;
  document.getElementById("modal-info").innerHTML = "<p>Cargando información...</p>";
  modal.style.display = "flex";

  try {
    const res   = await fetch(`https://dog.ceo/api/breed/${raza}/images`);
    if (!res.ok) throw new Error("Error " + res.status);
    const datos = await res.json();
    const fotos = datos.message.slice(0, 3);
    const esFavorito = favoritos.includes(raza);

    document.getElementById("modal-info").innerHTML = `
      <p><strong>Raza:</strong> ${raza}</p>
      <p><strong>Total imágenes:</strong> ${datos.message.length}</p>
      <button id="btn-favorito" style="
        margin-top:12px; padding:10px 14px; border:none;
        border-radius:10px; background:var(--acc); color:white;
        cursor:pointer; font-weight:600; font-family:inherit;
      ">
        ${esFavorito ? "❤️ Quitar favorito" : "🤍 Agregar favorito"}
      </button>
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin-top:14px;">
        ${fotos.map(foto => `
          <img src="${foto}" alt="Foto de ${raza}"
            style="width:100%; height:90px; object-fit:cover; border-radius:10px;">
        `).join("")}
      </div>
    `;

    document.getElementById("btn-favorito").addEventListener("click", () => {
      if (favoritos.includes(raza)) {
        favoritos = favoritos.filter(r => r !== raza);
      } else {
        favoritos.push(raza);
      }
      mostrarDetalle(raza, imagen);
    });

  } catch {
    document.getElementById("modal-info").innerHTML = "<p>Error cargando información.</p>";
  }
}

/* =========================
   MOSTRAR PÁGINA
========================= */
function mostrarPagina() {
  mostrarVista("galeria");
  galeria.innerHTML = "";

  const inicio      = (paginaActual - 1) * tarjetasPorPagina;
  const fin         = inicio + tarjetasPorPagina;
  const datosPagina = datosFiltrados.slice(inicio, fin);

  if (datosPagina.length === 0) {
    galeria.style.display = "flex";
    galeria.style.justifyContent = "center";
    galeria.innerHTML = `<p style="color:var(--texto-suave); padding:2rem;">No se encontraron razas.</p>`;
    return;
  }

  galeria.style.justifyContent = "";

  datosPagina.forEach(item => {
    const card = document.createElement("article");
    card.className = "tarjeta";
    card.innerHTML = `
      <img src="${item.imagen}" alt="Foto de ${item.raza}">
      <h3>${item.raza}</h3>
      <p class="descripcion">${item.descripcion}</p>
      <p class="ver-mas">Ver información</p>
    `;
    card.addEventListener("click", () => mostrarDetalle(item.raza, item.imagen));
    galeria.appendChild(card);
  });

  totalRazas.textContent        = `Total de razas: ${datosFiltrados.length}`;
  paginaActualTexto.textContent = `Página ${paginaActual}`;
}

/* =========================
   CARGAR DATOS
========================= */
async function cargarDatos() {
  mostrarVista("galeria");
  galeria.style.display = "flex";
  galeria.style.justifyContent = "center";
  galeria.innerHTML = "<p style='color:var(--texto-suave); padding:2rem;'>Cargando razas… 🐾</p>";

  try {
    const res   = await fetch("https://dog.ceo/api/breeds/list/all");
    if (!res.ok) throw new Error("Error " + res.status);
    const datos = await res.json();

    const razas         = Object.keys(datos.message);
    const primerasRazas = razas.slice(0, 60);

    const promesas = primerasRazas.map(async (raza) => {
      try {
        const imgRes   = await fetch(`https://dog.ceo/api/breed/${raza}/images/random`);
        if (!imgRes.ok) return null;
        const imgDatos = await imgRes.json();
        return {
          raza,
          imagen:      imgDatos.message,
          descripcion: descripciones[raza]
            || `El ${raza} es una raza reconocida por su personalidad única y apariencia especial.`
        };
      } catch {
        return null;
      }
    });

    const resultados = await Promise.all(promesas);
    datosOriginales  = resultados.filter(item => item !== null);
    datosFiltrados   = datosOriginales;
    paginaActual     = 1;

    galeria.style.justifyContent = "";
    mostrarPagina();

  } catch {
    galeria.innerHTML = "<p style='color:red; padding:2rem;'>Error cargando datos. Intenta de nuevo.</p>";
  }
}

/* =========================
   PAGINACIÓN
========================= */
btnSiguiente.addEventListener("click", () => {
  const totalPaginas = Math.ceil(datosFiltrados.length / tarjetasPorPagina);
  if (paginaActual < totalPaginas) {
    paginaActual++;
    mostrarPagina();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

btnAnterior.addEventListener("click", () => {
  if (paginaActual > 1) {
    paginaActual--;
    mostrarPagina();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

/* =========================
   BUSCADOR
========================= */
buscar.addEventListener("input", () => {
  const termino  = buscar.value.toLowerCase().trim();
  datosFiltrados = datosOriginales.filter(item =>
    item.raza.toLowerCase().includes(termino)
  );
  paginaActual = 1;
  if (datosOriginales.length > 0) mostrarPagina();
});

/* =========================
   NAVEGACIÓN: INICIO
========================= */
document.getElementById("inicio-link").addEventListener("click", (e) => {
  e.preventDefault();
  mostrarVista("inicio");
});

/* =========================
   NAVEGACIÓN: CATEGORÍAS
========================= */
document.querySelectorAll(".categoria-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    if (datosOriginales.length === 0) {
      alert("Primero carga las razas usando el botón 'Ver razas'.");
      return;
    }

    const texto = link.textContent.toLowerCase();
    let etiqueta = "";

    if (texto.includes("pequeñas")) {
      datosFiltrados = datosOriginales.filter(item =>
        razasPequeñas.has(item.raza)
      );
      etiqueta = "🐩 Razas pequeñas";

    } else if (texto.includes("grandes")) {
      datosFiltrados = datosOriginales.filter(item =>
        razasGrandes.has(item.raza)
      );
      etiqueta = "🐕 Razas grandes";

    } else if (texto.includes("favoritos")) {
      datosFiltrados = datosOriginales.filter(item =>
        favoritos.includes(item.raza)
      );
      etiqueta = "❤️ Favoritos";

      if (datosFiltrados.length === 0) {
        mostrarVista("galeria");
        galeria.style.display = "flex";
        galeria.style.justifyContent = "center";
        galeria.innerHTML = `
          <p style="color:var(--texto-suave); padding:2rem; text-align:center; line-height:2;">
            Aún no tienes favoritos.<br>
            Haz clic en una tarjeta y agrégala. ❤️
          </p>`;
        infoPaginacion.style.display = "none";
        return;
      }
    }

    // Mostrar etiqueta activa en el contador
    totalRazas.textContent = `${etiqueta} · ${datosFiltrados.length} razas`;

    paginaActual = 1;
    mostrarPagina();

    // Sobrescribir el texto que puso mostrarPagina() con la etiqueta de categoría
    totalRazas.textContent = `${etiqueta} · ${datosFiltrados.length} razas`;
  });
});

/* =========================
   NAVEGACIÓN: ACERCA
========================= */
document.getElementById("acerca-link").addEventListener("click", (e) => {
  e.preventDefault();
  mostrarVista("acerca");
  galeria.style.justifyContent = "center";
  galeria.innerHTML = `
    <article style="
      background:white; color:#111827; padding:3rem;
      border-radius:24px; max-width:750px; width:100%;
      text-align:center; line-height:1.8;
      box-shadow:0 10px 30px rgba(0,0,0,.08);
    ">
      <h2 style="color:var(--acc); margin-bottom:1rem;">🐶 Acerca del Proyecto</h2>
      <p>Aplicación desarrollada con HTML, CSS y JavaScript.</p>
      <br>
      <p>Consume información desde la API pública Dog CEO.</p>
      <br>
      <p>Incluye categorías, favoritos, buscador y paginación.</p>
    </article>
  `;
});

/* =========================
   BOTÓN PRINCIPAL: CARGAR
========================= */
btnCargar.addEventListener("click", () => {
  cargarDatos();
});

/* =========================
   ESTADO INICIAL
========================= */
mostrarVista("inicio");