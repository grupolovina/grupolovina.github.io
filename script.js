// CORREÇÃO PRINCIPAL: Aplicar tema escuro no body E na splash screen ANTES dela aparecer
;(() => {
  const savedTheme = localStorage.getItem("theme") || "light"
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode")
    // CORREÇÃO: Aplicar dark-mode na splash screen também
    const splashScreen = document.getElementById("splashScreen")
    if (splashScreen) {
      splashScreen.classList.add("dark-mode")
    }
  }
})()

// NOVA FUNCIONALIDADE: Sistema de expiração de 30 dias para lead capture
function checkLeadCaptureExpiration() {
  const leadCaptured = localStorage.getItem("grupofullano_lead_captured")
  const leadCaptureDate = localStorage.getItem("grupofullano_lead_capture_date")

  if (leadCaptured === "true" && leadCaptureDate) {
    const captureDate = new Date(leadCaptureDate)
    const currentDate = new Date()
    const daysDifference = Math.floor((currentDate - captureDate) / (1000 * 60 * 60 * 24))

    // Se passaram 30 dias ou mais, resetar o lead capture
    if (daysDifference >= 30) {
      localStorage.removeItem("grupofullano_lead_captured")
      localStorage.removeItem("grupofullano_lead_capture_date")
      localStorage.removeItem("grupofullano_cookies_dismissed")
      localStorage.removeItem("grupofullano_cookies_accepted")
      console.log("✅ Lead capture expirado após 30 dias - formulário disponível novamente")
      return false // Formulário deve aparecer
    }

    return true // Ainda dentro dos 30 dias
  }

  return false // Nunca preencheu o formulário
}

// NOVA FUNCIONALIDADE: Sistema de cookies para usuários que já preencheram o lead
function initializeCookieNotification() {
  // Verificar se o usuário já preencheu o lead e está dentro dos 30 dias
  const leadCaptured = localStorage.getItem("grupofullano_lead_captured")
  const leadCaptureDate = localStorage.getItem("grupofullano_lead_capture_date")
  const cookiesDismissed = localStorage.getItem("grupofullano_cookies_dismissed")

  if (leadCaptured === "true" && leadCaptureDate && !cookiesDismissed) {
    const captureDate = new Date(leadCaptureDate)
    const currentDate = new Date()
    const daysDifference = Math.floor((currentDate - captureDate) / (1000 * 60 * 60 * 24))

    // Se ainda está dentro dos 30 dias, mostrar notificação de cookies
    if (daysDifference < 30) {
      setTimeout(() => {
        showCookieNotification()
      }, 2000) // Mostrar após 2 segundos
    }
  }
}

function showCookieNotification() {
  // Verificar se já existe uma notificação
  if (document.getElementById("cookieNotification")) {
    return
  }

  const cookieNotification = document.createElement("div")
  cookieNotification.id = "cookieNotification"
  cookieNotification.className = "cookie-notification"

  const currentLanguage = localStorage.getItem("preferredLanguage") || "pt"

  const cookieTexts = {
    pt: {
      title: "🍪 Cookies e Experiência",
      message:
        "Utilizamos cookies e tecnologias similares para melhorar sua experiência de navegação, personalizar conteúdo e analisar nosso tráfego. Seus dados estão seguros conosco.",
      accept: "Aceitar",
      decline: "Recusar",
      settings: "Configurações",
    },
    en: {
      title: "🍪 Cookies & Experience",
      message:
        "We use cookies and similar technologies to improve your browsing experience, personalize content and analyze our traffic. Your data is safe with us.",
      accept: "Accept",
      decline: "Decline",
      settings: "Settings",
    },
    es: {
      title: "🍪 Cookies y Experiencia",
      message:
        "Utilizamos cookies y tecnologías similares para mejorar tu experiencia de navegación, personalizar contenido y analizar nuestro tráfico. Tus datos están seguros con nosotros.",
      accept: "Aceptar",
      decline: "Rechazar",
      settings: "Configuraciones",
    },
  }

  const texts = cookieTexts[currentLanguage] || cookieTexts.pt

  cookieNotification.innerHTML = `
    <div class="cookie-content">
      <div class="cookie-header">
        <h3 class="cookie-title">${texts.title}</h3>
        <button class="cookie-close" id="cookieClose">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <p class="cookie-message">${texts.message}</p>
      <div class="cookie-actions">
        <button class="cookie-btn cookie-btn-accept" id="cookieAccept">${texts.accept}</button>
        <button class="cookie-btn cookie-btn-decline" id="cookieDecline">${texts.decline}</button>
        <button class="cookie-btn cookie-btn-settings" id="cookieSettings">${texts.settings}</button>
      </div>
    </div>
  `

  // Adicionar estilos CSS
  const cookieStyles = document.createElement("style")
  cookieStyles.textContent = `
    .cookie-notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      max-width: 400px;
      width: calc(100vw - 40px);
      background: white;
      border-radius: 1rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      z-index: 9999;
      opacity: 0;
      transform: translateY(100px);
      transition: all 0.4s ease;
      border: 2px solid #e5e7eb;
    }

    .cookie-notification.show {
      opacity: 1;
      transform: translateY(0);
    }

    .cookie-content {
      padding: 1.5rem;
    }

    .cookie-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .cookie-title {
      font-family: "NeueAlteGrotesk-Bold", sans-serif;
      font-size: 1.1rem;
      color: #265a96;
      margin: 0;
    }

    .cookie-close {
      background: none;
      border: none;
      color: #6b7280;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 0.25rem;
      transition: all 0.3s ease;
    }

    .cookie-close:hover {
      background: #f3f4f6;
      color: #374151;
    }

    .cookie-message {
      font-family: "NeueAlteGrotesk-Regular", sans-serif;
      color: #666;
      font-size: 0.875rem;
      line-height: 1.5;
      margin: 0 0 1.5rem 0;
    }

    .cookie-actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .cookie-btn {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: "NeueAlteGrotesk-Bold", sans-serif;
      border: none;
      flex: 1;
      min-width: 80px;
    }

    .cookie-btn-accept {
      background: linear-gradient(to right, #1c7dff, #0051c4);
      color: white;
    }

    .cookie-btn-accept:hover {
      background: linear-gradient(to right, #2289ff, #1c7dff);
      transform: translateY(-1px);
    }

    .cookie-btn-decline {
      background: #f3f4f6;
      color: #374151;
      border: 1px solid #d1d5db;
    }

    .cookie-btn-decline:hover {
      background: #e5e7eb;
    }

    .cookie-btn-settings {
      background: transparent;
      color: #2563eb;
      border: 1px solid #2563eb;
    }

    .cookie-btn-settings:hover {
      background: #2563eb;
      color: white;
    }

    /* Dark mode styles */
    body.dark-mode .cookie-notification {
      background: #0a1525;
      border-color: #3b82f6;
    }

    body.dark-mode .cookie-title {
      color: #60a5fa;
    }

    body.dark-mode .cookie-message {
      color: #e2e8f0;
    }

    body.dark-mode .cookie-close {
      color: #9ca3af;
    }

    body.dark-mode .cookie-close:hover {
      background: #374151;
      color: #d1d5db;
    }

    body.dark-mode .cookie-btn-decline {
      background: #374151;
      color: #d1d5db;
      border-color: #4b5563;
    }

    body.dark-mode .cookie-btn-decline:hover {
      background: #4b5563;
    }

    body.dark-mode .cookie-btn-settings {
      color: #60a5fa;
      border-color: #60a5fa;
    }

    body.dark-mode .cookie-btn-settings:hover {
      background: #60a5fa;
      color: #1a1a1a;
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
      .cookie-notification {
        bottom: 10px;
        right: 10px;
        left: 10px;
        max-width: none;
        width: auto;
      }

      .cookie-content {
        padding: 1rem;
      }

      .cookie-actions {
        flex-direction: column;
      }

      .cookie-btn {
        flex: none;
        width: 100%;
      }
    }

    @media (max-width: 480px) {
      .cookie-title {
        font-size: 1rem;
      }

      .cookie-message {
        font-size: 0.8rem;
      }

      .cookie-btn {
        padding: 0.75rem 1rem;
      }
    }
  `

  document.head.appendChild(cookieStyles)
  document.body.appendChild(cookieNotification)

  // Mostrar com animação
  setTimeout(() => {
    cookieNotification.classList.add("show")
  }, 100)

  // Event listeners
  document.getElementById("cookieClose").addEventListener("click", dismissCookieNotification)
  document.getElementById("cookieAccept").addEventListener("click", acceptCookies)
  document.getElementById("cookieDecline").addEventListener("click", declineCookies)
  document.getElementById("cookieSettings").addEventListener("click", showCookieSettings)
}

function dismissCookieNotification() {
  const notification = document.getElementById("cookieNotification")
  if (notification) {
    notification.classList.remove("show")
    setTimeout(() => {
      notification.remove()
    }, 400)
    localStorage.setItem("grupofullano_cookies_dismissed", "true")
  }
}

function acceptCookies() {
  localStorage.setItem("grupofullano_cookies_accepted", "true")
  localStorage.setItem("grupofullano_cookies_dismissed", "true")
  dismissCookieNotification()

  // Mostrar toast de confirmação
  showToast("✅ Cookies aceitos! Obrigado por melhorar sua experiência conosco.", "success")
}

function declineCookies() {
  localStorage.setItem("grupofullano_cookies_accepted", "false")
  localStorage.setItem("grupofullano_cookies_dismissed", "true")
  dismissCookieNotification()

  // Mostrar toast de confirmação
  showToast("❌ Cookies recusados. Você ainda pode alterar isso nas configurações.", "info")
}

function showCookieSettings() {
  // Implementar modal de configurações de cookies (opcional)
  alert("Configurações de cookies em desenvolvimento. Por enquanto, use os botões Aceitar/Recusar.")
}

// NOVA FUNÇÃO: Toast notification system
function showToast(message, type = "info", duration = 4000) {
  // Remove existing toast if any
  const existingToast = document.getElementById("toast-notification")
  if (existingToast) {
    existingToast.remove()
  }

  const toast = document.createElement("div")
  toast.id = "toast-notification"
  toast.className = `toast-notification toast-${type}`

  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-message">${message}</span>
      <button class="toast-close" onclick="this.parentElement.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `

  // Add toast styles if not already added
  if (!document.getElementById("toast-styles")) {
    const toastStyles = document.createElement("style")
    toastStyles.id = "toast-styles"
    toastStyles.textContent = `
      .toast-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        background: white;
        border-radius: 0.75rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.4s ease;
        border-left: 4px solid #3b82f6;
      }

      .toast-notification.toast-success {
        border-left-color: #10b981;
      }

      .toast-notification.toast-error {
        border-left-color: #dc2626;
      }

      .toast-notification.toast-warning {
        border-left-color: #f59e0b;
      }

      .toast-notification.show {
        opacity: 1;
        transform: translateX(0);
      }

      .toast-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1.25rem;
        gap: 1rem;
      }

      .toast-message {
        font-family: "NeueAlteGrotesk-Regular", sans-serif;
        color: #374151;
        font-size: 0.875rem;
        line-height: 1.4;
      }

      .toast-close {
        background: none;
        border: none;
        color: #6b7280;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        transition: all 0.3s ease;
        flex-shrink: 0;
      }

      .toast-close:hover {
        background: #f3f4f6;
        color: #374151;
      }

      body.dark-mode .toast-notification {
        background: #1f2937;
      }

      body.dark-mode .toast-message {
        color: #e5e7eb;
      }

      body.dark-mode .toast-close {
        color: #9ca3af;
      }

      body.dark-mode .toast-close:hover {
        background: #374151;
        color: #d1d5db;
      }

      @media (max-width: 768px) {
        .toast-notification {
          top: 10px;
          right: 10px;
          left: 10px;
          max-width: none;
        }
      }
    `
    document.head.appendChild(toastStyles)
  }

  document.body.appendChild(toast)

  // Show with animation
  setTimeout(() => {
    toast.classList.add("show")
  }, 100)

  // Auto remove after duration
  setTimeout(() => {
    toast.classList.remove("show")
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove()
      }
    }, 400)
  }, duration)
}

function initializeTheme() {
  const isDarkMode = localStorage.getItem("darkMode") === "true"
  const themeToggle = document.querySelector(".theme-toggle")
  const themeIcon = themeToggle.querySelector("i")

  if (isDarkMode) {
    document.body.classList.add("dark-mode")
    themeIcon.className = "ph ph-sun"
  } else {
    document.body.classList.remove("dark-mode")
    themeIcon.className = "ph ph-moon"
  }
}

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const navMenu = document.getElementById("navMenu")

mobileMenuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
navMenu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navMenu.classList.remove("active")
  }
})

// Splash Screen - CORREÇÃO: Aplicar tema escuro na splash screen
window.addEventListener("load", () => {
  // CORREÇÃO: Verificar e aplicar tema escuro na splash screen
  const savedTheme = localStorage.getItem("theme") || "light"
  const splashScreen = document.getElementById("splashScreen")

  if (savedTheme === "dark" && splashScreen) {
    splashScreen.classList.add("dark-mode")
  }

  setTimeout(() => {
    splashScreen.classList.add("fade-out")
    setTimeout(() => {
      splashScreen.style.display = "none"
    }, 500)
  }, 2500)
})

// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle")
const themeIcon = document.getElementById("themeIcon")
const body = document.body

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem("theme") || "light"

// Apply saved theme on page load - CORREÇÃO: Incluir splash screen
if (savedTheme === "dark") {
  body.classList.add("dark-mode")
  themeIcon.className = "fas fa-moon"
  // CORREÇÃO: Aplicar na splash screen também
  const splashScreen = document.getElementById("splashScreen")
  if (splashScreen) {
    splashScreen.classList.add("dark-mode")
  }
} else {
  body.classList.remove("dark-mode")
  themeIcon.className = "fas fa-sun"
}

// Theme toggle event listener - CORREÇÃO: Incluir splash screen
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode")
  const splashScreen = document.getElementById("splashScreen")

  if (body.classList.contains("dark-mode")) {
    themeIcon.className = "fas fa-moon"
    localStorage.setItem("theme", "dark")
    // CORREÇÃO: Aplicar na splash screen também
    if (splashScreen) {
      splashScreen.classList.add("dark-mode")
    }
  } else {
    themeIcon.className = "fas fa-sun"
    localStorage.setItem("theme", "light")
    // CORREÇÃO: Remover da splash screen também
    if (splashScreen) {
      splashScreen.classList.remove("dark-mode")
    }
  }
})

