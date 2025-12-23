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
    generatorSubtitle: "Preencha os campos abaixo e gere seu currículo em PDF",
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
    generateButton: "Gerar Currículo em PDF",
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
  },
  en: {
    home: "Grupo Lovina",
    aboutUs: "About Us",
    faq: "FAQ",
    workWithUs: "Work With Us",
    reserveButton: "Book Now",
    generatorTitle: "Create Your Resume for Free",
    generatorSubtitle: "Fill in the fields below and generate your resume in PDF",
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
    generateButton: "Generate Resume PDF",
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
  },
  es: {
    home: "Grupo Lovina",
    aboutUs: "Sobre Nosotros",
    faq: "Preguntas Frecuentes",
    workWithUs: "Trabaje con Nosotros",
    reserveButton: "Reservar Ahora",
    generatorTitle: "Crea tu Currículum Gratis",
    generatorSubtitle: "Completa los campos a continuación y genera tu currículum en PDF",
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
    generateButton: "Generar Currículum en PDF",
    languagesTitle: "Idiomas",
    languageNameLabel: "Idioma",
    languageLevelLabel: "Nivel",
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

// Generate PDF
document.getElementById("resumeForm").addEventListener("submit", async (e) => {
  e.preventDefault()

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

  const languages = []
  document.querySelectorAll(".language-item").forEach((item) => {
    const name = item.querySelector(".language-name").value
    const level = item.querySelector(".language-level").value

    if (name && level) {
      languages.push({ name, level })
    }
  })

  // Generate PDF
  generatePDF(formData, experiences, education, languages, photoData)
})

function generatePDF(formData, experiences, education, languages, photo) {
  const { jsPDF } = window.jspdf

  const doc = new jsPDF()

  let yPosition = 20
  const leftMargin = 20
  const photoSize = 35
  const hasPhoto = photo !== null

  // Add photo if available
  if (hasPhoto) {
    doc.addImage(photo, "JPEG", 160, 15, photoSize, photoSize)
  }

  // Header with name
  doc.setFontSize(24) // Increased from 22
  doc.setTextColor(37, 99, 235)
  doc.text(formData.fullName, leftMargin, yPosition)
  yPosition += 10

  // Contact info
  doc.setFontSize(11) // Increased from 10
  doc.setTextColor(71, 85, 105)
  doc.text(`${formData.email} | ${formData.phone}`, leftMargin, yPosition)
  yPosition += 5
  if (formData.address) {
    doc.text(formData.address, leftMargin, yPosition)
    yPosition += 10
  } else {
    yPosition += 5
  }

  // Objective
  if (formData.objective) {
    yPosition += 5
    doc.setFontSize(15) // Increased from 14
    doc.setTextColor(30, 58, 138)
    doc.text(translations[currentLanguage].objectiveTitle, leftMargin, yPosition)
    yPosition += 8 // Increased spacing

    doc.setFontSize(11) // Increased from 10
    doc.setTextColor(51, 65, 85)
    const objectiveLines = doc.splitTextToSize(formData.objective, 170)
    doc.text(objectiveLines, leftMargin, yPosition)
    yPosition += objectiveLines.length * 5.5 + 5 // Increased line height
  }

  // Experience
  if (experiences.length > 0) {
    yPosition += 5
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
    }

    doc.setFontSize(15) // Increased from 14
    doc.setTextColor(30, 58, 138)
    doc.text(translations[currentLanguage].experienceTitle, leftMargin, yPosition)
    yPosition += 8 // Increased spacing

    experiences.forEach((exp) => {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }

      doc.setFontSize(12) // Increased from 11
      doc.setTextColor(37, 99, 235)
      doc.text(exp.position, leftMargin, yPosition)
      yPosition += 6 // Increased spacing

      doc.setFontSize(11) // Increased from 10
      doc.setTextColor(71, 85, 105)
      doc.text(`${exp.company} | ${exp.period}`, leftMargin, yPosition)
      yPosition += 6 // Increased spacing

      if (exp.activities) {
        doc.setTextColor(51, 65, 85)
        const activitiesLines = doc.splitTextToSize(exp.activities, 170)
        doc.text(activitiesLines, leftMargin, yPosition)
        yPosition += activitiesLines.length * 5.5 + 3 // Increased line height
      }

      yPosition += 3
    })
  }

  // Education
  if (education.length > 0) {
    yPosition += 5
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
    }

    doc.setFontSize(15) // Increased from 14
    doc.setTextColor(30, 58, 138)
    doc.text(translations[currentLanguage].educationTitle, leftMargin, yPosition)
    yPosition += 8 // Increased spacing

    education.forEach((edu) => {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }

      doc.setFontSize(12) // Increased from 11
      doc.setTextColor(37, 99, 235)
      doc.text(edu.course, leftMargin, yPosition)
      yPosition += 6 // Increased spacing

      doc.setFontSize(11) // Increased from 10
      doc.setTextColor(71, 85, 105)
      doc.text(`${edu.institution} | ${edu.period}`, leftMargin, yPosition)
      yPosition += 8
    })
  }

  if (languages.length > 0) {
    yPosition += 5
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
    }

    doc.setFontSize(15) // Increased from 14
    doc.setTextColor(30, 58, 138)
    doc.text(translations[currentLanguage].languagesTitle, leftMargin, yPosition)
    yPosition += 8 // Increased spacing

    doc.setFontSize(11) // Increased from 10
    doc.setTextColor(51, 65, 85)

    languages.forEach((lang) => {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }

      doc.text(`${lang.name}: ${lang.level}`, leftMargin, yPosition)
      yPosition += 6
    })
  }

  // Skills
  if (formData.skills) {
    yPosition += 5
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
    }

    doc.setFontSize(15) // Increased from 14
    doc.setTextColor(30, 58, 138)
    doc.text(translations[currentLanguage].skillsTitle, leftMargin, yPosition)
    yPosition += 8 // Increased spacing

    doc.setFontSize(11) // Increased from 10
    doc.setTextColor(51, 65, 85)
    const skillsLines = doc.splitTextToSize(formData.skills, 170)
    doc.text(skillsLines, leftMargin, yPosition)
  }

  // Save PDF
  doc.save(`curriculo_${formData.fullName.replace(/\s+/g, "_")}.pdf`)
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
