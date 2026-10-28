// ============ TEMA (claro / oscuro) ============
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

function applyTheme(theme) {
    if (theme === "light") {
        body.classList.add("light");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.remove("light");
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Cargar tema guardado o detectar preferencia del sistema
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    applyTheme(savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    applyTheme("light");
}

themeToggle.addEventListener("click", () => {
    const isLight = body.classList.contains("light");
    const newTheme = isLight ? "dark" : "light";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
});

// ============ BOTÓN COMPARTIR ============
const shareBtn = document.getElementById("shareBtn");

shareBtn.addEventListener("click", async () => {
    const shareData = {
        title: document.title,
        text: "¡Sígueme en todas mis redes sociales!",
        url: window.location.href,
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            await navigator.clipboard.writeText(window.location.href);
            showToast("¡Enlace copiado al portapapeles!");
        }
    } catch (err) {
        if (err.name !== "AbortError") {
            console.error("Error al compartir:", err);
            showToast("No se pudo compartir el enlace");
        }
    }
});

// ============ TOAST ============
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("show"));

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 2200);
}

// ============ AÑO AUTOMÁTICO ============
document.getElementById("year").textContent = new Date().getFullYear();
