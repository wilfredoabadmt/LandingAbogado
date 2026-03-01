// ============ FAQ DATA ============
const faqData = [
  { q: "¿La evaluación inicial es realmente gratuita?", a: "Sí. Son 20 minutos sin coste ni compromiso. Te decimos si tienes caso, si estás en plazo y cuáles son las opciones. Si el plazo ha pasado, también te lo decimos — sin cobrarte por esa información." },
  { q: "¿Cuánto cuesta un abogado para mi tipo de caso?", a: "Depende del caso, su complejidad y la fase en que se encuentra. Antes de empezar recibes el coste por escrito. Si no puedes asumir los honorarios, te informamos de si calificas para asistencia jurídica gratuita. Cuanto más pronto contactes, más opciones hay." },
  { q: "¿Tengo posibilidades en mi caso?", a: "No prometemos resultados. Analizamos los puntos fuertes y débiles de tu situación y te explicamos qué escenarios son realistas — incluyendo si actuar o no actuar tiene consecuencias económicas." },
  { q: "¿Cuánto tarda el proceso?", a: "Depende del juzgado, el tipo de caso y si hay posibilidad de acuerdo. Te damos estimaciones reales desde el principio y te informamos en cada hito del procedimiento para que sepas exactamente en qué punto estás." },
  { q: "Tengo una citación judicial para la próxima semana. ¿Puedo contactaros ahora?", a: "Sí, y debes hacerlo cuanto antes. Una citación judicial requiere preparación. Contáctanos con la fecha y el tipo de citación y valoramos tu situación de inmediato." },
  { q: "¿Me deben dinero pero no sé si puedo reclamarlo a estas alturas?", a: "Los plazos de prescripción en civil varían: genérico 5 años, pero hay supuestos de 1 o 2 años. Dinos cuándo fue el impago — lo primero que hacemos es comprobar si seguimos a tiempo." },
  { q: "¿Cómo sé que mi caso no se va a quedar en un cajón?", a: "Cada caso tiene un abogado asignado. Te informamos en cada notificación relevante — escritos, resoluciones, citaciones — sin que tengas que llamar para preguntar." },
  { q: "¿Qué documentos necesito para la primera consulta?", a: "Cualquier documento relacionado: contrato, carta de despido, notificación judicial, facturas. Si no tienes nada, cuéntanos lo que recuerdas. Lo importante es no esperar por no tener \"todo\" listo — algunos plazos corren mientras buscas documentos." },
  { q: "¿Hablaré con el abogado o con un asistente?", a: "Con el abogado asignado a tu caso. La consulta, las decisiones y la comunicación clave son siempre directas con el abogado. Cuando llegue una notificación importante, te lo comunica él." },
  { q: "¿Solo lleváis penal, civil y laboral?", a: "Sí. Son las 3 áreas en las que trabajamos. Si tu caso cae fuera, te lo decimos en la primera consulta y te orientamos. No cogemos casos fuera de nuestra especialización." },
  { q: "Me han despedido. ¿Tengo que hacer algo urgente?", a: "Sí. El plazo para impugnar un despido es de 20 días hábiles desde la fecha de efectividad. No desde que recibes la carta — desde que el despido es efectivo. Contacta antes de que pase ese plazo." },
  { q: "¿Puedo usar mi seguro de defensa jurídica?", a: "En muchos casos sí. Revisamos contigo si la póliza cubre tu situación. Algunas pólizas tienen plazos de comunicación del siniestro — si tienes seguro, revisa ese plazo también." },
  { q: "¿Mi información es confidencial?", a: "Sí. Todo lo que nos cuentes está protegido por el secreto profesional del abogado — una obligación deontológica y legal, no una promesa de marketing." },
  { q: "¿Atendéis solo en persona o también por videollamada?", a: "Tenemos despacho físico. También atendemos por videollamada. Que no puedas venir en persona no es razón para retrasar la consulta — y en algunos casos, el tiempo importa." }
];

