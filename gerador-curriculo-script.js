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
    workWithUs: "Trabalhe Conosco",
    reserveButton: "Reservar já",
    generatorTitle: "Cadastre-se no nosso sistema",
    generatorSubtitle: "Preencha os campos abaixo e envie seus dados",
    personalDataTitle: "Dados Pessoais",
    fullNameLabel: "Nome Completo",
    emailLabel: "E-mail",
    phoneLabel: "Telefone",
    addressLabel: "Endereço",
    objectiveTitle: "Objetivo Profissional",
    objectiveLabel: "Descreva seu objetivo e a sua pretensão de cargo [caso tenha]",
    experienceTitle: "Experiência Profissional",
    companyLabel: "Empresa",
    positionLabel: "Cargo",
    periodLabel: "Período",
    activitiesLabel: "Atividades",
    addExperienceButton: "Adicionar Experiência",
    educationTitle: "Formação Acadêmica",
    institutionLabel: "Instituição",
    courseLabel: "Curso",
    addEducationButton: "Adicionar Formação",
    skillsTitle: "Habilidades",
    skillsLabel: "Liste suas habilidades (separadas por vírgula)",
    generateButton: "Enviar Currículo",
    languagesTitle: "Idiomas",
    languageNameLabel: "Idioma",
    languageLevelLabel: "Nível",
    selectLevel: "Selecione",
    basicLevel: "Básico",
    intermediateLevel: "Intermediário",
    advancedLevel: "Avançado",
    fluentLevel: "Fluente",
    nativeLevel: "Nativo",
    addLanguageButton: "Adicionar Idioma",
    removeButton: "Remover",
    photoTitle: "Foto (Opcional)",
    uploadPhotoText: "Clique para adicionar foto",
    photoSizeHint: "Máximo: 10MB",
    removePhotoButton: "Remover Foto",
    successTitle: "Currículo Enviado com Sucesso!",
    successSubtitle: "Obrigado por se candidatar! Entraremos em contato em breve.",
    continueButton: "Voltar ao Início",
  },
  en: {
    home: "Grupo Lovina",
    aboutUs: "About Us",
    faq: "FAQ",
    workWithUs: "Work With Us",
    reserveButton: "Book Now",
    generatorTitle: "Register in our system",
    generatorSubtitle: "Fill in the fields below and submit your information",
    personalDataTitle: "Personal Information",
    fullNameLabel: "Full Name",
    emailLabel: "E-mail",
    phoneLabel: "Phone",
    addressLabel: "Address",
    objectiveTitle: "Professional Objective",
    objectiveLabel: "Describe your objective and desired position [if applicable].",
    experienceTitle: "Professional Experience",
    companyLabel: "Company",
    positionLabel: "Position",
    periodLabel: "Period",
    activitiesLabel: "Activities",
    addExperienceButton: "Add Experience",
    educationTitle: "Education",
    institutionLabel: "Institution",
    courseLabel: "Course",
    addEducationButton: "Add Education",
    skillsTitle: "Skills",
    skillsLabel: "List your skills (comma separated)",
    generateButton: "Submit Resume",
    languagesTitle: "Languages",
    languageNameLabel: "Language",
    languageLevelLabel: "Level",
    selectLevel: "Select",
    basicLevel: "Basic",
    intermediateLevel: "Intermediate",
    advancedLevel: "Advanced",
    fluentLevel: "Fluent",
    nativeLevel: "Native",
    addLanguageButton: "Add Language",
    removeButton: "Remove",
    photoTitle: "Photo (Optional)",
    uploadPhotoText: "Click to add photo",
    photoSizeHint: "Maximum: 10MB",
    removePhotoButton: "Remove Photo",
    successTitle: "Resume Submitted Successfully!",
    successSubtitle: "Thank you for applying! We will contact you soon.",
    continueButton: "Back to Home",
  },
  es: {
    home: "Grupo Lovina",
    aboutUs: "Sobre Nosotros",
    faq: "Preguntas Frecuentes",
    workWithUs: "Trabaje con Nosotros",
    reserveButton: "Reservar Ahora",
    generatorTitle: "Regístrese en nuestro sistema",
    generatorSubtitle: "Fill in the fields below and submit your information",
    personalDataTitle: "Datos Personales",
    fullNameLabel: "Nombre Completo",
    emailLabel: "Correo Electrónico",
    phoneLabel: "Teléfono",
    addressLabel: "Dirección",
    objectiveTitle: "Objetivo Profesional",
    objectiveLabel: "Describe tu objetivo y el puesto deseado [si corresponde].",
    experienceTitle: "Experiencia Profesional",
    companyLabel: "Empresa",
    positionLabel: "Cargo",
    periodLabel: "Período",
    activitiesLabel: "Actividades",
    addExperienceButton: "Agregar Experiencia",
    educationTitle: "Formación Académica",
    institutionLabel: "Institución",
    courseLabel: "Curso",
    addEducationButton: "Agregar Formación",
    skillsTitle: "Habilidades",
    skillsLabel: "Lista tus habilidades (separadas por coma)",
    generateButton: "Enviar Currículum",
    languagesTitle: "Idiomas",
    languageNameLabel: "Idioma",
    languageLevelLabel: "Nível",
    selectLevel: "Seleccione",
    basicLevel: "Básico",
    intermediateLevel: "Intermedio",
    advancedLevel: "Avanzado",
    fluentLevel: "Fluente",
    nativeLevel: "Nativo",
    addLanguageButton: "Agregar Idioma",
    removeButton: "Eliminar",
    photoTitle: "Foto (Opcional)",
    uploadPhotoText: "Haga clic para agregar foto",
    photoSizeHint: "Máximo: 10MB",
    removePhotoButton: "Eliminar Foto",
    successTitle: "¡Currículum Enviado con Éxito!",
    successSubtitle: "¡Gracias por postularte! Nos pondremos en contacto pronto.",
    continueButton: "Volver al Inicio",
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
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        // For inputs and textareas, update placeholder
        element.placeholder = translations[currentLanguage][key]
      } else if (element.tagName === "OPTION") {
        element.textContent = translations[currentLanguage][key]
      } else {
        element.innerHTML = translations[currentLanguage][key]
      }
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

