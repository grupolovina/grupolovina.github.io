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

// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle")
const themeIcon = document.getElementById("themeIcon")
const body = document.body

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem("theme") || "light"

// Apply saved theme on page load
if (savedTheme === "dark") {
  body.classList.add("dark-mode")
  themeIcon.className = "fas fa-moon"
} else {
  body.classList.remove("dark-mode")
  themeIcon.className = "fas fa-sun"
}

// Theme toggle event listener
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode")

  if (body.classList.contains("dark-mode")) {
    themeIcon.className = "fas fa-moon"
    localStorage.setItem("theme", "dark")
  } else {
    themeIcon.className = "fas fa-sun"
    localStorage.setItem("theme", "light")
  }
})

// Translations
const translations = {
  pt: {
    home: "Grupo Lovina",
    aboutUs: "Sobre nós",
    faq: "FAQ",
    reserveButton: "Reservar já",
    careersTitle: "Já pensou em trabalhar conosco?",
    careersDescription: "Envie seu currículo em algum dos números abaixo:",
    rh1Button: "RH 1",
    rh2Button: "RH 2",
  },
  en: {
    home: "Grupo Lovina",
    aboutUs: "About Us",
    faq: "FAQ",
    reserveButton: "Book Now",
    careersTitle: "Have you thought about working with us?",
    careersDescription: "Send your resume to one of the numbers below:",
    rh1Button: "HR 1",
    rh2Button: "HR 2",
  },
  es: {
    home: "Grupo Lovina",
    aboutUs: "Sobre Nosotros",
    faq: "Preguntas Frecuentes",
    reserveButton: "Reservar Ahora",
    careersTitle: "¿Has pensado en trabajar con nosotros?",
    careersDescription: "Envía tu currículum a uno de los números a continuación:",
    rh1Button: "RH 1",
    rh2Button: "RH 2",
  },
}

// Language management
let currentLanguage = localStorage.getItem("preferredLanguage") || "pt"

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
}

// Language selector event listeners
function setupLanguageSelector() {
  const languageToggle = document.getElementById("languageToggle")
  const languageDropdown = document.getElementById("languageDropdown")
  const languageOptions = document.querySelectorAll(".language-option")

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
}

// Initialize
function init() {
  setupLanguageSelector()
  changeLanguage(currentLanguage)
}

// Run initialization when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init)
} else {
  init()
}
