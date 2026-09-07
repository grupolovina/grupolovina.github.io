/* ==========================================
   ===== JAVASCRIPT ORIGINAL DO SITE =====
   ========================================== */

/**
 * Para copiar links
 */
const actionLink = document.querySelectorAll(".link-card .link-action");

actionLink.forEach((action) => {
  action.addEventListener("click", (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(action.parentElement.getAttribute("href"));

    /**
     * Para mostrar toast notification
     */
    document.getElementById("toast").innerHTML = `
        <div class="toast-container">
            <p>Link do <strong> ${action.parentElement.innerText} </strong> copiado!</p>
        </div>
    `;

    /**
     * Para esconder toast notification
     */
    setTimeout(() => {
      document
        .querySelector("#toast .toast-container")
        .classList.add("toast-gone");
    }, 300);

    setTimeout(() => {
      document.querySelector("#toast .toast-container").remove();
    }, 2000);
  });
});

/**
 * Para mudar icone social media ao passar mouse
 */
document.querySelectorAll(".sosmed i").forEach((sosmed) => {
  sosmed.addEventListener("mouseenter", () => {
    sosmed.classList.remove("ph");
    sosmed.classList.add("ph-fill");
  });

  sosmed.addEventListener("mouseleave", () => {
    sosmed.classList.remove("ph-fill");
    sosmed.classList.add("ph");
  });
});

/**
 * Animacao de texto ao rolar
 */
document.addEventListener("scroll", (e) => {
  var bgText = document.querySelector(".bg-text-animation");
  if (bgText) {
    bgText.style.transform = `translateX(${window.scrollY / 5}px)`;
  }
});


/* ==========================================
   ===== JAVASCRIPT DA NOTIFICACAO =====
   ========================================== */

/* ==========================================
   CONFIGURACAO
   Mude esse nome para "resetar" a notificacao
   Ex: "pascoa-2026", "natal-2026", etc.
========================================== */
var NOME_NOTIFICACAO = "semana-santa-2026";

/* Verifica se deve mostrar a notificacao */
function verificarNotificacao() {
    var jaViu = localStorage.getItem("notificacao-" + NOME_NOTIFICACAO);
    if (!jaViu) {
        setTimeout(function() {
            document.getElementById("notificacaoOverlay").classList.add("ativo");
        }, 500);
    }
}

/* Fecha a notificacao */
function fecharNotificacao() {
    document.getElementById("notificacaoOverlay").classList.remove("ativo");
    localStorage.setItem("notificacao-" + NOME_NOTIFICACAO, "true");
}

/* Abre/fecha o menu do sino */
function toggleMenuSino() {
    var menu = document.getElementById("sinoMenu");
    menu.classList.toggle("aberto");
    // Esconde a bolinha vermelha (nao fica salvo)
    document.getElementById("sinoBolinha").style.display = "none";
}

/* Abre a notificacao pelo menu do sino */
function abrirNotificacao() {
    document.getElementById("sinoMenu").classList.remove("aberto");
    document.getElementById("notificacaoOverlay").classList.add("ativo");
}

/* Fecha menu ao clicar fora */
document.addEventListener("click", function(e) {
    var sinoContainer = document.querySelector(".sino-container");
    if (sinoContainer && !sinoContainer.contains(e.target)) {
        document.getElementById("sinoMenu").classList.remove("aberto");
    }
});

/* Fecha notificacao ao clicar no fundo escuro */
var overlay = document.getElementById("notificacaoOverlay");
if (overlay) {
    overlay.addEventListener("click", function(e) {
        if (e.target === this) {
            fecharNotificacao();
        }
    });
}

/* Inicia quando a pagina carrega */
document.addEventListener("DOMContentLoaded", verificarNotificacao);