// Locations data with translations
const locations = [
  {
    name: "Fullano Praia",
    description: {
      pt: "Ei! Venha para o Fullano Praia, no Bessa! Saboreie nossos frutos do mar frescos e um chopp gelado, tudo com música ao vivo. Relaxe e viva aquela vibe massa em João Pessoa!",
      en: "Hey! Come to Fullano Praia, in Bessa! Enjoy our fresh seafood and cold beer, all with live music. Relax and live that amazing vibe in João Pessoa!",
      es: "¡Oye! ¡Ven a Fullano Praia, en Bessa! Disfruta de nuestros mariscos frescos y cerveza fría, todo con música en vivo. ¡Relájate y vive esa vibra increíble en João Pessoa!",
    },
    rating: 4.4,
    reviews: 6850,
    image: "img/cardfullanolocalizacao.png",
    link: "https://grupolovina.github.io/fullanopraia/",
    irLink: "https://maps.app.goo.gl/H5w1hCYRnkRg3M6v8",
  },
  {
    name: "Lovina Seixas",
    description: {
      pt: "Seu paraíso exclusivo à beira-mar em João Pessoa. Desfrute de lounges com Jacuzzi, culinária local e vista deslumbrante para as Piscinas Naturais do Seixas. Celebre e relaxe conosco!",
      en: "Your exclusive seaside paradise in João Pessoa. Enjoy lounges with Jacuzzi, local cuisine and stunning views of the Seixas Natural Pools. Celebrate and relax with us!",
      es: "Tu paraíso exclusivo junto al mar en João Pessoa. Disfruta de lounges con Jacuzzi, cocina local y vistas impresionantes de las Piscinas Naturales de Seixas. ¡Celebra y relájate con nosotros!",
    },
    rating: 4.2,
    reviews: 3934,
    image: "img/cardseixaslocalizacao.png",
    link: "https://grupolovina.github.io/lovinaseixas",
    irLink: "https://maps.app.goo.gl/gDMpRdXMAr8sgvy5A",
  },
  {
    name: "Golfinho Bar",
    description: {
      pt: "Comida boa, cerveja gelada e a melhor vista do mar. Desfrute de pratos regionais, frutos do mar frescos e petiscos em um ambiente descontraído. Perfeito para família e amigos!",
      en: "Good food, cold beer and the best sea view. Enjoy regional dishes, fresh seafood and snacks in a relaxed atmosphere. Perfect for family and friends!",
      es: "Buena comida, cerveza fría y la mejor vista al mar. Disfruta de platos regionales, mariscos frescos y aperitivos en un ambiente relajado. ¡Perfecto para familia y amigos!",
    },
    rating: 4.3,
    reviews: 5748,
    image: "img/cardgolfinholocalizacao.png",
    link: "https://grupolovina.github.io/golfinhobar",
    irLink: "https://maps.app.goo.gl/2EPTMRfM9gHwVZKD8",
  },
  {
    name: "Lovina Ponta de Campina",
    description: {
      pt: "Desfrute de frutos do mar frescos, culinária regional e a cerveja mais gelada. Ambiente familiar, com música ao vivo e muita alegria para um dia inesquecível de sol e mar.",
      en: "Enjoy fresh seafood, regional cuisine and the coldest beer. Family atmosphere, with live music and lots of joy for an unforgettable day of sun and sea.",
      es: "Disfruta de mariscos frescos, cocina regional y la cerveza más fría. Ambiente familiar, con música en vivo y mucha alegría para un día inolvidable de sol y mar.",
    },
    rating: 4.4,
    reviews: 9720,
    image: "img/cardtropicallocalizacao.png",
    link: "https://grupolovina.github.io/lovinapontadecampina",
    irLink: "https://maps.app.goo.gl/tWdQ5tE2XLXRp5eW9",
  },
  {
    name: "Rancho da Ema",
    description: {
      pt: "Uma experiência no coração do Cariri! Explore a 'Roliúde Nordestina' e o Lajedo de Pai Mateus, e desfrute de piscina e autêntica comida regional. Venha vivenciar a magia do sertão!",
      en: "An experience in the heart of Cariri! Explore the 'Northeastern Hollywood' and Lajedo de Pai Mateus, and enjoy the pool and authentic regional food. Come experience the magic of the sertão!",
      es: "¡Una experiencia en el corazón de Cariri! Explora el 'Hollywood del Nordeste' y el Lajedo de Pai Mateus, y disfruta de la piscina y auténtica comida regional. ¡Ven a vivir la magia del sertão!",
    },
    rating: 4.6,
    reviews: 47,
    image: "img/cardranchodaemalocalizacao.png",
    link: "https://grupolovina.github.io/ranchodaema",
    irLink: "https://maps.app.goo.gl/SposbsVwk455UTd59",
  },
  {
    name: "Lovina Turismo",
    description: {
        pt: "Descubra o litoral paraibano em um passeio inesquecível! Navegue por praias paradisíacas em lanchas e catamarãs, e viva momentos únicos em meio ao sol, ao mar e à natureza.",
        en: "Discover the Paraíba coastline on an unforgettable tour! Sail through paradise beaches aboard speedboats and catamarans, and enjoy unique moments surrounded by sun, sea, and nature.",
        es: "Descubre la costa de Paraíba en un recorrido inolvidable. Navega por playas paradisíacas en lanchas y catamaranes, y vive momentos únicos entre el sol, el mar y la naturaleza."
    },
    rating: 4.6,
    reviews: 47,
    image: "img/cardlovinaturismo.png",
    link: "https://grupolovina.github.io/lovinaturismo",
    irLink: "https://maps.app.goo.gl/GXTCGdTtBtJSudWd6",
  },
]

// Gallery data
const galleryItems = [
  {
    image: "img/ambiente1.png",
    alt: "Ambiente 1",
    likes: 127,
    comments: 45,
    shares: 23,
  },
  {
    image: "img/ambiente2.png",
    alt: "Ambiente 2",
    likes: 89,
    comments: 32,
    shares: 18,
  },
  {
    image: "img/ambiente3.png",
    alt: "Ambiente 3",
    likes: 156,
    comments: 67,
    shares: 34,
  },
  {
    image: "img/ambiente4.png",
    alt: "Ambiente 4",
    likes: 203,
    comments: 78,
    shares: 41,
  },
  {
    image: "img/ambiente5.png",
    alt: "Ambiente 5",
    likes: 145,
    comments: 52,
    shares: 29,
  },
  {
    image: "img/ambiente6.png",
    alt: "Ambiente 6",
    likes: 178,
    comments: 63,
    shares: 37,
  },
  {
    image: "img/ambiente7.png",
    alt: "Ambiente 7",
    likes: 192,
    comments: 84,
    shares: 45,
  },
  {
    image: "img/ambiente8.png",
    alt: "Ambiente 8",
    likes: 167,
    comments: 71,
    shares: 38,
  },
]

// Testimonials data with translations
const testimonials = [
  {
    name: "Joel Hideki Takei",
    location: "Fullano Praia - João Pessoa",
    rating: 5,
    text: {
      pt: "Ambiente gostoso a beira praia, estrutura muito boa de chuveiros e banheiros. Atendimento bom e local maravilhoso.",
      en: "Nice atmosphere by the beach, very good shower and bathroom facilities. Good service and wonderful location.",
      es: "Ambiente agradable junto a la playa, muy buena estructura de duchas y baños. Buen servicio y lugar maravilloso.",
    },
    avatar: "img/avaliacao1.png",
  },
  {
    name: "Sidnei Pereira",
    location: "Lovina Ponta de Campina - Cabedelo",
    rating: 5,
    text: {
      pt: "Lindo lugar, beira mar, águas calmas, quentes, sem muitas ondas, muito agradável, show ao vivo, bastante mesas",
      en: "Beautiful place, seaside, calm, warm waters, without many waves, very pleasant, live show, plenty of tables",
      es: "Hermoso lugar, junto al mar, aguas tranquilas, cálidas, sin muchas olas, muy agradable, show en vivo, muchas mesas",
    },
    avatar: "img/avaliacao2.png",
  },
  {
    name: "Jaqueline Tamasauskas",
    location: "Golfinho Bar - João Pessoa",
    rating: 5,
    text: {
      pt: "Ótimo lugar, super ventilado, comida muito bem servida. Fomos muito bem atendido pelo ED. Recomendo",
      en: "Great place, super ventilated, very well served food. We were very well attended by ED. I recommend",
      es: "Excelente lugar, súper ventilado, comida muy bien servida. Fuimos muy bien atendidos por ED. Lo recomiendo",
    },
    avatar: "img/avaliacao3.png",
  },
  {
    name: "Patricia Braga",
    location: "Lovina Seixas - João Pessoa",
    rating: 5,
    text: {
      pt: "Ótimo restaurante de praia, infratora boa com toaletes climatizados, chuveiros pós mar, a praia em frente de água morna turva, cardápio com preços honestos",
      en: "Great beach restaurant, good infrastructure with air-conditioned toilets, post-sea showers, the beach in front with warm cloudy water, menu with honest prices",
      es: "Excelente restaurante de playa, buena infraestructura con baños climatizados, duchas post-mar, la playa de enfrente con agua tibia turbia, menú con precios honestos",
    },
    avatar: "img/avaliacao4.png",
  },
  {
    name: "Claudio Andre",
    location: "Rancho da Ema - Cabaceiras",
    rating: 5,
    text: {
      pt: "Do atendimento ao café da manhã. Da piscina aos atrativos. Da recepção das moças a saída Sensacional. Ideal para acampar. Recomendo conhecer, visitar.",
      en: "From service to breakfast. From the pool to the attractions. From the girls' reception to the exit Sensational. Ideal for camping. I recommend getting to know, visiting.",
      es: "Desde el servicio hasta el desayuno. Desde la piscina hasta las atracciones. Desde la recepción de las chicas hasta la salida Sensacional. Ideal para acampar. Recomiendo conocer, visitar.",
    },
    avatar: "img/avaliacao5.png",
  },
  {
    name: "Robson Siqueira",
    location: "Fullano Praia - João Pessoa",
    rating: 5,
    text: {
      pt: "Ótimo lugar para curtir o final de semana, ótimas bandas, excelente atendimento.",
      en: "Great place to enjoy the weekend, great bands, excellent service.",
      es: "Excelente lugar para disfrutar el fin de semana, excelentes bandas, excelente servicio.",
    },
    avatar: "img/avaliacao6.png",
  },
  {
    name: "Talyta Peixoto",
    location: "Golfinho Bar - João Pessoa",
    rating: 5,
    text: {
      pt: "Experiência ótima, atendimento do garçom Ed foi ótimo, super simpático. Amo esse restaurante aqui em Jampa",
      en: "Great experience, waiter Ed's service was great, super friendly. I love this restaurant here in Jampa",
      es: "Excelente experiencia, el servicio del camarero Ed fue excelente, súper simpático. Amo este restaurante aquí en Jampa",
    },
    avatar: "img/avaliacao7.png",
  },
  {
    name: "Fabbio BarbosaX",
    location: "Lovina Seixas - João Pessoa",
    rating: 5,
    text: {
      pt: "Lugar gostoso de ficar. Acesso ao mar, comida boa, cerveja gelada.",
      en: "Nice place to stay. Access to the sea, good food, cold beer.",
      es: "Lugar agradable para quedarse. Acceso al mar, buena comida, cerveza fría.",
    },
    avatar: "img/avaliacao8.png",
  },
  {
    name: "Helena Barbosa",
    location: "Lovina Ponta de Campina - Cabedelo",
    rating: 5,
    text: {
      pt: "Comida ótima, chega muito rápido rapido, lugar lindo, musica ao vivo, e ótimo atendimento.",
      en: "Great food, arrives very quickly, beautiful place, live music, and great service.",
      es: "Comida excelente, llega muy rápido, lugar hermoso, música en vivo, y excelente servicio.",
    },
    avatar: "img/avaliacao9.png",
  },
]

// FAQ data with translations
const faqData = [
  {
    question: {
      pt: "Como faço uma reserva?",
      en: "How do I make a reservation?",
      es: "¿Cómo hago una reserva?",
    },
    answer: {
      pt: "Você pode fazer sua reserva através do nosso site clicando em 'Reservar já' ou entrando em contato diretamente pelo WhatsApp. Nossa equipe estará pronta para ajudá-lo a garantir sua mesa.",
      en: "You can make your reservation through our website by clicking 'Book Now' or by contacting us directly via WhatsApp. Our team will be ready to help you secure your table.",
      es: "Puedes hacer tu reserva a través de nuestro sitio web haciendo clic en 'Reservar Ya' o contactándonos directamente por WhatsApp. Nuestro equipo estará listo para ayudarte a asegurar tu mesa.",
    },
  },
  {
    question: {
      pt: "Qual o horário de funcionamento?",
      en: "What are the opening hours?",
      es: "¿Cuál es el horario de funcionamiento?",
    },
    answer: {
      pt: "Fullano Praia - Segunda à Sexta - 09:00 a 18:00 - Sábado e Domingo - 09:00 à 19:00 | Golfinho Bar - Segunda à Domingo - 09:00 à 18:00 | Lovina Ponta de Campina - Segunda à Domingo - 09:00 à 18:00 | Lovina Seixas - Segunda à Domingo - 09:00 à 18:00",
      en: "Fullano Praia - Monday to Friday - 09:00 a 18:00 - Saturday and Sunday - 09:00 à 19:00 | Golfinho Bar - Monday to Sunday - 09:00 à 18:00 | Lovina Ponta de Campina - Monday to Sunday - 09:00 à 18:00 | Lovina Seixas - Monday to Sunday - 09:00 à 18:00",
      es: "Fullano Praia - De lunes a viernes - 09:00 a 18:00 - Sábado y domingo - 09:00 à 19:00 | Golfinho Bar - De lunes a domingo - 09:00 à 18:00 | Lovina Ponta de Campina - De lunes a domingo - 09:00 à 18:00 | Lovina Seixas - De lunes a domingo - 09:00 à 18:00",
    },
  },
  {
    question: {
      pt: "Vocês aceitam grupos grandes?",
      en: "Do you accept large groups?",
      es: "¿Aceptan grupos grandes?",
    },
    answer: {
      pt: "Sim! Atendemos grupos de todos os tamanhos. Para grupos acima de 10 pessoas, recomendamos fazer a reserva com antecedência para garantirmos o melhor atendimento e espaço adequado.",
      en: "Yes! We serve groups of all sizes. For groups over 10 people, we recommend making a reservation in advance to ensure the best service and adequate space.",
      es: "¡Sí! Atendemos grupos de todos los tamaños. Para grupos de más de 10 personas, recomendamos hacer la reserva con anticipación para garantizar el mejor servicio y espacio adecuado.",
    },
  },
  {
    question: {
      pt: "Há opções vegetarianas/veganas?",
      en: "Are there vegetarian/vegan options?",
      es: "¿Hay opciones vegetarianas/veganas?",
    },
    answer: {
      pt: "Absolutamente! Todos os nossos restaurantes oferecem opções vegetarianas e veganas deliciosas. Nossa equipe pode orientá-lo sobre as melhores escolhas do cardápio.",
      en: "All our restaurants offer delicious vegetarian and vegan options. Our team can guide you on the best menu choices.",
      es: "¡Absolutamente! Todos nuestros restaurantes ofrecen opciones vegetarianas y veganas deliciosas. Nuestro equipo puede orientarte sobre las mejores opciones del menú.",
    },
  },
  {
    question: {
      pt: "Posso cancelar ou alterar minha reserva?",
      en: "Can I cancel or change my reservation?",
      es: "¿Puedo cancelar o cambiar mi reserva?",
    },
    answer: {
      pt: "Sim, você pode cancelar ou alterar sua reserva entrando em contato conosco pelo WhatsApp ou telefone com pelo menos 2 horas de antecedência.",
      en: "Yes, you can cancel or change your reservation by contacting us via WhatsApp or phone at least 2 hours in advance.",
      es: "Sí, puedes cancelar o cambiar tu reserva contactándonos por WhatsApp o teléfono con al menos 2 horas de anticipación.",
    },
  },
  {
    question: {
      pt: "Vocês têm estacionamento?",
      en: "Do you have parking?",
      es: "¿Tienen estacionamiento?",
    },
    answer: {
      pt: "A maioria dos nossos restaurantes possui estacionamento próprio ou conveniado. Consulte nossa equipe sobre a disponibilidade no local escolhido.",
      en: "Most of our restaurants have their own or partner parking. Check with our team about availability at your chosen location.",
      es: "La mayoría de nuestros restaurantes tienen estacionamiento propio o convenido. Consulta con nuestro equipo sobre la disponibilidad en el lugar elegido.",
    },
  },
  {
    question: {
      pt: "Aceitam cartão de crédito/débito?",
      en: "Do you accept credit/debit cards?",
      es: "¿Aceptan tarjetas de crédito/débito?",
    },
    answer: {
      pt: "Sim! Aceitamos as principais bandeiras de cartão de crédito e débito, além de PIX e dinheiro. Alguns locais também aceitam vale-refeição.",
      en: "Yes! We accept major credit and debit card brands, as well as PIX and cash. Some locations also accept meal vouchers.",
      es: "¡Sí! Aceptamos las principales marcas de tarjetas de crédito y débito, además de PIX y efectivo. Algunos lugares también aceptan vales de comida.",
    },
  },
  {
    question: {
      pt: "Há música ao vivo?",
      en: "Is there live music?",
      es: "¿Hay música en vivo?",
    },
    answer: {
      pt: "Vários dos nossos restaurantes oferecem música ao vivo em dias específicos da semana. Consulte nossa programação ou entre em contato para saber sobre os eventos musicais.",
      en: "Several of our restaurants offer live music on specific days of the week. Check our schedule or contact us to learn about musical events.",
      es: "Varios de nuestros restaurantes ofrecen música en vivo en días específicos de la semana. Consulta nuestra programación o contáctanos para saber sobre los eventos musicales.",
    },
  },
]

