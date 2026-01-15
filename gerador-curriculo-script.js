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

    const { jsPDF } = window.jspdf
    const doc = new jsPDF()

    const primaryColor = [33, 101, 155] // #21659B
    const secondaryColor = [83, 215, 183] // #53D7B7
    const textColor = [50, 50, 50]
    const lightGray = [128, 128, 128]

    let yPosition = 20

    // Add photo if exists
    if (photoData) {
      try {
        doc.addImage(photoData, "JPEG", 160, yPosition, 35, 35)
      } catch (error) {
        console.error("[v0] Erro ao adicionar foto ao PDF:", error)
      }
    }

    // Header with name
    doc.setFontSize(24)
    doc.setTextColor(...primaryColor)
    doc.text(fullName || "Nome Completo", 20, yPosition)
    yPosition += 10

    // Contact info
    doc.setFontSize(11)
    doc.setTextColor(...textColor)
    if (email) doc.text(`Email: ${email}`, 20, yPosition)
    yPosition += 6
    if (phone) doc.text(`Telefone: ${phone}`, 20, yPosition)
    yPosition += 6
    if (address) doc.text(`Endereço: ${address}`, 20, yPosition)
    yPosition += 12

    // Objective
    if (objective) {
      doc.setFontSize(14)
      doc.setTextColor(...primaryColor)
      doc.text("Objetivo Profissional", 20, yPosition)
      yPosition += 8
      doc.setFontSize(11)
      doc.setTextColor(...textColor)
      const objectiveLines = doc.splitTextToSize(objective, 170)
      doc.text(objectiveLines, 20, yPosition)
      yPosition += objectiveLines.length * 6 + 6
    }

    // Experience
    if (experiences.length > 0) {
      doc.setFontSize(14)
      doc.setTextColor(...primaryColor)
      doc.text("Experiência Profissional", 20, yPosition)
      yPosition += 8

      experiences.forEach((exp) => {
        if (yPosition > 250) {
          doc.addPage()
          yPosition = 20
        }

        doc.setFontSize(12)
        doc.setTextColor(...textColor)
        doc.text(exp.position || "Cargo não informado", 20, yPosition)
        yPosition += 6

        doc.setFontSize(10)
        doc.setTextColor(...lightGray)
        doc.text(`${exp.company || "Empresa"} | ${exp.period || "Período"}`, 20, yPosition)
        yPosition += 6

        if (exp.activities) {
          doc.setFontSize(10)
          doc.setTextColor(...textColor)
          const activityLines = doc.splitTextToSize(exp.activities, 170)
          doc.text(activityLines, 20, yPosition)
          yPosition += activityLines.length * 5 + 4
        }
        yPosition += 4
      })
      yPosition += 4
    }

    // Education
    if (education.length > 0) {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }

      doc.setFontSize(14)
      doc.setTextColor(...primaryColor)
      doc.text("Formação Acadêmica", 20, yPosition)
      yPosition += 8

      education.forEach((edu) => {
        if (yPosition > 270) {
          doc.addPage()
          yPosition = 20
        }

        doc.setFontSize(12)
        doc.setTextColor(...textColor)
        doc.text(edu.course || "Curso não informado", 20, yPosition)
        yPosition += 6

        doc.setFontSize(10)
        doc.setTextColor(...lightGray)
        doc.text(`${edu.institution || "Instituição"} | ${edu.period || "Período"}`, 20, yPosition)
        yPosition += 8
      })
      yPosition += 4
    }

    // Languages
    if (languages.length > 0) {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }

      doc.setFontSize(14)
      doc.setTextColor(...primaryColor)
      doc.text("Idiomas", 20, yPosition)
      yPosition += 8

      languages.forEach((lang) => {
        if (yPosition > 270) {
          doc.addPage()
          yPosition = 20
        }

        doc.setFontSize(11)
        doc.setTextColor(...textColor)
        doc.text(`• ${lang.name}: ${lang.level}`, 20, yPosition)
        yPosition += 6
      })
      yPosition += 4
    }

    // Skills
    if (skills) {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }

      doc.setFontSize(14)
      doc.setTextColor(...primaryColor)
      doc.text("Habilidades", 20, yPosition)
      yPosition += 8

      doc.setFontSize(11)
      doc.setTextColor(...textColor)
      const skillsLines = doc.splitTextToSize(skills, 170)
      doc.text(skillsLines, 20, yPosition)
    }

    const pdfBlob = doc.output("blob")

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

    // Add PDF as attachment
    formData.append("attachment", pdfBlob, `Curriculo_${fullName.replace(/\s+/g, "_")}.pdf`)

    console.log("[v0] Enviando dados para Web3Forms com PDF anexado...") // Debug

    // Submit to Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    })

    console.log("[v0] Resposta recebida:", response.status) // Debug

    const result = await response.json()

    if (response.ok && result.success) {
      console.log("[v0] Currículo enviado com sucesso!") // Debug
      showSuccessMessage()
    } else {
      throw new Error(result.message || "Erro ao enviar currículo")
    }
  } catch (error) {
    console.error("[v0] Erro ao enviar currículo:", error)

    // Get error messages by language
    const errorMessages = {
      pt: "Erro ao enviar currículo. Por favor, tente novamente.",
      en: "Error submitting resume. Please try again.",
      es: "Error al enviar currículum. Por favor, inténtelo de nuevo.",
    }

    alert(errorMessages[currentLanguage] || errorMessages.pt)

    submitBtn.disabled = false
    loadingSpinner.style.display = "none"
    submitIcon.style.display = "inline-block"
  }
})

function showSuccessMessage() {
  const form = document.querySelector(".resume-form")
  const successMessage = document.getElementById("successMessage")

  form.style.display = "none"
  successMessage.style.display = "block"

  // Setup continue button
  const continueBtn = document.getElementById("continueBtn")
  continueBtn.onclick = () => {
    window.location.href = "trabalhe-conosco.html"
  }
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
