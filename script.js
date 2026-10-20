/**
 * MAHS ELEVATOR, C.A. - Landing Page Corporativa
 * Ingeniería que Eleva Confianza | Registro SENCAMER ASC1629
 * Dirección Técnica: Ingeniero Mecánico CIV N.º 25.654
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Elementos Principales del DOM
  const siteHeader = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const currentYearSpan = document.getElementById('currentYear');
  
  // Semaphore elements
  const lightButtons = document.querySelectorAll('.semaphore-light-btn');
  const detailPill = document.getElementById('detailPill');
  const detailTimeline = document.getElementById('detailTimeline');
  const detailTitle = document.getElementById('detailTitle');
  const detailText = document.getElementById('detailText');
  const detailParams = document.getElementById('detailParams');
  const detailAction = document.getElementById('detailAction');

  // Form & Stepper Elements
  const form = document.getElementById('inspectionForm');
  const submitBtn = document.getElementById('submitBtn');
  const stepInc = document.getElementById('stepInc');
  const stepDec = document.getElementById('stepDec');
  const unitCountInput = document.getElementById('unitCount');
  const suggestedDateInput = document.getElementById('suggestedDate');

  // Modal Elements
  const confirmationModal = document.getElementById('confirmationModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalOkBtn = document.getElementById('modalOkBtn');
  const modalSummary = document.getElementById('modalSummary');
  const modalWhatsappSyncBtn = document.getElementById('modalWhatsappSyncBtn');

  // FAQ Elements
  const faqItems = document.querySelectorAll('.faq-item');

  // Set current year in footer
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Set minimum date for suggested inspection to tomorrow
  if (suggestedDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDateStr = tomorrow.toISOString().split('T')[0];
    suggestedDateInput.min = minDateStr;
  }

  // -------------------------------------------------------------
  // 2. HEADER SCROLL EFFECT & ACTIVE NAVIGATION LINK
  // -------------------------------------------------------------
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // -------------------------------------------------------------
  // 3. MOBILE MENU TOGGLE
  // -------------------------------------------------------------
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  function openMobileMenu() {
    mobileNav.classList.add('open');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileNav.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // -------------------------------------------------------------
  // 4. CRITERIO SEMAFÓRICO INTERACTIVO
  // -------------------------------------------------------------
  const semaphoreData = {
    green: {
      pillClass: 'green-pill',
      pillHtml: '<span class="dot green"></span><span>CRITERIO VERDE: OPERACIÓN ACEPTABLE</span>',
      timeline: 'Mantenimiento Periódico Programable',
      title: 'El equipo opera dentro de tolerancias nominales de seguridad y confort.',
      text: 'Los sistemas de suspensión, tracción, freno electromecánico, paracaídas y seguridades de puerta cumplen con las holguras y tolerancias estipuladas en las normas COVENIN 621. No existe riesgo inminente para los usuarios.',
      params: [
        'Desgaste de cables inferior al 5% sin alambres rotos visibles.',
        'Freno de tracción con zapata uniforme y tiempo de respuesta nominal.',
        'Cerraduras de puertas con enclavamiento mecánico y contacto eléctrico óptimo.',
        'Nivelación en parada con precisión menor a ±5 mm.'
      ],
      actionHtml: `
        <p><strong>Régimen:</strong> Mantenimiento Preventivo Regular.</p>
        <p>Mantener las rutinas mensuales de lubricación, limpieza de foso, ajuste de zapatas y revisión periódica de niveles de aceite en reductor.</p>
        <div class="action-badge-tag ok">Apto para Servicio Público y Residencial</div>
      `
    },
    yellow: {
      pillClass: 'yellow-pill',
      pillHtml: '<span class="dot yellow"></span><span>CRITERIO AMARILLO: OPERACIÓN CONDICIONADA</span>',
      timeline: 'Intervención Requerida en Plazo < 15 a 30 Días',
      title: 'Desgastes prematuros o descalibraciones que requieren atención técnica prioritaria.',
      text: 'El equipo puede continuar prestando servicio de manera provisional, pero presenta síntomas de fatiga o holguras que de no corregirse a tiempo generarán paradas no programadas o daños colaterales de alto costo.',
      params: [
        'Holgura excesiva en guiaderas o patines que ocasiona vibraciones en cabina.',
        'Desgaste incipiente en canales de polea de tracción o juego axial en reductor.',
        'Desfase de nivelación mayor a ±15 mm con riesgo de tropiezo de pasajeros.',
        'Retardo en tiempos de apertura/cierre o desajuste de patín retráctil.'
      ],
      actionHtml: `
        <p><strong>Régimen:</strong> Mantenimiento Correctivo Programado.</p>
        <p>Reemplazo planificado de piezas de fricción, calibración de operador de puerta y ajuste de variador de frecuencia (VVVF) antes de que derive en falla crítica.</p>
        <div class="action-badge-tag warn">Atención Prioritaria sin Parada Forzosa</div>
      `
    },
    red: {
      pillClass: 'red-pill',
      pillHtml: '<span class="dot red"></span><span>CRITERIO ROJO: RIESGO CRÍTICO / PARADA</span>',
      timeline: 'PARADA INMEDIATA • Intervención de Emergencia',
      title: 'Compromiso severo de seguridad humana o daño estructural inminente.',
      text: 'Bajo mandato estricto de las normas COVENIN 621 y dictamen del Ingeniero Mecánico, el equipo debe ser desenergizado y puesto fuera de servicio de forma inmediata para salvaguardar la integridad de los pasajeros.',
      params: [
        'Rotura de alambres en cables de tracción superando el límite de seguridad normativo.',
        'Falla en bobina de freno electromecánico o deslizamiento incontrolado de cabina.',
        'Puentes eléctricos irregulares en contactos de seguridad de puertas o finales de carrera.',
        'Desplazamiento de guías, contrapesos desalineados o fisuras tras un sismo.'
      ],
      actionHtml: `
        <p><strong>Régimen:</strong> Desconexión y Bloqueo (LOTO) Inmediato.</p>
        <p>Colocación de precintos de advertencia, informe pericial urgente al condominio y sustitución prioritaria de los subsistemas comprometidos con pruebas de carga reglamentarias.</p>
        <div class="action-badge-tag danger">ALTO RIESGO • Parada Obligatoria por Norma COVENIN 621</div>
      `
    }
  };

  lightButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const level = btn.getAttribute('data-light');
      
      lightButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const data = semaphoreData[level];
      if (data) {
        detailPill.className = `status-pill ${data.pillClass}`;
        detailPill.innerHTML = data.pillHtml;
        detailTimeline.textContent = data.timeline;
        detailTitle.textContent = data.title;
        detailText.textContent = data.text;

        detailParams.innerHTML = data.params.map(item => `<li>${item}</li>`).join('');
        detailAction.innerHTML = data.actionHtml;
      }
    });
  });

  // -------------------------------------------------------------
  // 5. STEPPER DE CANTIDAD DE UNIDADES
  // -------------------------------------------------------------
  if (stepInc && stepDec && unitCountInput) {
    stepInc.addEventListener('click', () => {
      let currentVal = parseInt(unitCountInput.value, 10) || 1;
      if (currentVal < 25) {
        unitCountInput.value = currentVal + 1;
      }
    });

    stepDec.addEventListener('click', () => {
      let currentVal = parseInt(unitCountInput.value, 10) || 1;
      if (currentVal > 1) {
        unitCountInput.value = currentVal - 1;
      }
    });
  }

  // -------------------------------------------------------------
  // 6. ACCORDION DE PREGUNTAS FRECUENTES (FAQ)
  // -------------------------------------------------------------
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => {
          other.classList.remove('active');
          const btn = other.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // -------------------------------------------------------------
  // 7. ENVÍO Y VALIDACIÓN DEL FORMULARIO DE INSPECCIÓN
  // -------------------------------------------------------------
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      if (btnText && btnLoading) {
        btnText.classList.add('d-none');
        btnLoading.classList.remove('d-none');
        submitBtn.disabled = true;
      }

      const formData = {
        name: document.getElementById('contactName').value.trim(),
        company: document.getElementById('companyName').value.trim(),
        email: document.getElementById('contactEmail').value.trim(),
        phone: document.getElementById('contactPhone').value.trim(),
        address: document.getElementById('address').value.trim(),
        equipmentType: document.getElementById('equipmentType').value,
        unitCount: document.getElementById('unitCount').value,
        requirement: document.getElementById('requirement').value,
        suggestedDate: document.getElementById('suggestedDate').value,
        description: document.getElementById('description').value.trim()
      };

      // Construct formatted structured WhatsApp message
      const waText = encodeURIComponent(
        `🚨 *SOLICITUD DE INSPECCIÓN TÉCNICA - MAHS ELEVATOR, C.A.* 🚨\n\n` +
        `👤 *Contacto:* ${formData.name}\n` +
        `🏢 *Empresa / Condominio:* ${formData.company}\n` +
        `📞 *Teléfono:* ${formData.phone}\n` +
        `📧 *Correo:* ${formData.email}\n` +
        `📍 *Dirección:* ${formData.address}\n` +
        `⚙️ *Equipo:* ${formData.equipmentType} (${formData.unitCount} unidad/es)\n` +
        `🔧 *Requerimiento:* ${formData.requirement}\n` +
        `📅 *Fecha Sugerida:* ${formData.suggestedDate}\n` +
        (formData.description ? `📝 *Antecedentes:* ${formData.description}\n\n` : `\n`) +
        `Solicito visita técnica formal con Ingeniero Mecánico CIV N.º 25.654 (SENCAMER ASC1629).`
      );

      const waUrl = `https://wa.me/584141015339?text=${waText}`;

      // Dispatch notification to elevatormahs@gmail.com
      try {
        const emailPromise = fetch("https://formsubmit.co/ajax/elevatormahs@gmail.com", {
          method: "POST",
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `Nueva Inspección Solicitada: ${formData.company} (${formData.equipmentType})`,
            "Nombre del Contacto": formData.name,
            "Empresa o Condominio": formData.company,
            "Teléfono de Contacto": formData.phone,
            "Correo del Solicitante": formData.email,
            "Dirección del Inmueble": formData.address,
            "Tipo de Equipo": formData.equipmentType,
            "Cantidad de Unidades": formData.unitCount,
            "Requerimiento": formData.requirement,
            "Fecha Sugerida de Visita": formData.suggestedDate,
            "Descripción del Problema": formData.description || "No indicada",
            _template: "table"
          })
        });

        const timeoutPromise = new Promise(resolve => setTimeout(resolve, 1500));
        await Promise.race([emailPromise, timeoutPromise]);
      } catch (err) {
        console.warn("Aviso de despacho de correo (modo offline o fallback):", err);
      }

      // Populate Modal Summary
      if (modalSummary) {
        modalSummary.innerHTML = `
          <div><strong>Empresa / Condominio:</strong> ${escapeHtml(formData.company)}</div>
          <div><strong>Contacto:</strong> ${escapeHtml(formData.name)} (${escapeHtml(formData.phone)})</div>
          <div><strong>Ubicación:</strong> ${escapeHtml(formData.address)}</div>
          <div><strong>Servicio:</strong> ${escapeHtml(formData.requirement)} — ${escapeHtml(formData.equipmentType)} (${formData.unitCount} unid.)</div>
          <div><strong>Fecha Sugerida:</strong> ${formData.suggestedDate}</div>
          <div><strong>Destino de Notificación:</strong> elevatormahs@gmail.com</div>
        `;
      }

      // Configure WhatsApp sync button in modal
      if (modalWhatsappSyncBtn) {
        modalWhatsappSyncBtn.href = waUrl;
      }

      // Open modal
      openModal();

      // Form reset
      form.reset();
      document.getElementById('unitCount').value = "1";

      if (btnText && btnLoading) {
        btnText.classList.remove('d-none');
        btnLoading.classList.add('d-none');
        submitBtn.disabled = false;
      }
    });
  }

  // -------------------------------------------------------------
  // 8. VALIDACIÓN DE FORMULARIO
  // -------------------------------------------------------------
  function validateForm() {
    let isValid = true;

    // Contact Name
    const nameField = document.getElementById('contactName');
    if (!nameField.value.trim()) {
      showFieldError('contactName', 'nameError');
      isValid = false;
    } else {
      clearFieldError('contactName', 'nameError');
    }

    // Company Name
    const companyField = document.getElementById('companyName');
    if (!companyField.value.trim()) {
      showFieldError('companyName', 'companyError');
      isValid = false;
    } else {
      clearFieldError('companyName', 'companyError');
    }

    // Email
    const emailField = document.getElementById('contactEmail');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value.trim())) {
      showFieldError('contactEmail', 'emailError');
      isValid = false;
    } else {
      clearFieldError('contactEmail', 'emailError');
    }

    // Phone
    const phoneField = document.getElementById('contactPhone');
    if (phoneField.value.trim().length < 7) {
      showFieldError('contactPhone', 'phoneError');
      isValid = false;
    } else {
      clearFieldError('contactPhone', 'phoneError');
    }

    // Address
    const addressField = document.getElementById('address');
    if (!addressField.value.trim()) {
      showFieldError('address', 'addressError');
      isValid = false;
    } else {
      clearFieldError('address', 'addressError');
    }

    // Equipment Type
    const equipmentField = document.getElementById('equipmentType');
    if (!equipmentField.value) {
      showFieldError('equipmentType', 'equipmentError');
      isValid = false;
    } else {
      clearFieldError('equipmentType', 'equipmentError');
    }

    // Requirement
    const reqField = document.getElementById('requirement');
    if (!reqField.value) {
      showFieldError('requirement', 'reqError');
      isValid = false;
    } else {
      clearFieldError('requirement', 'reqError');
    }

    // Date
    const dateField = document.getElementById('suggestedDate');
    if (!dateField.value) {
      showFieldError('suggestedDate', 'dateError');
      isValid = false;
    } else {
      clearFieldError('suggestedDate', 'dateError');
    }

    if (!isValid) {
      const firstError = document.querySelector('.has-error input, .has-error select');
      if (firstError) {
        firstError.focus();
      }
    }

    return isValid;
  }

  function showFieldError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    if (field && field.closest('.form-group')) {
      field.closest('.form-group').classList.add('has-error');
    }
  }

  function clearFieldError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    if (field && field.closest('.form-group')) {
      field.closest('.form-group').classList.remove('has-error');
    }
  }

  const allInputs = document.querySelectorAll('#inspectionForm input, #inspectionForm select');
  allInputs.forEach(input => {
    input.addEventListener('input', () => {
      const parent = input.closest('.form-group');
      if (parent) parent.classList.remove('has-error');
    });
    input.addEventListener('change', () => {
      const parent = input.closest('.form-group');
      if (parent) parent.classList.remove('has-error');
    });
  });

  // -------------------------------------------------------------
  // 9. MODAL CONTROL
  // -------------------------------------------------------------
  function openModal() {
    if (confirmationModal) {
      confirmationModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (confirmationModal) {
      confirmationModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOkBtn) modalOkBtn.addEventListener('click', closeModal);

  if (confirmationModal) {
    confirmationModal.addEventListener('click', (e) => {
      if (e.target === confirmationModal) {
        closeModal();
      }
    });
  }

  function escapeHtml(string) {
    const div = document.createElement('div');
    div.innerText = string;
    return div.innerHTML;
  }
});

// Helper globally exposed for service card CTA buttons
window.preselectRequirement = function(reqValue) {
  const reqSelect = document.getElementById('requirement');
  if (reqSelect) {
    for (let i = 0; i < reqSelect.options.length; i++) {
      if (reqSelect.options[i].text.toLowerCase().includes(reqValue.toLowerCase()) || 
          reqSelect.options[i].value.toLowerCase().includes(reqValue.toLowerCase())) {
        reqSelect.selectedIndex = i;
        break;
      }
    }
  }
};