// AI Quick Questions with translations
const aiQuickQuestions = [
  {
    question: {
      pt: "Ver cardápio",
      en: "View menu",
      es: "Ver menú",
    },
    answer: {
      pt: "Escolha o restaurante para ver o cardápio:",
      en: "Choose the restaurant to view the menu:",
      es: "Elige el restaurante para ver el menú:",
    },
    action: "showCardapioOptions",
  },
  {
    question: {
      pt: "Horário de funcionamento",
      en: "Opening hours",
      es: "Horario de funcionamiento",
    },
    answer: {
      pt: "Fullano Praia - Segunda à Sexta - 09:00 a 18:00 - Sábado e Domingo - 09:00 à 19:00 | Golfinho Bar - Segunda à Domingo - 09:00 à 18:00 | Lovina Ponta de Campina - Segunda à Domingo - 09:00 à 18:00 | Lovina Seixas - Segunda à Domingo - 09:00 à 18:00",
      en: "Fullano Praia - Monday to Friday - 09:00 a 18:00 - Saturday and Sunday - 09:00 à 19:00 | Golfinho Bar - Monday to Sunday - 09:00 à 18:00 | Lovina Ponta de Campina - Monday to Sunday - 09:00 à 18:00 | Lovina Seixas - Monday to Sunday - 09:00 à 18:00",
      es: "Fullano Praia - De lunes a viernes - 09:00 a 18:00 - Sábado y domingo - 09:00 à 19:00 | Golfinho Bar - De lunes a domingo - 09:00 à 18:00 | Lovina Ponta de Campina - De lunes a domingo - 09:00 à 18:00 | Lovina Seixas - De lunes a domingo - 09:00 à 18:00",
    },
  },
  {
    question: {
      pt: "Como fazer reserva",
      en: "How to make a reservation",
      es: "Cómo hacer una reserva",
    },
    answer: {
      pt: "Você pode fazer sua reserva clicando no botão 'Reservar já' no nosso site ou entrando em contato pelo WhatsApp. É rápido e fácil!",
      en: "You can make your reservation by clicking the 'Book Now' button on our website or contacting us via WhatsApp. It's quick and easy!",
      es: "Puedes hacer tu reserva haciendo clic en el botón 'Reservar Ya' en nuestro sitio web o contactándonos por WhatsApp. ¡Es rápido y fácil!",
    },
  },
  {
    question: {
      pt: "Localização dos restaurantes",
      en: "Restaurant locations",
      es: "Ubicación de los restaurantes",
    },
    answer: {
      pt: "Temos 5 restaurantes incríveis: Fullano Praia (Bessa), Lovina Seixas, Golfinho Bar, Lovina Ponta de Campina (Cabedelo) e Rancho da Ema (Cabaceiras). Todos com vista privilegiada!",
      en: "We have 5 amazing restaurants: Fullano Praia (Bessa), Lovina Seixas, Golfinho Bar, Lovina Ponta de Campina (Cabedelo) and Rancho da Ema (Cabaceiras). All with privileged views!",
      es: "Tenemos 5 restaurantes increíbles: Fullano Praia (Bessa), Lovina Seixas, Golfinho Bar, Lovina Ponta de Campina (Cabedelo) y Rancho da Ema (Cabaceiras). ¡Todos con vistas privilegiadas!",
    },
  },
  {
    question: {
      pt: "Preços e formas de pagamento",
      en: "Prices and payment methods",
      es: "Precios y formas de pago",
    },
    answer: {
      pt: "Nossos preços são justos e competitivos. Aceitamos cartão de crédito/débito, PIX, dinheiro e vale-refeição. Entre em contato para mais detalhes sobre valores.",
      en: "Our prices are fair and competitive. We accept credit/debit cards, PIX, cash and meal vouchers. Contact us for more details about prices.",
      es: "Nuestros precios son justos y competitivos. Aceptamos tarjetas de crédito/débito, PIX, efectivo y vales de comida. Contáctanos para más detalles sobre precios.",
    },
  },
]

// Internationalization System
const translations = {
  pt: {
    // Navigation
    aboutUs: "Sobre nós",
    restaurants: "Restaurantes",
    location: "Trabalhe conosco",
    faq: "FAQ",
    reserveButton: "Reservar já",

    // Hero Section
    heroTitle: "Descubra o <span class='highlight'>Sabor</span>, Viva a Experiência!",
    heroSubtitle:
      "Conheça os melhores restaurantes e experiências <span class='highlight'>gastronômicas mais incríveis da Paraíba.</span> Uma jornada culinária inesquecível te espera!",
    heroButton: "Conheça o Grupo Lovina",
    heroRating: "Avaliado por mais de <span class='highlight'>+25.284 clientes</span>",

    // Sections
    experienceTitle: "VIVENCIE O MELHOR DA PARAÍBA",
    experienceSubtitle: "Descubra suas melhores experiências",
    aboutTitle: "SOBRE NÓS",
    aboutSubtitle: "Conheça um pouco sobre nós!",
    testimonialsTitle: "NOSSAS AVALIAÇÕES",
    testimonialsSubtitle: "Reconhecido por +25.284 no Google",
    galleryTitle: "AMBIENTE",
    gallerySubtitle: "Conheça os nossos ambientes!",
    faqTitle: "PERGUNTAS FREQUENTES",
    faqSubtitle: "Tire suas dúvidas sobre nossos restaurantes",

    // Features
    authenticFlavor: "Sabor Autêntico",
    authenticFlavorDesc: "Pratos tradicionais preparados com ingredientes frescos e receitas familiares.",
    respectNature: "Respeito ao Mar e à Terra",
    respectNatureDesc: "Sustentabilidade e respeito ao meio ambiente em todas as nossas operações.",
    hospitality: "Hospitalidade Paraibana",
    hospitalityDesc: "Atendimento caloroso e acolhedor que faz você se sentir em casa.",
    memorableExperiences: "Experiências Memoráveis",
    memorableExperiencesDesc: "Momentos únicos que ficam na memória e no coração de nossos visitantes.",

    // Buttons
    seeMore: "Ver mais",
    goButton: "IR",
    reserveHere: "RESERVE AQUI",

    // Footer
    footerTitle: "GRUPO LOVINA",
    footerDescription:
      "Nosso Grupo Lovina tem a missão de oferecer a todos os clientes a melhor experiência gastronômica da Paraíba. Nossos restaurantes são locais de encontro, de celebração e de descoberta de novos sabores. Venha viver experiências inesquecíveis e provar pratos únicos de nossa culinária!",
    addressTitle: "ENDEREÇO",
    contactTitle: "CONTATO",

    // Translation Modal
    translationTitle: "Traduzir página?",
    translationMessage: "Detectamos que você pode preferir ver este site em outro idioma. Gostaria de traduzir?",
    noThanks: "Não, obrigado",

    // Google Approval
    googleApproval: "Aprovado por milhares de avaliações no Google",

    // AI Assistant
    aiTitle: "Assistente Virtual",
    aiSubtitle: "Como posso ajudar você?",
    aiWelcome: "Olá! Sou o assistente virtual do Grupo Lovina. Escolha uma das opções abaixo ou digite sua pergunta:",
    aiInputPlaceholder: "Digite sua pergunta...",
  },

  en: {
    // Navigation
    aboutUs: "About Us",
    restaurants: "Restaurants",
    location: "Location",
    faq: "FAQ",
    reserveButton: "Book Now",

    // Hero Section
    heroTitle: "Discover the <span class='highlight'>Flavor</span>, Live the Experience!",
    heroSubtitle:
      "Discover the best restaurants and <span class='highlight'>most incredible gastronomic experiences in Paraíba.</span> An unforgettable culinary journey awaits you!",
    heroButton: "Meet Grupo Lovina",
    heroRating: "Rated by more than <span class='highlight'>+25,284 customers</span>",

    // Sections
    experienceTitle: "EXPERIENCE THE BEST OF PARAÍBA",
    experienceSubtitle: "Discover your best experiences",
    aboutTitle: "ABOUT US",
    aboutSubtitle: "Learn a little about us!",
    testimonialsTitle: "OUR REVIEWS",
    testimonialsSubtitle: "Recognized by +25,284 on Google",
    galleryTitle: "ENVIRONMENT",
    gallerySubtitle: "Get to know our environments!",
    faqTitle: "FREQUENTLY ASKED QUESTIONS",
    faqSubtitle: "Get answers about our restaurants",

    // Features
    authenticFlavor: "Authentic Flavor",
    authenticFlavorDesc: "Traditional dishes prepared with fresh ingredients and family recipes.",
    respectNature: "Respect for Sea and Land",
    respectNatureDesc: "Sustainability and respect for the environment in all our operations.",
    hospitality: "Paraiban Hospitality",
    hospitalityDesc: "Warm and welcoming service that makes you feel at home.",
    memorableExperiences: "Memorable Experiences",
    memorableExperiencesDesc: "Unique moments that stay in the memory and heart of our visitors.",

    // Buttons
    seeMore: "See More",
    goButton: "GO",
    reserveHere: "BOOK HERE",

    // Footer
    footerTitle: "GRUPO LOVINA",
    footerDescription:
      "Our Grupo Lovina has the mission to offer all customers the best gastronomic experience in Paraíba. Our restaurants are places of meeting, celebration and discovery of new flavors. Come live unforgettable experiences and taste unique dishes of our cuisine!",
    addressTitle: "ADDRESS",
    contactTitle: "CONTACT",

    // Translation Modal
    translationTitle: "Translate page?",
    translationMessage:
      "We detected that you might prefer to see this site in another language. Would you like to translate?",
    noThanks: "No, thanks",

    // Google Approval
    googleApproval: "Approved by thousands of Google reviews",

    // AI Assistant
    aiTitle: "Virtual Assistant",
    aiSubtitle: "How can I help you?",
    aiWelcome: "Hello! I'm Grupo Lovina's virtual assistant. Choose one of the options below or type your question:",
    aiInputPlaceholder: "Type your question...",
  },

  es: {
    // Navigation
    aboutUs: "Sobre Nosotros",
    restaurants: "Restaurantes",
    location: "Ubicación",
    faq: "FAQ",
    reserveButton: "Reservar Ya",

    // Hero Section
    heroTitle: "Descubre el <span class='highlight'>Sabor</span>, ¡Vive la Experiencia!",
    heroSubtitle:
      "Conoce los mejores restaurantes y <span class='highlight'>experiencias gastronómicas más increíbles de Paraíba.</span> ¡Te espera un viaje culinario inolvidable!",
    heroButton: "Conoce Grupo Lovina",
    heroRating: "Valorado por más de <span class='highlight'>+25.284 clientes</span>",

    // Sections
    experienceTitle: "VIVE LO MEJOR DE PARAÍBA",
    experienceSubtitle: "Descubre tus mejores experiencias",
    aboutTitle: "SOBRE NOSOTROS",
    aboutSubtitle: "¡Conoce un poco sobre nosotros!",
    testimonialsTitle: "NUESTRAS RESEÑAS",
    testimonialsSubtitle: "Reconocido por +25.284 en Google",
    galleryTitle: "AMBIENTE",
    gallerySubtitle: "¡Conoce nuestros ambientes!",
    faqTitle: "PREGUNTAS FRECUENTES",
    faqSubtitle: "Resuelve tus dudas sobre nuestros restaurantes",

    // Features
    authenticFlavor: "Sabor Auténtico",
    authenticFlavorDesc: "Platos tradicionales preparados con ingredientes frescos y recetas familiares.",
    respectNature: "Respeto al Mar y la Tierra",
    respectNatureDesc: "Sostenibilidad y respeto al medio ambiente en todas nuestras operaciones.",
    hospitality: "Hospitalidad Paraibana",
    hospitalityDesc: "Atención cálida y acogedora que te hace sentir como en casa.",
    memorableExperiences: "Experiencias Memorables",
    memorableExperiencesDesc: "Momentos únicos que quedan en la memoria y el corazón de nuestros visitantes.",

    // Buttons
    seeMore: "Ver Más",
    goButton: "IR",
    reserveHere: "RESERVA AQUÍ",

    // Footer
    footerTitle: "GRUPO LOVINA",
    footerDescription:
      "Nuestro Grupo Lovina tiene la misión de ofrecer a todos los clientes la mejor experiencia gastronómica de Paraíba. Nuestros restaurantes son lugares de encuentro, celebración y descubrimiento de nuevos sabores. ¡Ven a vivir experiencias inolvidables y probar platos únicos de nuestra cocina!",
    addressTitle: "DIRECCIÓN",
    contactTitle: "CONTACTO",

    // Translation Modal
    translationTitle: "¿Traducir página?",
    translationMessage: "Detectamos que podrías preferir ver este sitio en otro idioma. ¿Te gustaría traducir?",
    noThanks: "No, gracias",

    // Google Approval
    googleApproval: "Aprobado por miles de reseñas de Google",

    // AI Assistant
    aiTitle: "Asistente Virtual",
    aiSubtitle: "¿Cómo puedo ayudarte?",
    aiWelcome:
      "¡Hola! Soy el asistente virtual de Grupo Lovina. Elige una de las opciones abajo o escribe tu pregunta:",
    aiInputPlaceholder: "Escribe tu pregunta...",
  },
}