// ============ MOTIVO OPTIONS ============
const motivoOpts = {
  penal: [{ v: "detencion", t: "Detención o asistencia en comisaría" }, { v: "investigado", t: "Citación como investigado/a" }, { v: "testigo", t: "Citación como testigo" }, { v: "victima", t: "Citación como perjudicado/víctima" }, { v: "investigacion", t: "Investigación judicial en curso" }, { v: "recurso", t: "Recurso de sentencia penal" }, { v: "otro", t: "Otro" }],
  civil: [{ v: "impago", t: "Impago de deuda o factura" }, { v: "contrato", t: "Incumplimiento de contrato" }, { v: "danos", t: "Reclamación de daños o perjuicios" }, { v: "arrendamiento", t: "Arrendamiento (desahucio, daños)" }, { v: "herencia", t: "Herencia o comunidad de bienes" }, { v: "responsabilidad", t: "Responsabilidad civil de tercero" }, { v: "otro", t: "Otro" }],
  laboral: [{ v: "despido_carta", t: "Despido — tengo la carta" }, { v: "despido_verbal", t: "Despido — comunicación verbal" }, { v: "impago_nominas", t: "Impago de nóminas o finiquito" }, { v: "horas_vacaciones", t: "Horas extra o vacaciones no pagadas" }, { v: "acoso", t: "Acoso laboral o mobbing" }, { v: "condiciones", t: "Modificación de condiciones de trabajo" }, { v: "baja", t: "Baja por incapacidad o conflicto" }, { v: "otro", t: "Otro" }]
};

// ============ TRACKING ============
function track(evt, data = {}) {
  console.log(`[TRACK] ${evt}`, data);
  try { window.dispatchEvent(new CustomEvent('fa_track', { detail: { event: evt, ...data } })) } catch (e) { }
}
document.querySelectorAll('[data-track]').forEach(el => {
  el.addEventListener('click', () => track(el.dataset.track, { label: el.textContent.trim().substring(0, 50) }));
});

// ============ MOBILE MENU ============
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('hidden');
  menuToggle.setAttribute('aria-expanded', !open);
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.add('hidden')));

// ============ STICKY MOBILE CTA ============
const stickyCta = document.getElementById('sticky-cta');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 400) stickyCta.classList.add('show');
  else stickyCta.classList.remove('show');
  lastScroll = y;
}, { passive: true });

// ============ SCROLL DEPTH TRACKING ============
const depthMarks = { 25: false, 50: false, 75: false };
window.addEventListener('scroll', () => {
  const pct = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
  [25, 50, 75].forEach(d => { if (pct >= d && !depthMarks[d]) { depthMarks[d] = true; track(`scroll_depth_${d}`) } });
}, { passive: true });

// ============ FADE UP ANIMATION ============
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
} else {
  document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
}

// ============ NAV SHADOW ============
window.addEventListener('scroll', () => {
  document.getElementById('nav-header').classList.toggle('shadow-md', window.scrollY > 10);
}, { passive: true });

// ============ FAQ ACCORDION ============
const faqList = document.getElementById('faq-list');
faqData.forEach((item, i) => {
  const div = document.createElement('div');
  div.setAttribute('role', 'listitem');
  div.className = 'bg-white rounded-xl border border-cream-dark overflow-hidden';
  div.innerHTML = `
    <button class="faq-btn w-full flex items-center justify-between p-5 text-left font-medium text-gray-900 hover:bg-cream/50 transition-colors" aria-expanded="false" aria-controls="faq-a-${i}">
      <span class="pr-4">${item.q}</span>
      <svg class="faq-icon shrink-0 w-5 h-5 text-gray-400 transition-transform" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
    </button>
    <div id="faq-a-${i}" class="faq-answer" role="region"><p class="px-5 pb-5 text-sm text-gray-600 leading-relaxed">${item.a}</p></div>`;
  faqList.appendChild(div);
  const btn = div.querySelector('.faq-btn');
  const answer = div.querySelector('.faq-answer');
  const icon = div.querySelector('.faq-icon');
  btn.addEventListener('click', () => {
    const open = answer.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    icon.style.transform = open ? 'rotate(180deg)' : '';
    if (open) track('faq_open', { question: item.q.substring(0, 40) });
  });
  btn.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click() }
  });
});

// ============ FORM: DYNAMIC MOTIVO ============
const areaSelect = document.getElementById('f-area');
const motivoWrap = document.getElementById('motivo-wrap');
const motivoSelect = document.getElementById('f-motivo');
areaSelect.addEventListener('change', () => {
  const v = areaSelect.value;
  if (v && v !== 'nosabe' && motivoOpts[v]) {
    motivoSelect.innerHTML = '<option value="">Selecciona tu situación</option>';
    motivoOpts[v].forEach(o => { motivoSelect.innerHTML += `<option value="${o.v}">${o.t}</option>` });
    motivoWrap.classList.remove('hidden');
  } else {
    motivoWrap.classList.add('hidden');
    motivoSelect.innerHTML = '';
  }
});