// Add Experience
document.getElementById("addExperience").addEventListener("click", () => {
  const container = document.getElementById("experienceContainer")
  const newItem = document.querySelector(".experience-item").cloneNode(true)

  // Clear all inputs
  newItem.querySelectorAll("input, textarea").forEach((input) => {
    input.value = ""
  })

  container.appendChild(newItem)
})

function removeExperience(button) {
  const container = document.getElementById("experienceContainer")
  const items = container.querySelectorAll(".experience-item")

  // Keep at least one item
  if (items.length > 1) {
    button.closest(".experience-item").remove()
  } else {
    alert("Você precisa manter pelo menos uma experiência!")
  }
}

// Add Education
document.getElementById("addEducation").addEventListener("click", () => {
  const container = document.getElementById("educationContainer")
  const newItem = document.querySelector(".education-item").cloneNode(true)

  // Clear all inputs
  newItem.querySelectorAll("input").forEach((input) => {
    input.value = ""
  })

  container.appendChild(newItem)
})

function removeEducation(button) {
  const container = document.getElementById("educationContainer")
  const items = container.querySelectorAll(".education-item")

  // Keep at least one item
  if (items.length > 1) {
    button.closest(".education-item").remove()
  } else {
    alert("Você precisa manter pelo menos uma formação!")
  }
}

document.getElementById("addLanguage").addEventListener("click", () => {
  const container = document.getElementById("languagesContainer")
  const newItem = document.querySelector(".language-item").cloneNode(true)

  // Clear all inputs
  newItem.querySelectorAll("input, select").forEach((input) => {
    input.value = ""
  })

  container.appendChild(newItem)
  translatePage() // Re-translate after adding
})