// Language detection and management
let currentLanguage = localStorage.getItem("preferredLanguage") || "pt"
let userCountry = null
let userLanguage = null

// Detect user language and country
function detectUserLanguage() {
  userLanguage = navigator.language || navigator.userLanguage
  const langCode = userLanguage.split("-")[0].toLowerCase()

  if (userLanguage.includes("-")) {
    userCountry = userLanguage.split("-")[1].toUpperCase()
  }

  return langCode
}

// Check if user is from Brazil
function isUserFromBrazil() {
  return userCountry === "BR" || userLanguage.toLowerCase().includes("pt-br")
}

// Show translation suggestion modal
function showTranslationSuggestion(suggestedLang) {
  const modal = document.getElementById("translationModal")
  const suggestedLanguagesContainer = document.getElementById("suggestedLanguages")

  suggestedLanguagesContainer.innerHTML = ""

  const langInfo = {
    en: { flag: "us", name: "English" },
    es: { flag: "es", name: "Español" },
  }

  if (langInfo[suggestedLang]) {
    const langElement = document.createElement("div")
    langElement.className = "suggested-language"
    langElement.innerHTML = `
      <img src="https://flagcdn.com/w20/${langInfo[suggestedLang].flag}.png" alt="${langInfo[suggestedLang].name}" class="flag-icon">
      <span>${langInfo[suggestedLang].name}</span>
    `
    langElement.addEventListener("click", () => {
      changeLanguage(suggestedLang)
      hideTranslationModal()
    })
    suggestedLanguagesContainer.appendChild(langElement)
  }

  modal.classList.add("active")
}

// Hide translation modal
function hideTranslationModal() {
  const modal = document.getElementById("translationModal")
  modal.classList.remove("active")
  localStorage.setItem("translationSuggestionDismissed", "true")
}

// Change language
function changeLanguage(lang) {
  currentLanguage = lang
  localStorage.setItem("preferredLanguage", lang)

  const currentFlag = document.getElementById("currentFlag")
  const flagMap = {
    pt: "br",
    en: "us",
    es: "es",
  }
  currentFlag.src = `https://flagcdn.com/w20/${flagMap[lang]}.png`

  translatePage()
  populateLocations()
  populateTestimonials()
  populateGallery()
  populateFAQ()
  populateAIQuestions()
}

// Translate page elements
function translatePage() {
  const elementsToTranslate = document.querySelectorAll("[data-translate]")

  elementsToTranslate.forEach((element) => {
    const key = element.getAttribute("data-translate")
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
      element.innerHTML = translations[currentLanguage][key]
    }
  })

  // Update placeholder
  const aiInput = document.getElementById("aiInput")
  if (aiInput && translations[currentLanguage].aiInputPlaceholder) {
    aiInput.placeholder = translations[currentLanguage].aiInputPlaceholder
  }
}

// Initialize language system
function initializeLanguageSystem() {
  const detectedLang = detectUserLanguage()

  if (!localStorage.getItem("translationSuggestionDismissed") && !isUserFromBrazil()) {
    if (detectedLang === "en" && currentLanguage === "pt") {
      setTimeout(() => changeLanguage("en"), 1000)
    } else if (detectedLang === "es" && currentLanguage === "pt") {
      setTimeout(() => changeLanguage("es"), 1000)
    } else if (detectedLang !== "pt" && currentLanguage === "pt") {
      if (translations[detectedLang]) {
        setTimeout(() => showTranslationSuggestion(detectedLang), 2000)
      } else {
        setTimeout(() => showTranslationSuggestion("en"), 2000)
      }
    }
  }

  changeLanguage(currentLanguage)
}

// Language selector event listeners
function setupLanguageSelector() {
  const languageToggle = document.getElementById("languageToggle")
  const languageDropdown = document.getElementById("languageDropdown")
  const languageOptions = document.querySelectorAll(".language-option")
  const closeModal = document.getElementById("closeModal")
  const dismissTranslation = document.getElementById("dismissTranslation")

  languageToggle.addEventListener("click", (e) => {
    e.stopPropagation()
    languageDropdown.classList.toggle("active")
  })

  document.addEventListener("click", () => {
    languageDropdown.classList.remove("active")
  })

  languageOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      e.stopPropagation()
      const lang = option.getAttribute("data-lang")
      changeLanguage(lang)
      languageDropdown.classList.remove("active")
    })
  })

  closeModal.addEventListener("click", hideTranslationModal)
  dismissTranslation.addEventListener("click", hideTranslationModal)

  document.getElementById("translationModal").addEventListener("click", (e) => {
    if (e.target.id === "translationModal") {
      hideTranslationModal()
    }
  })
}

// Testimonials Carousel Configuration
let currentTestimonialPage = 0
const testimonialsPerPage = 3
const totalTestimonialPages = Math.ceil(testimonials.length / testimonialsPerPage)

// Gallery Carousel Configuration - ALTERADO: 4 imagens por página
let currentGalleryPage = 0
const galleryItemsPerPage = 4 // MUDANÇA: de 3 para 4
const totalGalleryPages = Math.ceil(galleryItems.length / galleryItemsPerPage)

// SISTEMA DE AUTO-ADVANCE CORRIGIDO - Evita múltiplos intervalos
let testimonialAutoAdvance = null
let galleryAutoAdvance = null
let isAutoAdvanceActive = true
let pauseTimeout = null

// Generate stars HTML
function generateStars(rating) {
  let starsHTML = ""
  for (let i = 0; i < 5; i++) {
    starsHTML += '<i class="fas fa-star"></i>'
  }
  return starsHTML
}

// Populate locations
function populateLocations() {
  const locationsGrid = document.getElementById("locationsGrid")
  locationsGrid.innerHTML = ""

  locations.forEach((location) => {
    const locationCard = document.createElement("div")
    locationCard.className = "location-card"

    const description = location.description[currentLanguage] || location.description.pt

    locationCard.innerHTML = `
      <img src="${location.image}" alt="${location.name}">
      <div class="card-content">
        <h3>${location.name}</h3>
        <p>${description}</p>
        <div class="card-footer">
          <div class="card-rating">
            <div class="stars">${generateStars(location.rating)}</div>
            <span class="rating-text">${location.rating}</span>
            <span class="reviews">(${location.reviews})</span>
          </div>
          <div class="card-buttons">
            <a href="${location.link}" target="_blank" class="btn-link">
              <button class="btn-outline" data-translate="seeMore">${translations[currentLanguage].seeMore}</button>
            </a>
            <a href="${location.irLink}" target="_blank" class="btn-link">
              <button class="btn-small" data-translate="goButton">${translations[currentLanguage].goButton}</button>
            </a>
          </div>
        </div>
      </div>
    `
    locationsGrid.appendChild(locationCard)
  })
}

// Populate testimonials for current page
function populateTestimonials() {
  const testimonialsGrid = document.getElementById("testimonialsGrid")
  testimonialsGrid.innerHTML = ""

  const startIndex = currentTestimonialPage * testimonialsPerPage
  const endIndex = Math.min(startIndex + testimonialsPerPage, testimonials.length)
  const currentTestimonials = testimonials.slice(startIndex, endIndex)

  currentTestimonials.forEach((testimonial) => {
    const testimonialCard = document.createElement("div")
    testimonialCard.className = "testimonial-card"

    const text = testimonial.text[currentLanguage] || testimonial.text.pt

    testimonialCard.innerHTML = `
      <div class="testimonial-header">
        <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">
        <div class="testimonial-info">
          <h4>${testimonial.name}</h4>
          <div class="stars">${generateStars(testimonial.rating)}</div>
        </div>
      </div>
      <p class="testimonial-text">${text}</p>
      <div class="testimonial-location">
        <i class="fas fa-map-marker-alt"></i>
        ${testimonial.location}
      </div>
    `

    testimonialsGrid.appendChild(testimonialCard)
  })

  updateTestimonialIndicators()
}

// Populate gallery for current page
function populateGallery() {
  const galleryGrid = document.getElementById("galleryGrid")
  galleryGrid.innerHTML = ""

  const startIndex = currentGalleryPage * galleryItemsPerPage
  const endIndex = Math.min(startIndex + galleryItemsPerPage, galleryItems.length)
  const currentGalleryItems = galleryItems.slice(startIndex, endIndex)

  currentGalleryItems.forEach((item) => {
    const galleryItem = document.createElement("div")
    galleryItem.className = "gallery-item"

    galleryItem.innerHTML = `
      <img src="${item.image}" alt="${item.alt}">
      <div class="gallery-overlay">
        <div class="gallery-rating">
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
        </div>
        <div class="gallery-stats">
          <span>❤️ ${item.likes}</span>
          <span>💬 ${item.comments}</span>
          <span>📤 ${item.shares}</span>
        </div>
      </div>
    `

    galleryGrid.appendChild(galleryItem)
  })

  updateGalleryIndicators()
}

// Populate FAQ
function populateFAQ() {
  const faqContainer = document.getElementById("faqContainer")
  faqContainer.innerHTML = ""

  faqData.forEach((faq, index) => {
    const faqItem = document.createElement("div")
    faqItem.className = "faq-item"

    const question = faq.question[currentLanguage] || faq.question.pt

    // Add line breaks after each | symbol in the business hours answer
    let answer = faq.answer[currentLanguage] || faq.answer.pt

    // Check if this is the business hours FAQ (index 1)
    if (index === 1) {
      answer = answer.replace(/\s*\|\s*/g, "<br>")
    }

    faqItem.innerHTML = `
      <button class="faq-question" data-faq="${index}">
        ${question}
        <i class="fas fa-chevron-down"></i>
      </button>
      <div class="faq-answer" id="faq-answer-${index}">
        ${answer}
      </div>
    `

    faqContainer.appendChild(faqItem)
  })

  // Add event listeners for FAQ items
  document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", () => {
      const faqIndex = question.getAttribute("data-faq")
      const answer = document.getElementById(`faq-answer-${faqIndex}`)
      const isActive = question.classList.contains("active")

      // Close all FAQ items
      document.querySelectorAll(".faq-question").forEach((q) => q.classList.remove("active"))
      document.querySelectorAll(".faq-answer").forEach((a) => a.classList.remove("active"))

      // Open clicked item if it wasn't active
      if (!isActive) {
        question.classList.add("active")
        answer.classList.add("active")
      }
    })
  })
}

// Populate AI Quick Questions
function populateAIQuestions() {
  const quickQuestionsContainer = document.getElementById("aiQuickQuestions")
  quickQuestionsContainer.innerHTML = ""

  aiQuickQuestions.forEach((item) => {
    const questionBtn = document.createElement("button")
    questionBtn.className = "quick-question"

    const questionText = item.question[currentLanguage] || item.question.pt
    questionBtn.textContent = questionText

    questionBtn.addEventListener("click", () => {
      addAIMessage(questionText, true)
      if (item.action === "showCardapioOptions") {
        showCardapioOptions()
      } else {
        const answerText = item.answer[currentLanguage] || item.answer.pt
        addAIMessage(answerText, false)
      }
    })
    quickQuestionsContainer.appendChild(questionBtn)
  })
}

// Create carousel indicators for testimonials
function createTestimonialIndicators() {
  const indicatorsContainer = document.getElementById("carouselIndicators")
  indicatorsContainer.innerHTML = ""

  for (let i = 0; i < totalTestimonialPages; i++) {
    const indicator = document.createElement("div")
    indicator.className = `indicator ${i === currentTestimonialPage ? "active" : ""}`
    indicator.addEventListener("click", () => goToTestimonialPage(i))
    indicatorsContainer.appendChild(indicator)
  }
}

// Create carousel indicators for gallery
function createGalleryIndicators() {
  const indicatorsContainer = document.getElementById("galleryIndicators")
  indicatorsContainer.innerHTML = ""

  for (let i = 0; i < totalGalleryPages; i++) {
    const indicator = document.createElement("div")
    indicator.className = `indicator ${i === currentGalleryPage ? "active" : ""}`
    indicator.addEventListener("click", () => goToGalleryPage(i))
    indicatorsContainer.appendChild(indicator)
  }
}

// Update testimonial indicators
function updateTestimonialIndicators() {
  const indicators = document.querySelectorAll("#carouselIndicators .indicator")
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentTestimonialPage)
  })
}

// Update gallery indicators
function updateGalleryIndicators() {
  const indicators = document.querySelectorAll("#galleryIndicators .indicator")
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentGalleryPage)
  })
}

// Navigation functions
function goToTestimonialPage(pageIndex) {
  currentTestimonialPage = pageIndex
  populateTestimonials()
}

function goToGalleryPage(pageIndex) {
  currentGalleryPage = pageIndex
  populateGallery()
}

function nextTestimonials() {
  currentTestimonialPage = (currentTestimonialPage + 1) % totalTestimonialPages
  populateTestimonials()
}

function prevTestimonials() {
  currentTestimonialPage = (currentTestimonialPage - 1 + totalTestimonialPages) % totalTestimonialPages
  populateTestimonials()
}

function nextGallery() {
  currentGalleryPage = (currentGalleryPage + 1) % totalGalleryPages
  populateGallery()
}

function prevGallery() {
  currentGalleryPage = (currentGalleryPage - 1 + totalGalleryPages) % totalGalleryPages
  populateGallery()
}