// ============ FORM: CONDITIONAL DATE ============
const urgSelect = document.getElementById('f-urgencia');
const fechaWrap = document.getElementById('fecha-wrap');
const fechaInput = document.getElementById('f-fecha');
urgSelect.addEventListener('change', () => {
  if (urgSelect.value === 'fecha') { fechaWrap.classList.remove('hidden'); fechaInput.required = true }
  else { fechaWrap.classList.add('hidden'); fechaInput.required = false; fechaInput.value = '' }
});

// ============ FORM: CHAR COUNTER ============
const descArea = document.getElementById('f-desc');
const charCount = document.getElementById('char-count');
descArea.addEventListener('input', () => { charCount.textContent = `${descArea.value.length}/600` });

// ============ FORM: VALIDATION & SUBMIT ============
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
function showErr(id, msg) { const el = document.getElementById(id); if (el) { el.textContent = msg; el.classList.remove('hidden'); el.setAttribute('aria-live', 'polite') } }
function hideErr(id) { const el = document.getElementById(id); if (el) { el.classList.add('hidden'); el.textContent = '' } }
function clearErrors() { ['err-name', 'err-phone', 'err-email', 'err-contact', 'err-desc', 'err-privacy'].forEach(hideErr) }

form.addEventListener('submit', e => {
  e.preventDefault();
  clearErrors();
  track('form_submit_attempt');
  let valid = true;
  const name = document.getElementById('f-name');
  const phone = document.getElementById('f-phone');
  const email = document.getElementById('f-email');
  const desc = document.getElementById('f-desc');
  const privacy = document.getElementById('f-privacy');
  const contactPref = form.querySelector('input[name="contact_pref"]:checked');

  if (!name.value.trim() || name.value.trim().length < 2) { showErr('err-name', 'Introduce tu nombre para que sepamos cómo dirigirnos a ti.'); valid = false }
  const phoneClean = phone.value.replace(/\s/g, '');
  if (!phoneClean || !/^[6-9]\d{8}$/.test(phoneClean)) { showErr('err-phone', 'Número no válido. Debe tener 9 dígitos y empezar por 6, 7, 8 o 9.'); valid = false }
  if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { showErr('err-email', 'Formato de email no válido.'); valid = false }
  if (!contactPref) { showErr('err-contact', 'Selecciona cómo prefieres que te contactemos.'); valid = false }
  if (!desc.value.trim() || desc.value.trim().length < 20) { showErr('err-desc', 'Cuéntanos un poco más — necesitamos al menos 20 caracteres para entender tu situación.'); valid = false }
  if (!privacy.checked) { showErr('err-privacy', 'Necesitamos que aceptes la política de privacidad para poder contactarte.'); valid = false }

  if (!valid) {
    const firstErr = form.querySelector('.text-danger:not(.hidden)');
    if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Submit to n8n webhook
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';
  submitBtn.classList.add('opacity-70', 'cursor-not-allowed');

  const formData = {
    name: name.value.trim(),
    phone: phone.value.trim(),
    email: email.value.trim(),
    contact_pref: contactPref ? contactPref.value : '',
    area: areaSelect.value,
    motivo: motivoSelect.value || '',
    urgencia: urgSelect.value,
    fecha: fechaInput.value || '',
    descripcion: desc.value.trim(),
    docs: form.querySelector('input[name="docs"]:checked')?.value || 'no',
    privacy: privacy.checked,
    consent_contact: form.querySelector('input[name="consent_contact"]')?.checked || false,
    submitted_at: new Date().toISOString()
  };

  fetch('https://n8n.clientify.click/webhook/lead-abogados', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (!response.ok) throw new Error('Error en el envío');
      track('form_submit_success', { area: areaSelect.value, urgencia: urgSelect.value });
      form.classList.add('hidden');
      document.getElementById('form-success').classList.remove('hidden');
      document.getElementById('form-success').scrollIntoView({ behavior: 'smooth', block: 'start' });
    })
    .catch(error => {
      console.error('Error enviando formulario:', error);
      track('form_submit_error', { error: error.message });
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar consulta →';
      submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
      alert('Hubo un error al enviar tu consulta. Por favor, inténtalo de nuevo o contáctanos directamente por teléfono.');
    });
});
