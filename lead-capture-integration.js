// Arquivo para integrar a captura de leads no site principal
// Adicione este código no início do seu script.js principal

;(() => {
  // Verificar se o usuário já preencheu o formulário de leads
  function checkAndRedirectToLeadCapture() {
    const leadCaptured = localStorage.getItem("grupofullano_lead_captured")
    const currentPage = window.location.pathname

    // Se não capturou lead e não está na página de captura
    if (leadCaptured !== "true" && !currentPage.includes("lead-capture.html")) {
      // Redirecionar para a página de captura de leads
      window.location.href = "lead-capture.html"
      return false
    }

    return true
  }

  // Executar verificação quando a página carregar
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkAndRedirectToLeadCapture)
  } else {
    checkAndRedirectToLeadCapture()
  }
})()