// FUNCIONALIDADE DE SWIPE PARA CARROSSÉIS
function initializeSwipeCarousels() {
  const carousels = [
    {
      container: document.getElementById("testimonialsGrid"),
      type: "testimonials",
    },
    {
      container: document.getElementById("galleryGrid"),
      type: "gallery",
    },
  ]

  carousels.forEach((carousel) => {
    if (!carousel.container) return

    let startX = 0
    let startY = 0
    let currentX = 0
    let currentY = 0
    let isDragging = false
    let hasMoved = false

    // Mouse events
    carousel.container.addEventListener("mousedown", (e) => {
      isDragging = true
      hasMoved = false
      startX = e.clientX
      startY = e.clientY
      carousel.container.style.cursor = "grabbing"
      e.preventDefault()
    })

    carousel.container.addEventListener("mousemove", (e) => {
      if (!isDragging) return

      currentX = e.clientX
      currentY = e.clientY

      const deltaX = currentX - startX
      const deltaY = currentY - startY

      // Se o movimento horizontal for maior que o vertical, é um swipe horizontal
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        hasMoved = true
        e.preventDefault()
      }
    })

    carousel.container.addEventListener("mouseup", (e) => {
      if (isDragging && hasMoved) {
        const deltaX = currentX - startX

        // Threshold para considerar um swipe
        if (Math.abs(deltaX) > 50) {
          if (deltaX > 0) {
            // Swipe para direita - voltar
            if (carousel.type === "testimonials") {
              prevTestimonials()
            } else if (carousel.type === "gallery") {
              prevGallery()
            }
          } else {
            // Swipe para esquerda - avançar
            if (carousel.type === "testimonials") {
              nextTestimonials()
            } else if (carousel.type === "gallery") {
              nextGallery()
            }
          }

          // Pausar auto-advance quando houver interação manual
          pauseAutoAdvance()
        }
      }

      isDragging = false
      hasMoved = false
      carousel.container.style.cursor = "grab"
    })

    carousel.container.addEventListener("mouseleave", () => {
      isDragging = false
      hasMoved = false
      carousel.container.style.cursor = "grab"
    })

    // Touch events para mobile
    carousel.container.addEventListener(
      "touchstart",
      (e) => {
        isDragging = true
        hasMoved = false
        startX = e.touches[0].clientX
        startY = e.touches[0].clientY
      },
      { passive: true },
    )

    carousel.container.addEventListener(
      "touchmove",
      (e) => {
        if (!isDragging) return

        currentX = e.touches[0].clientX
        currentY = e.clientY

        const deltaX = currentX - startX
        const deltaY = currentY - startY

        // Se o movimento horizontal for maior que o vertical, é um swipe horizontal
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
          hasMoved = true
          // Prevenir scroll da página durante o swipe horizontal
          e.preventDefault()
        }
      },
      { passive: false },
    )

    carousel.container.addEventListener(
      "touchend",
      (e) => {
        if (isDragging && hasMoved) {
          const deltaX = currentX - startX

          // Threshold para considerar um swipe
          if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
              // Swipe para direita - voltar
              if (carousel.type === "testimonials") {
                prevTestimonials()
              } else if (carousel.type === "gallery") {
                prevGallery()
              }
            } else if (carousel.type === "testimonials") {
              nextTestimonials()
            } else if (carousel.type === "gallery") {
              nextGallery()
            }

            // Pausar auto-advance quando houver interação manual
            pauseAutoAdvance()
          }
        }

        isDragging = false
        hasMoved = false
      },
      { passive: true },
    )

    // Prevenir cliques quando arrastando
    carousel.container.addEventListener("click", (e) => {
      if (hasMoved) {
        e.preventDefault()
        e.stopPropagation()
      }
    })

    // Adicionar cursor de grab
    carousel.container.style.cursor = "grab"
  })
}

// SISTEMA DE AUTO-ADVANCE CORRIGIDO - Evita múltiplos intervalos
function startAutoAdvance() {
  // IMPORTANTE: Sempre limpar intervalos existentes antes de criar novos
  stopAutoAdvance()

  if (!isAutoAdvanceActive) return

  console.log("🚀 Iniciando auto-advance...") // Debug

  // Testimonials auto-advance a cada 8 segundos
  testimonialAutoAdvance = setInterval(() => {
    if (isAutoAdvanceActive) {
      console.log("📝 Auto-advance testimonials") // Debug
      nextTestimonials()
    }
  }, 8000)

  // Gallery auto-advance a cada 10 segundos
  galleryAutoAdvance = setInterval(() => {
    if (isAutoAdvanceActive) {
      console.log("🖼️ Auto-advance gallery") // Debug
      nextGallery()
    }
  }, 10000)
}

function stopAutoAdvance() {
  console.log("⏹️ Parando auto-advance...") // Debug

  // Limpar todos os intervalos
  if (testimonialAutoAdvance) {
    clearInterval(testimonialAutoAdvance)
    testimonialAutoAdvance = null
  }

  if (galleryAutoAdvance) {
    clearInterval(galleryAutoAdvance)
    galleryAutoAdvance = null
  }

  // Limpar timeout de pausa se existir
  if (pauseTimeout) {
    clearTimeout(pauseTimeout)
    pauseTimeout = null
  }
}

function pauseAutoAdvance(duration = 15000) {
  console.log("⏸️ Pausando auto-advance por", duration, "ms") // Debug

  // Parar auto-advance
  isAutoAdvanceActive = false
  stopAutoAdvance()

  // Limpar timeout anterior se existir
  if (pauseTimeout) {
    clearTimeout(pauseTimeout)
  }

  // Reativar após o tempo especificado
  pauseTimeout = setTimeout(() => {
    console.log("▶️ Reativando auto-advance...") // Debug
    isAutoAdvanceActive = true
    startAutoAdvance()
  }, duration)
}

// Floating buttons functionality
function setupFloatingButtons() {
  const scrollBtn = document.getElementById("scrollBtn")
  const scrollIcon = document.getElementById("scrollIcon")
  const aiChatBtn = document.getElementById("aiChatBtn")
  const aiChatModal = document.getElementById("aiChatModal")
  const aiCloseBtn = document.getElementById("aiCloseBtn")
  const aiSendBtn = document.getElementById("aiSendBtn")
  const aiInput = document.getElementById("aiInput")

  let isAtTop = true

  // Scroll button functionality
  scrollBtn.addEventListener("click", () => {
    if (isAtTop) {
      // Scroll to bottom
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      })
    } else {
      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  })

  // Update scroll button icon based on position
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY
    const windowHeight = window.innerHeight

    if (scrollPosition < windowHeight / 2) {
      isAtTop = true
      scrollIcon.className = "fas fa-arrow-down"
    } else {
      isAtTop = false
      scrollIcon.className = "fas fa-arrow-up"
    }
  })

  // AI Chat functionality
  aiChatBtn.addEventListener("click", () => {
    aiChatModal.classList.add("active")
  })

  aiCloseBtn.addEventListener("click", () => {
    aiChatModal.classList.remove("active")
  })

  // Close AI chat when clicking outside
  aiChatModal.addEventListener("click", (e) => {
    if (e.target === aiChatModal) {
      aiChatModal.classList.remove("active")
    }
  })

  // AI input functionality
  aiSendBtn.addEventListener("click", handleAIInput)
  aiInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleAIInput()
    }
  })
}

// Handle AI input
function handleAIInput() {
  const aiInput = document.getElementById("aiInput")
  const userMessage = aiInput.value.trim()

  if (userMessage) {
    addAIMessage(userMessage, true)
    aiInput.value = ""

    // Simple AI response logic
    setTimeout(() => {
      const response = getAIResponse(userMessage)
      addAIMessage(response, false)
    }, 1000)
  }
}

// Add message to AI chat
function addAIMessage(message, isUser) {
  const chatBody = document.getElementById("aiChatBody")
  const messageDiv = document.createElement("div")
  messageDiv.className = `ai-message ${isUser ? "user-message" : ""}`

  // Make links clickable
  const messageWithLinks = message.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" style="color: #2563eb; text-decoration: underline;">$1</a>',
  )

  if (isUser) {
    messageDiv.innerHTML = `
      <div class="ai-text">${messageWithLinks}</div>
    `
  } else {
    messageDiv.innerHTML = `
      <div class="ai-avatar-small">
        <img src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png" alt="IA">
      </div>
      <div class="ai-text" data-message="${message.replace(/"/g, "&quot;")}">${messageWithLinks}</div>
    `

    // Add context menu for mobile
    if (window.innerWidth <= 768) {
      const textElement = messageDiv.querySelector(".ai-text")
      let pressTimer

      textElement.addEventListener("touchstart", (e) => {
        pressTimer = setTimeout(() => {
          showMobileContextMenu(e, message)
        }, 500)
      })

      textElement.addEventListener("touchend", () => {
        clearTimeout(pressTimer)
      })

      textElement.addEventListener("touchmove", () => {
        clearTimeout(pressTimer)
      })
    }
  }

  chatBody.appendChild(messageDiv)
  chatBody.scrollTop = chatBody.scrollHeight
}

// Get AI response
function getAIResponse(userMessage) {
  const message = userMessage.toLowerCase()

  // Cardápio - mostrar opções de restaurantes (manual e botão)
  if (
    message.includes("cardápio") ||
    message.includes("cardapio") ||
    message.includes("menu") ||
    message.includes("comida") ||
    message.includes("prato") ||
    message.includes("comer") ||
    message.includes("mande o cardápio") ||
    message.includes("ver cardápio") ||
    message.includes("mostrar cardápio") ||
    message.includes("quero ver o cardápio")
  ) {
    setTimeout(() => showCardapioOptions(), 500)
    return currentLanguage === "en"
      ? "Choose the restaurant to view the menu:"
      : currentLanguage === "es"
        ? "Elige el restaurante para ver el menú:"
        : "Escolha o restaurante para ver o cardápio:"
  }

  // Horário de funcionamento (manual e botão)
  if (
    message.includes("horário") ||
    message.includes("horario") ||
    message.includes("funcionamento") ||
    message.includes("aberto") ||
    message.includes("fecha") ||
    message.includes("abre") ||
    message.includes("que horas") ||
    message.includes("quando funciona") ||
    message.includes("horário de funcionamento") ||
    message.includes("qual horário") ||
    message.includes("opening") ||
    message.includes("hours") ||
    message.includes("open") ||
    message.includes("close") ||
    message.includes("horario") ||
    message.includes("funcionamiento") ||
    message.includes("abierto") ||
    message.includes("cierra") ||
    message.includes("abre")
  ) {
    if (currentLanguage === "en") {
      return "🕐 **OPENING HOURS**\n\n📅 **Monday to Sunday:** 11am to 11pm\n\n⚠️ Some locations may have special hours on holidays.\n\n💡 **Tip:** We recommend confirming the specific hours of your chosen restaurant by contacting us!"
    } else if (currentLanguage === "es") {
      return "🕐 **HORARIO DE FUNCIONAMIENTO**\n\n📅 **Lunes a Domingo:** 11h a 23h\n\n⚠️ Algunos lugares pueden tener horarios especiales en días festivos.\n\n💡 **Consejo:** ¡Recomendamos confirmar el horario específico del restaurante elegido contactándonos!"
    } else {
      return "🕐 **HORÁRIO DE FUNCIONAMENTO**\n\n📅 **Segunda a Domingo:** 11h às 23h\n\n⚠️ Alguns locais podem ter horários especiais em feriados.\n\n💡 **Dica:** Recomendamos confirmar o horário específico do restaurante escolhido entrando em contato conosco!"
    }
  }

  // Reservas (manual e botão)
  if (
    message.includes("reserva") ||
    message.includes("reservar") ||
    message.includes("mesa") ||
    message.includes("lounge") ||
    message.includes("jacuzzi") ||
    message.includes("piscina") ||
    message.includes("como fazer reserva") ||
    message.includes("quero reservar") ||
    message.includes("fazer uma reserva") ||
    message.includes("reservation") ||
    message.includes("book") ||
    message.includes("booking") ||
    message.includes("table") ||
    message.includes("pool") ||
    message.includes("reserve")
  ) {
    if (currentLanguage === "en") {
      return `🏖️ **HOW TO MAKE YOUR RESERVATION**\n\n✅ **Option 1:** Click the 'Book Now' button on our website\n✅ **Option 2:** Contact us via <a href="https://api.whatsapp.com/send/?phone=5583994086376&text&type=phone_number&app_absent=0" target="_blank" style="color: #25d366; text-decoration: underline;">WhatsApp</a>\n\n🏊‍♂️ **Available:**\n• Lounges with Jacuzzi\n• Pool Areas\n• Traditional tables\n\n⚡ It's quick and easy!`
    } else if (currentLanguage === "es") {
      return `🏖️ **CÓMO HACER TU RESERVA**\n\n✅ **Opción 1:** Haz clic en el botón 'Reservar Ya' en nuestro sitio web\n✅ **Opción 2:** Contáctanos por <a href="https://api.whatsapp.com/send/?phone=5583994086376&text&type=phone_number&app_absent=0" target="_blank" style="color: #25d366; text-decoration: underline;">WhatsApp</a>\n\n🏊‍♂️ **Disponible:**\n• Lounges con Jacuzzi\n• Áreas con Piscina\n• Mesas tradicionales\n\n⚡ ¡Es rápido y fácil!`
    } else {
      return `🏖️ **COMO FAZER SUA RESERVA**\n\n✅ **Opção 1:** Clique no botão 'Reservar já' no nosso site\n✅ **Opção 2:** Entre em contato pelo <a href="https://api.whatsapp.com/send/?phone=5583994086376&text&type=phone_number&app_absent=0" target="_blank" style="color: #25d366; text-decoration: underline;">WhatsApp</a>\n\n🏊‍♂️ **Disponível:**\n• Lounges com Jacuzzi\n• Áreas com Piscina\n• Mesas tradicionais\n\n⚡ É rápido e fácil!`
    }
  }

  // Localização (manual e botão)
  if (
    message.includes("localização") ||
    message.includes("localizacao") ||
    message.includes("endereço") ||
    message.includes("endereco") ||
    message.includes("onde") ||
    message.includes("fica") ||
    message.includes("local") ||
    message.includes("como chegar") ||
    message.includes("localização dos restaurantes") ||
    message.includes("onde ficam") ||
    message.includes("location") ||
    message.includes("address") ||
    message.includes("where") ||
    message.includes("directions") ||
    message.includes("ubicación") ||
    message.includes("dirección") ||
    message.includes("dónde") ||
    message.includes("cómo llegar")
  ) {
    if (currentLanguage === "en") {
      return `📍 **OUR RESTAURANTS**\n\n🏖️ **Fullano Praia** - Bessa, João Pessoa\n🏝️ **Lovina Seixas** - João Pessoa\n🐬 **Golfinho Bar** - João Pessoa\n🌊 **Lovina Ponta de Campina** - Cabedelo\n🏜️ **Rancho da Ema** - Cabaceiras\n\n✨ All with privileged views and unique experiences!\n\n📱 Contact us for specific directions!`
    } else if (currentLanguage === "es") {
      return `📍 **NUESTROS RESTAURANTES**\n\n🏖️ **Fullano Praia** - Bessa, João Pessoa\n🏝️ **Lovina Seixas** - João Pessoa\n🐬 **Golfinho Bar** - João Pessoa\n🌊 **Lovina Ponta de Campina** - Cabedelo\n🏜️ **Rancho da Ema** - Cabaceiras\n\n✨ ¡Todos con vistas privilegiadas y experiencias únicas!\n\n📱 ¡Contáctanos para direcciones específicas!`
    } else {
      return `📍 **NOSSOS RESTAURANTES**\n\n🏖️ **Fullano Praia** - Bessa, João Pessoa\n🏝️ **Lovina Seixas** - João Pessoa\n🐬 **Golfinho Bar** - João Pessoa\n🌊 **Lovina Ponta de Campina** - Cabedelo\n🏜️ **Rancho da Ema** - Cabaceiras\n\n✨ Todos com vista privilegiada e experiências únicas!\n\n📱 Entre em contato para direções específicas!`
    }
  }

  // Preços e pagamento (manual e botão)
  if (
    message.includes("preço") ||
    message.includes("preco") ||
    message.includes("valor") ||
    message.includes("pagamento") ||
    message.includes("cartão") ||
    message.includes("cartao") ||
    message.includes("pix") ||
    message.includes("dinheiro") ||
    message.includes("quanto custa") ||
    message.includes("preços e formas de pagamento") ||
    message.includes("como pagar") ||
    message.includes("formas de pagamento") ||
    message.includes("price") ||
    message.includes("cost") ||
    message.includes("payment") ||
    message.includes("card") ||
    message.includes("cash") ||
    message.includes("precio") ||
    message.includes("costo") ||
    message.includes("pago") ||
    message.includes("tarjeta") ||
    message.includes("efectivo")
  ) {
    if (currentLanguage === "en") {
      return `💰 **PRICES AND PAYMENT**\n\n💵 **Prices:** Fair and competitive\n\n💳 **Payment Methods:**\n✅ Credit/Debit Cards\n✅ PIX\n✅ Cash\n✅ Meal vouchers\n\n📞 Contact us for more details about specific prices!`
    } else if (currentLanguage === "es") {
      return `💰 **PRECIOS Y PAGO**\n\n💵 **Precios:** Justos y competitivos\n\n💳 **Formas de Pago:**\n✅ Tarjetas de Crédito/Débito\n✅ PIX\n✅ Efectivo\n✅ Vales de comida\n\n📞 ¡Contáctanos para más detalles sobre precios específicos!`
    } else {
      return `💰 **PREÇOS E PAGAMENTO**\n\n💵 **Preços:** Justos e competitivos\n\n💳 **Formas de Pagamento:**\n✅ Cartão de Crédito/Débito\n✅ PIX\n✅ Dinheiro\n✅ Vale-refeição\n\n📞 Entre em contato para mais detalhes sobre valores específicos!`
    }
  }

  // Resposta padrão
  if (currentLanguage === "en") {
    return `❓ **I couldn't understand your question**\n\nFor more personalized service, contact us via <a href="https://api.whatsapp.com/send/?phone=5583994086376&text&type=phone_number&app_absent=0" target="_blank" style="color: #25d366; text-decoration: underline;">WhatsApp</a>\n\n💡 **Tip:** Try asking about menu, hours, reservations, location or prices!`
  } else if (currentLanguage === "es") {
    return `❓ **No pude entender tu pregunta**\n\nPara un servicio más personalizado, contáctanos por <a href="https://api.whatsapp.com/send/?phone=5583994086376&text&type=phone_number&app_absent=0" target="_blank" style="color: #25d366; text-decoration: underline;">WhatsApp</a>\n\n💡 **Consejo:** ¡Intenta preguntar sobre menú, horarios, reservas, ubicación o precios!`
  } else {
    return `❓ **Não consegui entender sua pergunta**\n\nPara um atendimento mais personalizado, entre em contato conosco pelo <a href="https://api.whatsapp.com/send/?phone=5583994086376&text&type=phone_number&app_absent=0" target="_blank" style="color: #25d366; text-decoration: underline;">WhatsApp</a>\n\n💡 **Dica:** Tente perguntar sobre cardápio, horários, reservas, localização ou preços!`
  }
}

