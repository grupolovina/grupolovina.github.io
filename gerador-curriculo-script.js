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
    generatorTitle: "Crie seu Currículo Gratuitamente",
    generatorSubtitle: "Preencha os campos abaixo e envie seu currículo",
    personalDataTitle: "Dados Pessoais",
    fullNameLabel: "Nome Completo",
    emailLabel: "E-mail",
    phoneLabel: "Telefone",
    addressLabel: "Endereço",
    objectiveTitle: "Objetivo Profissional",
    objectiveLabel: "Descreva seu objetivo",
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
    generatorTitle: "Create Your Resume for Free",
    generatorSubtitle: "Fill in the fields below and submit your resume",
    personalDataTitle: "Personal Information",
    fullNameLabel: "Full Name",
    emailLabel: "E-mail",
    phoneLabel: "Phone",
    addressLabel: "Address",
    objectiveTitle: "Professional Objective",
    objectiveLabel: "Describe your objective",
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
    generatorTitle: "Crea tu Currículum Gratis",
    generatorSubtitle: "Completa los campos a continuación y envía tu currículum",
    personalDataTitle: "Datos Personales",
    fullNameLabel: "Nombre Completo",
    emailLabel: "Correo Electrónico",
    phoneLabel: "Teléfono",
    addressLabel: "Dirección",
    objectiveTitle: "Objetivo Profesional",
    objectiveLabel: "Describe tu objetivo",
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

let photoData = null

document.getElementById("photoUpload").addEventListener("change", (e) => {
  const file = e.target.files[0]

  if (!file) return

  // Check file size (10MB limit)
  if (file.size > 10 * 1024 * 1024) {
    alert("A foto deve ter no máximo 10MB!")
    e.target.value = ""
    return
  }

  const reader = new FileReader()

  reader.onload = (event) => {
    photoData = event.target.result
    const preview = document.getElementById("photoPreview")
    preview.innerHTML = `<img src="${photoData}" alt="Preview">`
    preview.classList.add("has-image")
    document.getElementById("removePhoto").style.display = "inline-flex"
  }

  reader.readAsDataURL(file)
})

document.getElementById("removePhoto").addEventListener("click", () => {
  photoData = null
  document.getElementById("photoUpload").value = ""
  const preview = document.getElementById("photoPreview")
  preview.classList.remove("has-image")
  preview.innerHTML = `
    <i class="fas fa-user-circle photo-placeholder-icon"></i>
    <p data-translate="uploadPhotoText">Clique para adicionar foto</p>
    <p class="photo-size-hint" data-translate="photoSizeHint">Máximo: 10MB</p>
  `
  document.getElementById("removePhoto").style.display = "none"
  translatePage() // Re-translate after removing
})

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
    const formData = {
      fullName: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value,
      objective: document.getElementById("objective").value,
      skills: document.getElementById("skills").value,
    }

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

    // Submit to Web3Forms
    await submitToWeb3Forms(formData, experiences, education, languages, photoData)
  } catch (error) {
    console.error("Erro ao enviar currículo:", error)
    alert("Erro ao enviar currículo. Por favor, tente novamente.")
    submitBtn.disabled = false
    loadingSpinner.style.display = "none"
    submitIcon.style.display = "inline-block"
  }
})

async function submitToWeb3Forms(formData, experiences, education, languages, photo) {
  // Format the email message
  let emailMessage = `
=================================
NOVO CURRÍCULO RECEBIDO
=================================

DADOS PESSOAIS
---------------------------------
Nome: ${formData.fullName}
E-mail: ${formData.email}
Telefone: ${formData.phone}
Endereço: ${formData.address || "Não informado"}

`

  if (formData.objective) {
    emailMessage += `
OBJETIVO PROFISSIONAL
---------------------------------
${formData.objective}

`
  }

  if (experiences.length > 0) {
    emailMessage += `
EXPERIÊNCIA PROFISSIONAL
---------------------------------
`
    experiences.forEach((exp, index) => {
      emailMessage += `
${index + 1}. ${exp.position || "Cargo não informado"}
   Empresa: ${exp.company || "Não informado"}
   Período: ${exp.period || "Não informado"}
   Atividades: ${exp.activities || "Não informado"}
`
    })
    emailMessage += "\n"
  }

  if (education.length > 0) {
    emailMessage += `
FORMAÇÃO ACADÊMICA
---------------------------------
`
    education.forEach((edu, index) => {
      emailMessage += `
${index + 1}. ${edu.course || "Curso não informado"}
   Instituição: ${edu.institution || "Não informado"}
   Período: ${edu.period || "Não informado"}
`
    })
    emailMessage += "\n"
  }

  if (languages.length > 0) {
    emailMessage += `
IDIOMAS
---------------------------------
`
    languages.forEach((lang) => {
      emailMessage += `• ${lang.name}: ${lang.level}\n`
    })
    emailMessage += "\n"
  }

  if (formData.skills) {
    emailMessage += `
HABILIDADES
---------------------------------
${formData.skills}

`
  }

  emailMessage += `
=================================
Currículo enviado via Sistema de Currículos - Grupo Lovina
=================================
`

  // Prepare FormData for Web3Forms
  const web3FormData = new FormData()
  web3FormData.append("access_key", "YOUR_WEB3FORMS_ACCESS_KEY") // Replace with actual key
  web3FormData.append("subject", `Novo Currículo: ${formData.fullName}`)
  web3FormData.append("from_name", "Sistema de Currículos - Grupo Lovina")
  web3FormData.append("name", formData.fullName)
  web3FormData.append("email", formData.email)
  web3FormData.append("phone", formData.phone)
  web3FormData.append("message", emailMessage)
  web3FormData.append("replyto", formData.email)

  // Add photo as attachment if present
  if (photo) {
    web3FormData.append("attachment", photo)
  }

  // Submit to Web3Forms
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: web3FormData,
  })

  const result = await response.json()

  if (response.ok) {
    // Show success message
    showSuccessMessage()
  } else {
    throw new Error(result.message || "Erro ao enviar currículo")
  }
}

function showSuccessMessage() {
  const form = document.querySelector(".resume-form")
  const successMessage = document.getElementById("successMessage")

  form.style.display = "none"
  successMessage.style.display = "block"

  // Setup continue button
  document.getElementById("continueBtn").addEventListener("click", () => {
    window.location.href = "trabalhe-conosco.html"
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