function removeLanguage(button) {
  const container = document.getElementById("languagesContainer")
  const items = container.querySelectorAll(".language-item")

  // Allow removing all language items since it's optional
  if (items.length > 1) {
    button.closest(".language-item").remove()
  } else {
    // Clear the last item instead of removing
    const item = button.closest(".language-item")
    item.querySelectorAll("input, select").forEach((input) => {
      input.value = ""
    })
  }
}

document.getElementById("resumeForm").addEventListener("submit", async (e) => {
  e.preventDefault()

  const submitBtn = document.getElementById("submitBtn")
  const loadingSpinner = document.getElementById("loadingSpinner")
  const submitIcon = document.getElementById("submitIcon")

  // Show loading
  submitBtn.disabled = true
  loadingSpinner.style.display = "inline-block"
  submitIcon.style.display = "none"

  try {
    // Get form data
    const fullName = document.getElementById("fullName").value
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value
    const address = document.getElementById("address").value
    const objective = document.getElementById("objective").value
    const skills = document.getElementById("skills").value

    // Get experiences
    const experiences = []
    document.querySelectorAll(".experience-item").forEach((item) => {
      const company = item.querySelector(".experience-company").value
      const position = item.querySelector(".experience-position").value
      const period = item.querySelector(".experience-period").value
      const activities = item.querySelector(".experience-activities").value

      if (company || position || period || activities) {
        experiences.push({ company, position, period, activities })
      }
    })

    // Get education
    const education = []
    document.querySelectorAll(".education-item").forEach((item) => {
      const institution = item.querySelector(".education-institution").value
      const course = item.querySelector(".education-course").value
      const period = item.querySelector(".education-period").value

      if (institution || course || period) {
        education.push({ institution, course, period })
      }
    })

    // Get languages
    const languages = []
    document.querySelectorAll(".language-item").forEach((item) => {
      const name = item.querySelector(".language-name").value
      const level = item.querySelector(".language-level").value

      if (name && level) {
        languages.push({ name, level })
      }
    })

    // Format data for email
    const experiencesText = experiences
      .map(
        (exp, i) =>
          `${i + 1}. ${exp.position || "Cargo não informado"}\n   Empresa: ${exp.company || "Não informado"}\n   Período: ${exp.period || "Não informado"}\n   Atividades: ${exp.activities || "Não informado"}`,
      )
      .join("\n\n")

    const educationText = education
      .map(
        (edu, i) =>
          `${i + 1}. ${edu.course || "Curso não informado"}\n   Instituição: ${edu.institution || "Não informado"}\n   Período: ${edu.period || "Não informado"}`,
      )
      .join("\n\n")

    const languagesText = languages.map((lang) => `• ${lang.name}: ${lang.level}`).join("\n")

    // Populate hidden fields
    document.getElementById("hidden_fullName").value = fullName
    document.getElementById("hidden_email").value = email
    document.getElementById("hidden_phone").value = phone
    document.getElementById("hidden_address").value = address || "Não informado"
    document.getElementById("hidden_objective").value = objective || "Não informado"
    document.getElementById("hidden_experiences").value = experiencesText || "Não informado"
    document.getElementById("hidden_education").value = educationText || "Não informado"
    document.getElementById("hidden_languages").value = languagesText || "Não informado"
    document.getElementById("hidden_skills").value = skills || "Não informado"
    document.getElementById("hidden_replyto").value = email

    const form = document.getElementById("resumeForm")
    const formData = new FormData(form)

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    })

    const data = await response.json()

    if (data.success) {
      // Show success message
      document.querySelector(".resume-form").style.display = "none"
      document.getElementById("successMessage").style.display = "block"
    } else {
      throw new Error("Erro ao enviar")
    }
  } catch (error) {
    console.error("[v0] Erro:", error)
    alert("Erro ao enviar currículo. Por favor, tente novamente.")

    // Reset button
    submitBtn.disabled = false
    loadingSpinner.style.display = "none"
    submitIcon.style.display = "inline-block"
  }
})

// Continue button
document.getElementById("continueBtn").addEventListener("click", () => {
  window.location.href = "trabalhe-conosco.html"
})

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  setupLanguageSelector()
  changeLanguage(currentLanguage)
})