// Show cardápio options
function showCardapioOptions() {
  const chatBody = document.getElementById("aiChatBody")
  const messageDiv = document.createElement("div")
  messageDiv.className = "ai-message"

  const chooseText =
    currentLanguage === "en"
      ? "Choose the restaurant to view the menu:"
      : currentLanguage === "es"
        ? "Elige el restaurante para ver el menú:"
        : "Escolha o restaurante para ver o cardápio:"

  messageDiv.innerHTML = `
    <div class="ai-avatar-small">
      <img src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png" alt="IA">
    </div>
    <div class="ai-text">
      ${chooseText}
      <div class="cardapio-options">
        <button class="cardapio-option-btn" onclick="showRestaurantCardapio('Fullano Praia')">
          🏖️ Fullano Praia
        </button>
        <button class="cardapio-option-btn" onclick="showRestaurantCardapio('Golfinho Bar')">
          🐬 Golfinho Bar
        </button>
        <button class="cardapio-option-btn" onclick="showRestaurantCardapio('Lovina Ponta de Campina')">
          🌊 Lovina Ponta de Campina
        </button>
        <button class="cardapio-option-btn" onclick="showRestaurantCardapio('Lovina Seixas')">
          🏝️ Lovina Seixas
        </button>
      </div>
    </div>
  `

  chatBody.appendChild(messageDiv)
  chatBody.scrollTop = chatBody.scrollHeight
}

// Show restaurant cardapio with image and actions - IMPLEMENTAÇÃO CORRIGIDA
function showRestaurantCardapio(restaurantName) {
  const chatBody = document.getElementById("aiChatBody")
  const messageDiv = document.createElement("div")
  messageDiv.className = "ai-message"

  // Restaurant links
  const restaurantLinks = {
    "Fullano Praia": "https://drive.google.com/drive/folders/1D8CydBS3LXtiJzmdPiTsPBWmLlWv6Pr6?usp=drive_link",
    "Golfinho Bar": "https://drive.google.com/drive/folders/1kdPntoanLQuIV79Q-ar4_KT4eKBHbipY?usp=drive_link",
    "Lovina Ponta de Campina":
      "https://drive.google.com/drive/folders/11xXyvPlR65pPjoJ3AV69-4kZnrUOYUru?usp=drive_link",
    "Lovina Seixas": "https://drive.google.com/drive/folders/11sRNyEoRPjuuN86ZidUyHlZ2k1CJaQD_?usp=drive_link",
  }

  // CARDÁPIOS ESPECÍFICOS POR RESTAURANTE - IMPLEMENTAÇÃO SOLICITADA
  const restaurantMenuImages = {
    "Fullano Praia": "img/cardapiofullano1",
    "Golfinho Bar": "img/cardapiogolfinho1",
    "Lovina Ponta de Campina": "img/cardapiopontadecampina1",
    "Lovina Seixas": "img/cardapioseixas1",
  }

  const link = restaurantLinks[restaurantName]
  const menuImage = (restaurantMenuImages[restaurantName] || "img/cardapiofullano") + ".png"

  const menuText = currentLanguage === "en" ? "Menu" : currentLanguage === "es" ? "Menú" : "Cardápio"

  const checkMenuText =
    currentLanguage === "en"
      ? `Check out our delicious ${restaurantName} menu!`
      : currentLanguage === "es"
        ? `¡Echa un vistazo a nuestro delicioso menú de ${restaurantName}!`
        : `Confira nosso delicioso cardápio do ${restaurantName}!`

  const viewCompleteText =
    currentLanguage === "en"
      ? "View complete menu online"
      : currentLanguage === "es"
        ? "Ver menú completo online"
        : "Ver cardápio completo online"

  const clickToEnlargeText =
    currentLanguage === "en"
      ? "Click to enlarge"
      : currentLanguage === "es"
        ? "Haz clic para ampliar"
        : "Clique para ampliar"

  messageDiv.innerHTML = `
    <div class="ai-avatar-small">
      <img src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png" alt="IA">
    </div>
    <div class="ai-text">
      <div class="cardapio-card">
        <h4>📋 ${menuText} - ${restaurantName}</h4>
        <div class="cardapio-image-container">
          <img src="${menuImage}" alt="${menuText} ${restaurantName}" class="cardapio-image-small" onclick="openCardapioPreview('${menuImage}', '${restaurantName}')">
          <div class="cardapio-overlay">
            <span class="click-to-enlarge">${clickToEnlargeText}</span>
          </div>
          <div class="cardapio-actions">
            <button class="cardapio-action-btn" onclick="downloadCardapioImage('${menuImage}', '${restaurantName}')" title="Download do ${menuText}">
              <i class="fas fa-download"></i>
            </button>
            <button class="cardapio-action-btn" onclick="copyCardapioImage('${menuImage}')" title="Copiar ${menuText}">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>
        <p>🍽️ ${checkMenuText}</p>
        <a href="${link}" target="_blank" class="cardapio-link">
          <i class="fas fa-external-link-alt"></i> ${viewCompleteText}
        </a>
      </div>
    </div>
  `

  chatBody.appendChild(messageDiv)
  chatBody.scrollTop = chatBody.scrollHeight
}

// CORREÇÃO DO BUG DE ZOOM - IMPLEMENTAÇÃO COMPLETA E FUNCIONAL
function openCardapioPreview(imagePath, restaurantName) {
  const modal = document.createElement("div")
  modal.className = "cardapio-preview-modal"
  modal.id = "cardapioPreviewModal"

  const menuText = currentLanguage === "en" ? "Menu" : currentLanguage === "es" ? "Menú" : "Cardápio"

  // Instruções de zoom baseadas no dispositivo
  const zoomInstructions = getZoomInstructions()

  // In the openCardapioPreview function, replace the cardapioSlides array creation with this:

  // Criar array com 4 cardápios diferentes para cada restaurante
  const baseImageName = imagePath.replace(".png", "").slice(0, -1) // Remove last digit from base image name
  const cardapioSlides = [
    { image: `${baseImageName}1.png`, title: `${menuText} 1` },
    { image: `${baseImageName}2.png`, title: `${menuText} 2` },
    { image: `${baseImageName}3.png`, title: `${menuText} 3` },
    { image: `${baseImageName}4.png`, title: `${menuText} 4` },
  ]

  modal.innerHTML = `
    <div class="cardapio-preview-content">
      <div class="cardapio-preview-header">
        <h3>📋 ${menuText} - ${restaurantName}</h3>
        <button class="cardapio-preview-close" onclick="closeCardapioPreview()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="cardapio-preview-body">
        <div class="cardapio-carousel-container" id="cardapioCarouselContainer">
          <div class="cardapio-slide-counter" id="slideCounter">1 / 4</div>
          <div class="cardapio-carousel-track" id="cardapioCarouselTrack">
            ${cardapioSlides
              .map(
                (slide, index) => `
              <div class="cardapio-carousel-slide">
                <div class="cardapio-image-zoom-container" id="zoomContainer${index}" data-slide="${index}">
                  <img src="${slide.image}" alt="${slide.title} ${restaurantName}" class="cardapio-preview-image zoom-1x" id="zoomImage${index}">
                  <div class="zoom-indicator" id="zoomIndicator${index}">100%</div>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
          <div class="cardapio-carousel-controls">
            <button class="cardapio-nav-btn" id="prevCardapioBtn">
              <i class="fas fa-chevron-left"></i>
            </button>
            <div class="cardapio-carousel-indicators" id="cardapioIndicators">
              ${cardapioSlides
                .map(
                  (_, index) => `
                <div class="cardapio-indicator ${index === 0 ? "active" : ""}" data-slide="${index}"></div>
              `,
                )
                .join("")}
            </div>
            <button class="cardapio-nav-btn" id="nextCardapioBtn">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        <div class="zoom-instructions">${zoomInstructions}</div>
        <div class="cardapio-preview-actions">
          <button class="btn-cardapio-action" onclick="downloadCurrentCardapio('${imagePath}', '${restaurantName}')">
            <i class="fas fa-download"></i> Download
          </button>
          <button class="btn-cardapio-action" onclick="copyCurrentCardapio('${imagePath}')">
            <i class="fas fa-copy"></i> ${currentLanguage === "en" ? "Copy" : currentLanguage === "es" ? "Copiar" : "Copiar"}
          </button>
        </div>
      </div>
    </div>
  `

  document.body.appendChild(modal)

  // Inicializar carrossel de cardápios
  initializeCardapioCarousel()

  // CORREÇÃO: Inicializar funcionalidade de zoom para TODOS os slides
  initializeZoomFunctionality()

  // Close on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeCardapioPreview()
    }
  })

  // Close on ESC key
  const escHandler = (e) => {
    if (e.key === "Escape") {
      closeCardapioPreview()
      document.removeEventListener("keydown", escHandler)
    }
  }
  document.addEventListener("keydown", escHandler)
}

// Inicializar carrossel de cardápios
function initializeCardapioCarousel() {
  const track = document.getElementById("cardapioCarouselTrack")
  const prevBtn = document.getElementById("prevCardapioBtn")
  const nextBtn = document.getElementById("nextCardapioBtn")
  const indicators = document.querySelectorAll(".cardapio-indicator")
  const slideCounter = document.getElementById("slideCounter")

  if (!track || !prevBtn || !nextBtn) return

  let currentSlide = 0
  const totalSlides = 4
  let isTransitioning = false

  // Função para atualizar o carrossel
  function updateCarousel(slideIndex, animate = true) {
    if (isTransitioning) return

    currentSlide = Math.max(0, Math.min(totalSlides - 1, slideIndex))

    if (animate) {
      isTransitioning = true
      track.style.transition = "transform 0.3s ease"
    } else {
      track.style.transition = "none"
    }

    track.style.transform = `translateX(-${currentSlide * 25}%)`

    // Atualizar indicadores
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentSlide)
    })

    // Atualizar contador
    slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`

    // Atualizar botões
    prevBtn.disabled = currentSlide === 0
    nextBtn.disabled = currentSlide === totalSlides - 1

    if (animate) {
      setTimeout(() => {
        isTransitioning = false
      }, 300)
    }
  }

  // Event listeners para botões
  prevBtn.addEventListener("click", () => {
    if (currentSlide > 0) {
      updateCarousel(currentSlide - 1)
    }
  })

  nextBtn.addEventListener("click", () => {
    if (currentSlide < totalSlides - 1) {
      updateCarousel(currentSlide + 1)
    }
  })

  // Event listeners para indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      updateCarousel(index)
    })
  })

  // Suporte a gestos touch/swipe
  let startX = 0
  let startY = 0
  let currentX = 0
  let currentY = 0
  let isDragging = false
  let hasMoved = false

  // Mouse events
  track.addEventListener("mousedown", (e) => {
    if (isTransitioning) return
    isDragging = true
    hasMoved = false
    startX = e.clientX
    startY = e.clientY
    track.style.cursor = "grabbing"
    e.preventDefault()
  })

  track.addEventListener("mousemove", (e) => {
    if (!isDragging || isTransitioning) return

    currentX = e.clientX
    currentY = e.clientY

    const deltaX = currentX - startX
    const deltaY = currentY - startY

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      hasMoved = true
      e.preventDefault()
    }
  })

  track.addEventListener("mouseup", (e) => {
    if (isDragging && hasMoved) {
      const deltaX = currentX - startX

      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0 && currentSlide > 0) {
          // Swipe para direita - slide anterior
          updateCarousel(currentSlide - 1)
        } else if (deltaX < 0 && currentSlide < totalSlides - 1) {
          // Swipe para esquerda - próximo slide
          updateCarousel(currentSlide + 1)
        }
      }
    }

    isDragging = false
    hasMoved = false
    track.style.cursor = "grab"
  })

  track.addEventListener("mouseleave", () => {
    isDragging = false
    hasMoved = false
    track.style.cursor = "grab"
  })

  // Touch events para mobile
  track.addEventListener(
    "touchstart",
    (e) => {
      if (isTransitioning) return
      isDragging = true
      hasMoved = false
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    },
    { passive: true },
  )

  track.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging || isTransitioning) return

      currentX = e.touches[0].clientX
      currentY = e.clientY

      const deltaX = currentX - startX
      const deltaY = currentY - startY

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        hasMoved = true
        e.preventDefault()
      }
    },
    { passive: false },
  )

  track.addEventListener(
    "touchend",
    (e) => {
      if (isDragging && hasMoved && !isTransitioning) {
        const deltaX = currentX - startX

        if (Math.abs(deltaX) > 50) {
          if (deltaX > 0 && currentSlide > 0) {
            // Swipe para direita - slide anterior
            updateCarousel(currentSlide - 1)
          } else if (deltaX < 0 && currentSlide < totalSlides - 1) {
            // Swipe para esquerda - próximo slide
            updateCarousel(currentSlide + 1)
          }
        }
      }

      isDragging = false
      hasMoved = false
    },
    { passive: true },
  )

  // Inicializar carrossel
  updateCarousel(0, false)
}

// CORREÇÃO PRINCIPAL: Obter instruções de zoom baseadas no idioma e dispositivo
function getZoomInstructions() {
  const isMobile = window.innerWidth <= 768

  if (currentLanguage === "en") {
    return isMobile ? "📱 Pinch to zoom in/out" : "🖱️ Click to zoom in/out • Scroll to navigate when zoomed"
  } else if (currentLanguage === "es") {
    return isMobile ? "📱 Pellizca para hacer zoom" : "🖱️ Haz clic para hacer zoom • Desplázate para navegar"
  } else {
    return isMobile ? "📱 Faça pinça para dar zoom" : "🖱️ Clique para dar zoom • Role para navegar quando ampliado"
  }
}

// CORREÇÃO PRINCIPAL: Inicializar funcionalidade de zoom CORRIGIDA
function initializeZoomFunctionality() {
  // Inicializar zoom para todos os slides (0, 1, 2, 3)
  for (let slideIndex = 0; slideIndex < 4; slideIndex++) {
    const zoomContainer = document.getElementById(`zoomContainer${slideIndex}`)
    const zoomImage = document.getElementById(`zoomImage${slideIndex}`)
    const zoomIndicator = document.getElementById(`zoomIndicator${slideIndex}`)

    if (!zoomContainer || !zoomImage || !zoomIndicator) continue

    let currentZoom = 1
    const zoomLevels = [1, 1.5, 2, 3]
    let currentZoomIndex = 0

    // Função para atualizar o zoom
    function updateZoom(newZoomIndex) {
      currentZoomIndex = Math.max(0, Math.min(zoomLevels.length - 1, newZoomIndex))
      currentZoom = zoomLevels[currentZoomIndex]

      // Remover todas as classes de zoom
      zoomImage.className = zoomImage.className.replace(/zoom-[\d\-.]+x/g, "")

      // Adicionar nova classe de zoom
      const zoomClass = `zoom-${currentZoom.toString().replace(".", "-")}x`
      zoomImage.classList.add(zoomClass)

      // Atualizar indicador
      zoomIndicator.textContent = `${Math.round(currentZoom * 100)}%`

      // Atualizar container
      if (currentZoom > 1) {
        zoomContainer.classList.add("zoomed")
        zoomContainer.style.overflow = "auto"
        zoomContainer.style.cursor = "zoom-out"
      } else {
        zoomContainer.classList.remove("zoomed")
        zoomContainer.style.overflow = "hidden"
        zoomContainer.style.cursor = "zoom-in"
      }
    }

    // DESKTOP: Click para zoom direto ao tamanho completo
    if (window.innerWidth > 768) {
      zoomContainer.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()

        // Se não estiver ampliado, vai direto para o zoom máximo (tamanho real)
        // Se já estiver ampliado, volta para o zoom máximo
        if (currentZoom === 1) {
          updateZoom(zoomLevels.length - 1) // Vai direto para 3x (tamanho completo)
        } else {
          updateZoom(0) // Volta para 1x
        }
      })
    }

    // MOBILE: Toque simples para zoom direto ao tamanho completo
    let touchStartTime = 0
    let touchStartX = 0
    let touchStartY = 0

    zoomContainer.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        touchStartTime = Date.now()
        touchStartX = e.touches[0].clientX
        touchStartY = e.touches[0].clientY
      }
    })

    zoomContainer.addEventListener("touchend", (e) => {
      if (e.touches.length === 0 && e.changedTouches.length === 1) {
        const touchEndTime = Date.now()
        const touchEndX = e.changedTouches[0].clientX
        const touchEndY = e.changedTouches[0].clientY

        const timeDiff = touchEndTime - touchStartTime
        const distanceX = Math.abs(touchEndX - touchStartX)
        const distanceY = Math.abs(touchEndY - touchStartY)

        // Se foi um toque rápido e sem movimento significativo (tap)
        if (timeDiff < 300 && distanceX < 10 && distanceY < 10) {
          e.preventDefault()

          // Se não estiver ampliado, vai direto para o zoom máximo
          // Se já estiver ampliado, volta para o tamanho normal
          if (currentZoom === 1) {
            updateZoom(zoomLevels.length - 1) // Vai direto para 3x (tamanho completo)
          } else {
            updateZoom(0) // Volta para 1x
          }
        }
      }
    })

    // MOBILE: Touch gestures para zoom (pinça)
    let initialDistance = 0
    let initialZoom = 1
    let isZooming = false

    zoomContainer.addEventListener("touchstart", (e) => {
      if (e.touches.length === 2) {
        e.preventDefault()
        isZooming = true
        initialDistance = getDistance(e.touches[0], e.touches[1])
        initialZoom = currentZoom
      }
    })

    zoomContainer.addEventListener("touchmove", (e) => {
      if (e.touches.length === 2 && isZooming) {
        e.preventDefault()

        const currentDistance = getDistance(e.touches[0], e.touches[1])
        const scale = currentDistance / initialDistance
        const newZoom = initialZoom * scale

        // Encontrar o nível de zoom mais próximo
        let closestZoomIndex = 0
        let minDiff = Math.abs(zoomLevels[0] - newZoom)

        for (let i = 1; i < zoomLevels.length; i++) {
          const diff = Math.abs(zoomLevels[i] - newZoom)
          if (diff < minDiff) {
            minDiff = diff
            closestZoomIndex = i
          }
        }

        if (closestZoomIndex !== currentZoomIndex) {
          updateZoom(closestZoomIndex)
        }
      }
    })

    zoomContainer.addEventListener("touchend", (e) => {
      if (e.touches.length < 2) {
        isZooming = false
      }
    })

    // Função para calcular distância entre dois pontos de toque
    function getDistance(touch1, touch2) {
      const dx = touch1.clientX - touch2.clientX
      const dy = touch1.clientY - touch2.clientY
      return Math.sqrt(dx * dx + dy * dy)
    }

    // Inicializar com zoom 1x
    updateZoom(0)
  }
}

// Download do cardápio atual
function downloadCurrentCardapio(imagePath, restaurantName) {
  const slideCounter = document.getElementById("slideCounter")
  const currentSlideNumber = slideCounter ? slideCounter.textContent.split(" / ")[0] : "1"

  const link = document.createElement("a")
  link.href = imagePath

  const menuText = currentLanguage === "en" ? "menu" : currentLanguage === "es" ? "menu" : "cardapio"

  link.download = `${menuText}-${restaurantName.toLowerCase().replace(/\s+/g, "-")}-${currentSlideNumber}.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  const downloadText =
    currentLanguage === "en"
      ? `📥 ${restaurantName} menu ${currentSlideNumber} downloaded successfully!`
      : currentLanguage === "es"
        ? `📥 ¡Menú ${currentSlideNumber} de ${restaurantName} descargado con éxito!`
        : currentLanguage === "pt"
          ? `📥 Cardápio ${currentSlideNumber} do ${restaurantName} baixado com sucesso!`
          : `📥 ${restaurantName} menu ${currentSlideNumber} downloaded successfully!`

  showToast(downloadText)
}

// Copiar cardápio atual
async function copyCurrentCardapio(imagePath) {
  try {
    const response = await fetch(imagePath)
    const blob = await response.blob()
    await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })])

    const slideCounter = document.getElementById("slideCounter")
    const currentSlideNumber = slideCounter ? slideCounter.textContent.split(" / ")[0] : "1"

    const copyText =
      currentLanguage === "en"
        ? "Menu ${currentSlideNumber} copied to clipboard!"
        : currentLanguage === "es"
          ? `¡Menú ${currentSlideNumber} copiado al portapapeles!`
          : currentLanguage === "pt"
            ? `Cardápio ${currentSlideNumber} copiado para a área de transferência!`
            : "Menu ${currentSlideNumber} copied to clipboard!"

    showToast(copyText)
  } catch (err) {
    console.error("Erro ao copiar cardápio:", err)

    const errorText =
      currentLanguage === "en"
        ? "Could not copy the menu"
        : currentLanguage === "es"
          ? "No se pudo copiar el menú"
          : currentLanguage === "pt"
            ? `Não foi possível copiar o cardápio`
            : "Could not copy the menu"

    showToast(errorText, "error")
  }
}

// Close cardapio preview - VERSÃO ATUALIZADA
function closeCardapioPreview() {
  const modal = document.getElementById("cardapioPreviewModal")
  if (modal) {
    modal.remove()
  }
}

// Download cardapio image
function downloadCardapioImage(imagePath, restaurantName) {
  const link = document.createElement("a")
  link.href = imagePath

  const menuText = currentLanguage === "en" ? "menu" : currentLanguage === "es" ? "menu" : "cardapio"

  link.download = `${menuText}-${restaurantName.toLowerCase().replace(/\s+/g, "-")}.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  const downloadText =
    currentLanguage === "en"
      ? `${restaurantName} menu downloaded successfully!`
      : currentLanguage === "es"
        ? `¡Menú de ${restaurantName} descargado con éxito!`
        : currentLanguage === "pt"
          ? `Cardápio do ${restaurantName} baixado com sucesso!`
          : `${restaurantName} menu downloaded successfully!`

  showToast(downloadText)
}

// Copy cardapio image to clipboard
async function copyCardapioImage(imagePath) {
  try {
    const response = await fetch(imagePath)
    const blob = await response.blob()
    await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })])

    const copyText =
      currentLanguage === "en"
        ? "Menu copied to clipboard!"
        : currentLanguage === "es"
          ? `¡Menú copiado al portapapeles!`
          : currentLanguage === "pt"
            ? `Cardápio copiado para a área de transferência!`
            : "Menu copied to clipboard!"

    showToast(copyText)
  } catch (err) {
    console.error("Erro ao copiar cardápio:", err)

    const errorText =
      currentLanguage === "en"
        ? "Could not copy the menu"
        : currentLanguage === "es"
          ? "No se pudo copiar el menú"
          : currentLanguage === "pt"
            ? `Não foi possível copiar o cardápio`
            : "Could not copy the menu"

    showToast(errorText, "error")
  }
}

// Show mobile context menu
function showMobileContextMenu(event, message) {
  const existingMenu = document.querySelector(".mobile-context-menu")
  if (existingMenu) {
    existingMenu.remove()
  }

  const contextMenu = document.createElement("div")
  contextMenu.className = "mobile-context-menu"

  const copyText =
    currentLanguage === "en" ? "Copy message" : currentLanguage === "es" ? "Copiar mensaje" : "Copiar mensagem"

  contextMenu.innerHTML =
    `
    <button class="context-menu-item" onclick="copyMessageToClipboard(&quot;` +
    message.replace(/'/g, "\\'") +
    `&quot;)">
      <i class="fas fa-copy"></i> ` +
    copyText +
    `
    </button>
  `

  document.body.appendChild(contextMenu)

  const touch = event.touches[0]
  contextMenu.style.left = touch.clientX + "px"
  contextMenu.style.top = touch.clientY + "px"

  // Remove menu when clicking elsewhere
  setTimeout(() => {
    document.addEventListener(
      "click",
      () => {
        contextMenu.remove()
      },
      { once: true },
    )
  }, 100)
}

// Copy message to clipboard
function copyMessageToClipboard(message) {
  const cleanMessage = message.replace(/<[^>]*>/g, "") // Remove HTML tags
  navigator.clipboard.writeText(cleanMessage).then(() => {
    const copiedText =
      currentLanguage === "en"
        ? "Message copied!"
        : currentLanguage === "es"
          ? `¡Mensaje copiado!`
          : currentLanguage === "pt"
            ? `Mensagem copiada!`
            : "Message copied!"
    showToast(copiedText)
  })
}

// SISTEMA DE CONTROLE DE HOVER MELHORADO - Evita conflitos
const hoverTimeouts = {
  testimonials: null,
  gallery: null,
}

// Pause auto-advance on hover and manual interaction
document.addEventListener("DOMContentLoaded", () => {
  const testimonialsSection = document.querySelector(".testimonials")
  const gallerySection = document.querySelector(".gallery")

  if (testimonialsSection) {
    testimonialsSection.addEventListener("mouseenter", () => {
      console.log("🖱️ Mouse entrou na seção testimonials") // Debug

      // Limpar timeout anterior se existir
      if (hoverTimeouts.testimonials) {
        clearTimeout(hoverTimeouts.testimonials)
      }

      pauseAutoAdvance()
    })

    testimonialsSection.addEventListener("mouseleave", () => {
      console.log("🖱️ Mouse saiu da seção testimonials") // Debug

      // Usar timeout para evitar reativações muito rápidas
      hoverTimeouts.testimonials = setTimeout(() => {
        if (!isAutoAdvanceActive) {
          isAutoAdvanceActive = true
          startAutoAdvance()
        }
      }, 500)
    })
  }

  if (gallerySection) {
    gallerySection.addEventListener("mouseenter", () => {
      console.log("🖱️ Mouse entrou na seção gallery") // Debug

      // Limpar timeout anterior se existir
      if (hoverTimeouts.gallery) {
        clearTimeout(hoverTimeouts.gallery)
      }

      pauseAutoAdvance()
    })

    gallerySection.addEventListener("mouseleave", () => {
      console.log("🖱️ Mouse saiu da seção gallery") // Debug

      // Usar timeout para evitar reativações muito rápidas
      hoverTimeouts.gallery = setTimeout(() => {
        if (!isAutoAdvanceActive) {
          isAutoAdvanceActive = true
          startAutoAdvance()
        }
      }, 500)
    })
  }

  // Start auto-advance inicial
  startAutoAdvance()
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  // NOVA FUNCIONALIDADE: Verificar expiração do lead capture e inicializar cookies
  checkLeadCaptureExpiration()
  initializeCookieNotification()

  populateLocations()
  populateTestimonials()
  populateGallery()
  populateFAQ()
  populateAIQuestions()
  createTestimonialIndicators()
  createGalleryIndicators()
  setupLanguageSelector()
  setupFloatingButtons()
  initializeLanguageSystem()

  // INICIALIZAR FUNCIONALIDADE DE SWIPE
  initializeSwipeCarousels()

  // Add event listeners for carousel buttons
  document.getElementById("prevBtn").addEventListener("click", () => {
    prevTestimonials()
    pauseAutoAdvance()
  })
  document.getElementById("nextBtn").addEventListener("click", () => {
    nextTestimonials()
    pauseAutoAdvance()
  })
  document.getElementById("prevGalleryBtn").addEventListener("click", () => {
    prevGallery()
    pauseAutoAdvance()
  })
  document.getElementById("nextGalleryBtn").addEventListener("click", () => {
    nextGallery()
    pauseAutoAdvance()
  })
})

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    if (body.classList.contains("dark-mode")) {
      header.style.background = "rgba(10, 21, 37, 0.95)" // Usando #0a1525 com transparência
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)"
    }
    header.style.backdropFilter = "blur(10px)"
  } else {
    if (body.classList.contains("dark-mode")) {
      header.style.background = "#0a1525" // Cor correta do tema escuro
    } else {
      header.style.background = "white"
    }
    header.style.backdropFilter = "none"
  }
})

// Sistema de Analytics Simplificado (apenas tracking discreto)
function initSimpleAnalytics() {
  // Sistema básico de tracking que não interfere na experiência do usuário
  if (!window.grupofullanoAnalytics) {
    window.grupofullanoAnalytics = {
      trackVisit: function () {
        const visit = {
          timestamp: new Date().toISOString(),
          page: window.location.pathname,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
          language: navigator.language,
          screenResolution: `${screen.width}x${screen.height}`,
          sessionId: this.getSessionId(),
          device: this.getDeviceType(),
        }

        const analytics = JSON.parse(
          localStorage.getItem("grupofullano_analytics") ||
            '{"visitors":[],"chatbotInteractions":[],"devices":{},"locations":{},"pages":{}}',
        )

        analytics.visitors.push(visit)
        analytics.devices[visit.device] = (analytics.devices[visit.device] || 0) + 1
        analytics.pages[visit.page] = analytics.pages[visit.page] || { views: 0, totalTime: 0, bounces: 0 }
        analytics.pages[visit.page].views++

        localStorage.setItem("grupofullano_analytics", JSON.stringify(analytics))
      },

      trackChatbotInteraction: function (question, answer) {
        const interaction = {
          timestamp: new Date().toISOString(),
          question: question,
          answer: answer,
          sessionId: this.getSessionId(),
        }

        const analytics = JSON.parse(
          localStorage.getItem("grupofullano_analytics") ||
            '{"visitors":[],"chatbotInteractions":[],"devices":{},"locations":{},"pages":{}}',
        )
        analytics.chatbotInteractions.push(interaction)
        localStorage.setItem("grupofullano_analytics", JSON.stringify(analytics))
      },

      getSessionId: () => {
        let sessionId = sessionStorage.getItem("analytics_session_id")
        if (!sessionId) {
          sessionId = "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
          sessionStorage.setItem("analytics_session_id", sessionId)
        }
        return sessionId
      },

      getDeviceType: () => {
        const userAgent = navigator.userAgent.toLowerCase()
        if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
          return "Mobile"
        } else if (/tablet|ipad/i.test(userAgent)) {
          return "Tablet"
        } else {
          return "Desktop"
        }
      },
    }
  }

  // Registrar visita de forma discreta
  window.grupofullanoAnalytics.trackVisit()
}

// Inicializar analytics discreto quando a página carregar
initSimpleAnalytics()

// CORREÇÕES CRÍTICAS PARA DISPOSITIVOS MÓVEIS - SCROLL E TOUCH

// Função para detectar dispositivos móveis
function isMobileDevice() {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  )
}

// Função para corrigir problemas de scroll em dispositivos móveis
function fixMobileScrollIssues() {
  if (isMobileDevice()) {
    console.log("📱 Aplicando correções para dispositivos móveis")

    // Garantir que o body permita scroll
    document.body.style.overflow = "auto"
    document.body.style.overflowX = "hidden"
    document.body.style.webkitOverflowScrolling = "touch"
    document.body.style.height = "auto"
    document.body.style.minHeight = "100vh"

    // Garantir que o html permita scroll
    document.documentElement.style.overflow = "auto"
    document.documentElement.style.overflowX = "hidden"
    document.documentElement.style.webkitOverflowScrolling = "touch"
    document.documentElement.style.height = "auto"
    document.documentElement.style.minHeight = "100vh"

    // Remover qualquer position fixed problemático do body
    document.body.style.position = "relative"

    // Garantir que containers principais não bloqueiem scroll
    const containers = document.querySelectorAll(
      ".container, .hero, .locations, .about, .testimonials, .gallery, .faq, .footer",
    )
    containers.forEach((container) => {
      if (container) {
        container.style.overflow = "visible"
        container.style.position = "relative"
        container.style.maxWidth = "100vw"
      }
    })
  }
}

// Função para corrigir problemas específicos do iOS
function fixIOSScrollIssues() {
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    console.log("🍎 Aplicando correções específicas para iOS")

    // Prevenir zoom em inputs
    const inputs = document.querySelectorAll("input, select, textarea")
    inputs.forEach((input) => {
      if (input.style.fontSize === "" || Number.parseFloat(input.style.fontSize) < 16) {
        input.style.fontSize = "16px"
      }
    })

    // Corrigir problema de scroll no iOS Safari
    document.body.style.webkitTextSizeAdjust = "100%"
    document.body.style.msTextSizeAdjust = "100%"

    // Garantir que o viewport seja correto
    const viewport = document.querySelector('meta[name="viewport"]')
    if (viewport) {
      viewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
      )
    }
  }
}

// Função para corrigir problemas de touch em carrosséis
function fixCarouselTouchIssues() {
  const carousels = document.querySelectorAll(".testimonials-grid, .gallery-grid")
  carousels.forEach((carousel) => {
    if (carousel && isMobileDevice()) {
      carousel.style.touchAction = "pan-x"
      carousel.style.webkitOverflowScrolling = "touch"

      // Garantir que o carrossel seja scrollável
      carousel.style.overflowX = "auto"
      carousel.style.overflowY = "hidden"
    }
  })
}

// Função para corrigir modais em dispositivos móveis
function fixModalScrollIssues() {
  const modals = document.querySelectorAll(".ai-chat-modal, .cardapio-preview-modal, .translation-modal")
  modals.forEach((modal) => {
    if (modal && isMobileDevice()) {
      modal.style.position = "fixed"
      modal.style.top = "0"
      modal.style.left = "0"
      modal.style.right = "0"
      modal.style.bottom = "0"
      modal.style.overflow = "auto"
      modal.style.webkitOverflowScrolling = "touch"
    }
  })
}

// Função para garantir que o splash screen não bloqueie o scroll
function fixSplashScreenIssues() {
  const splashScreen = document.getElementById("splashScreen")
  if (splashScreen) {
    // Garantir que a splash screen seja removida corretamente
    splashScreen.addEventListener("transitionend", () => {
      if (splashScreen.classList.contains("fade-out")) {
        splashScreen.style.display = "none"
        splashScreen.remove()

        // Garantir que o scroll funcione após remover splash
        fixMobileScrollIssues()
      }
    })

    // Fallback para remover splash screen após 3 segundos
    setTimeout(() => {
      if (splashScreen && splashScreen.parentNode) {
        splashScreen.style.display = "none"
        splashScreen.remove()
        fixMobileScrollIssues()
      }
    }, 3000)
  }
}

// Função para corrigir problemas de altura em dispositivos móveis
function fixMobileHeightIssues() {
  if (isMobileDevice()) {
    // Corrigir altura do viewport em dispositivos móveis
    const setVH = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    setVH()
    window.addEventListener("resize", setVH)
    window.addEventListener("orientationchange", () => {
      setTimeout(setVH, 100)
    })
  }
}

// Função para prevenir problemas de scroll horizontal
function preventHorizontalScroll() {
  // Garantir que nenhum elemento cause scroll horizontal
  const allElements = document.querySelectorAll("*")
  allElements.forEach((element) => {
    const computedStyle = window.getComputedStyle(element)
    if (computedStyle.position === "fixed" || computedStyle.position === "absolute") {
      const rect = element.getBoundingClientRect()
      if (rect.right > window.innerWidth) {
        element.style.maxWidth = "100vw"
        element.style.right = "0"
      }
    }
  })
}

// Função para corrigir problemas de toque em elementos
function fixTouchIssues() {
  if (isMobileDevice()) {
    // Adicionar suporte a toque para elementos clicáveis
    const clickableElements = document.querySelectorAll(
      "button, a, .clickable, .card, .testimonial-card, .gallery-item",
    )
    clickableElements.forEach((element) => {
      element.style.cursor = "pointer"
      element.style.webkitTapHighlightColor = "rgba(0,0,0,0.1)"

      // Adicionar feedback visual para toque
      element.addEventListener(
        "touchstart",
        function () {
          this.style.opacity = "0.8"
        },
        { passive: true },
      )

      element.addEventListener(
        "touchend",
        function () {
          setTimeout(() => {
            this.style.opacity = "1"
          }, 150)
        },
        { passive: true },
      )
    })
  }
}

// Função para corrigir problemas específicos de navegadores móveis
function fixMobileBrowserIssues() {
  // Corrigir problema do Chrome mobile com position fixed
  if (/Chrome/.test(navigator.userAgent) && isMobileDevice()) {
    const fixedElements = document.querySelectorAll(".header, .floating-buttons")
    fixedElements.forEach((element) => {
      element.style.transform = "translateZ(0)"
      element.style.webkitTransform = "translateZ(0)"
    })
  }

  // Corrigir problema do Samsung Internet
  if (/SamsungBrowser/.test(navigator.userAgent)) {
    document.body.style.minHeight = "100vh"
    document.body.style.height = "auto"
  }
}

// Função principal para aplicar todas as correções móveis
function applyMobileFixesOnLoad() {
  console.log("🔧 Aplicando correções para dispositivos móveis...")

  fixMobileScrollIssues()
  fixIOSScrollIssues()
  fixCarouselTouchIssues()
  fixModalScrollIssues()
  fixSplashScreenIssues()
  fixMobileHeightIssues()
  fixTouchIssues()
  fixMobileBrowserIssues()

  // Aplicar correções após um pequeno delay para garantir que tudo carregou
  setTimeout(() => {
    preventHorizontalScroll()
    fixMobileScrollIssues()
  }, 500)

  console.log("✅ Correções móveis aplicadas com sucesso!")
}

// Função para reaplicar correções quando necessário
function reapplyMobileFixes() {
  if (isMobileDevice()) {
    fixMobileScrollIssues()
    preventHorizontalScroll()
  }
}

// Event listeners para aplicar correções
document.addEventListener("DOMContentLoaded", applyMobileFixesOnLoad)
window.addEventListener("load", applyMobileFixesOnLoad)
window.addEventListener("resize", reapplyMobileFixes)
window.addEventListener("orientationchange", () => {
  setTimeout(reapplyMobileFixes, 200)
})

// Aplicar correções imediatamente se o DOM já estiver carregado
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applyMobileFixesOnLoad)
} else {
  applyMobileFixesOnLoad()
}

// Correção específica para o problema de scroll travado
function forceScrollFix() {
  if (isMobileDevice()) {
    // Forçar reflow para corrigir problemas de scroll
    document.body.style.display = "none"
    document.body.offsetHeight // Trigger reflow
    document.body.style.display = ""

    // Garantir que o scroll funcione
    document.body.scrollTop = 0
    window.scrollTo(0, 0)

    // Aplicar correções novamente
    setTimeout(() => {
      fixMobileScrollIssues()
    }, 100)
  }
}

// Aplicar correção de scroll forçada após carregamento completo
window.addEventListener("load", () => {
  setTimeout(forceScrollFix, 1000)
})

// Monitorar mudanças no DOM que possam afetar o scroll
const scrollObserver = new MutationObserver((mutations) => {
  let shouldReapplyFixes = false

  mutations.forEach((mutation) => {
    if (mutation.type === "childList" || mutation.type === "attributes") {
      shouldReapplyFixes = true
    }
  })

  if (shouldReapplyFixes && isMobileDevice()) {
    setTimeout(reapplyMobileFixes, 100)
  }
})

// Iniciar observação do DOM
scrollObserver.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["style", "class"],
})

// Adicionar meta tag viewport se não existir
function ensureViewportMeta() {
  let viewport = document.querySelector('meta[name="viewport"]')
  if (!viewport) {
    viewport = document.createElement("meta")
    viewport.name = "viewport"
    viewport.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
    document.head.appendChild(viewport)
  } else {
    viewport.setAttribute(
      "content",
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
    )
  }
}

// Aplicar meta viewport
ensureViewportMeta()

console.log("📱 Sistema de correções móveis inicializado!")
