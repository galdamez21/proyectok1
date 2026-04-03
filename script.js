/* ═══════════════════════════════════════════════════════════════════
   K1 VIDEO PIPELINE - JAVASCRIPT
   ═══════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {
  inicializarTabs();
  inicializarTono();
  inicializarChips();
  inicializarRegiones();
  inicializarDragDrop();
  actualizarPreview();
});

/* ─── TABS ─── */
function inicializarTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabIndex = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
      document.getElementById(`tab-${tabIndex}`).classList.remove('hidden');
    });
  });
}

/* ─── TONO ─── */
function seleccionarTono(el) {
  document.querySelectorAll('.tono-btn').forEach(b => {
    b.classList.remove('active');
    b.classList.add('text-white/60');
    b.querySelector('i').classList.remove('text-k1-purple');
    b.querySelector('i').classList.add('text-white/40');
  });
  el.classList.add('active');
  el.classList.remove('text-white/60');
  el.querySelector('i').classList.remove('text-white/40');
  el.querySelector('i').classList.add('text-k1-purple');
}

function inicializarTono() {
  document.querySelectorAll('.tono-btn').forEach(btn => {
    btn.addEventListener('click', () => seleccionarTono(btn));
  });
}

/* ─── CHIPS ─── */
function toggleChip(el) {
  el.classList.toggle('active');
  if (el.classList.contains('active')) {
    el.classList.remove('text-white/60');
  } else {
    el.classList.add('text-white/60');
  }
}

function inicializarChips() {
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      toggleChip(chip);
      actualizarPreview();
    });
  });
}

/* ─── REGION ─── */
function toggleRegion(el) {
  document.querySelectorAll('.region-card').forEach(c => {
    c.classList.remove('active');
    c.classList.add('text-white/60');
  });
  el.classList.add('active');
  el.classList.remove('text-white/60');
}

function inicializarRegiones() {
  document.querySelectorAll('.region-card').forEach(card => {
    card.addEventListener('click', () => toggleRegion(card));
  });
}

/* ─── OPT BUTTONS ─── */
function toggleOpt(el, group) {
  const container = el.parentElement.parentElement;
  container.querySelectorAll('.opt-btn').forEach(b => {
    b.classList.remove('active');
    b.classList.add('text-white/60');
  });
  el.classList.add('active');
  el.classList.remove('text-white/60');
}

/* ─── BRANDING TOGGLE ─── */
function toggleBranding() {
  const track = document.getElementById('branding-toggle-track');
  track.classList.toggle('active');
}

/* ─── DRAG & DROP ─── */
function handleDrop(e) {
  e.preventDefault();
  document.getElementById('drop-zone').classList.remove('over');
  handleFiles(e.dataTransfer.files);
}

function handleFiles(files) {
  const grid = document.getElementById('assets-grid');
  const addBtn = document.getElementById('add-asset-btn');
  Array.from(files).slice(0, 10).forEach(f => {
    const div = document.createElement('div');
    div.className = 'asset-thumb aspect-square rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer';
    const ext = f.name.split('.').pop().toUpperCase().substring(0, 4);
    div.innerHTML = `<i class="fa-solid fa-image text-k1-purple text-xl"></i><span class="text-[10px] text-white/40 font-medium uppercase tracking-wider">${ext}</span>`;
    grid.insertBefore(div, addBtn);
  });
  showToast(`${files.length} asset(s) agregado(s)`);
}

function inicializarDragDrop() {
  const dropZone = document.getElementById('drop-zone');
  if (dropZone) {
    dropZone.addEventListener('dragover', e => {
      e.preventDefault();
      dropZone.classList.add('over');
    });
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('over');
    });
    dropZone.addEventListener('drop', handleDrop);
  }

  const fileInput = document.getElementById('file-input');
  if (fileInput) {
    fileInput.addEventListener('change', e => handleFiles(e.target.files));
  }
}

/* ─── PREVIEW ─── */
function actualizarPreview() {
  const tema = document.getElementById('tema-select')?.value || '';
  const guion = document.getElementById('guion-textarea')?.value || '';
  
  const previewTitulo = document.getElementById('preview-titulo');
  if (previewTitulo) previewTitulo.textContent = tema;
  
  const previewGuion = document.getElementById('preview-guion');
  if (previewGuion) {
    const lines = guion.split('\n').filter(l => l.trim());
    previewGuion.textContent = lines[0] ? lines[0].substring(0, 80) + (lines[0].length > 80 ? '…' : '') : '';
  }
  
  actualizarSpecsIdiomas();
}

function actualizarSpecsIdiomas() {
  const chips = document.querySelectorAll('.chip.active');
  const idiomas = Array.from(chips).map(c => {
    const text = c.textContent.trim();
    if (text.includes('Español')) return 'ES';
    if (text.includes('Inglés')) return 'EN';
    if (text.includes('Japonés')) return 'JP';
    if (text.includes('Portugués')) return 'PT';
    if (text.includes('Francés')) return 'FR';
    if (text.includes('Árabe')) return 'AR';
    return text.substring(0, 2).toUpperCase();
  }).slice(0, 4);
  
  const specIdiomas = document.getElementById('spec-idiomas');
  if (specIdiomas) {
    specIdiomas.textContent = idiomas.length > 0 ? idiomas.join(' · ') : '—';
  }
}

/* ─── GUION TEXTAREA ─── */
const guionTextarea = document.getElementById('guion-textarea');
if (guionTextarea) {
  guionTextarea.addEventListener('input', actualizarPreview);
}

/* ─── GENERAR CON IA ─── */
function generarConIA() {
  const ta = document.getElementById('guion-textarea');
  if (!ta) return;
  
  ta.value = '⏳ Generando con IA...';
  setTimeout(() => {
    ta.value = `Una transacción en Bitcoin es como enviar dinero digital sin intermediarios.
Tu firma digital autoriza el pago de forma segura y privada.
La blockchain registra todo de manera permanente e inmutable.
K1 Technology hace que este proceso sea rápido, sencillo y accesible para todos.`;
    actualizarPreview();
    showToast('Guion generado con IA exitosamente');
  }, 1500);
}

/* ─── GENERAR VIDEO ─── */
function generarVideo() {
  const overlay = document.getElementById('loading-overlay');
  const bar = document.getElementById('loading-bar');
  if (!overlay || !bar) return;
  
  overlay.classList.add('show');
  bar.style.width = '0%';
  setTimeout(() => bar.style.width = '100%', 50);
  
  const steps = ['step-1', 'step-2', 'step-3', 'step-4'];
  const times = [500, 1000, 1600, 2200];
  
  steps.forEach((id, i) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.add('!text-green-400');
        const icon = el.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-check w-4 h-4';
      }
    }, times[i]);
  });
  
  setTimeout(() => {
    overlay.classList.remove('show');
    showToast('¡Video generado exitosamente!');
    
    steps.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove('!text-green-400');
        const icon = el.querySelector('i');
        if (icon) icon.className = 'fa-regular fa-circle w-4 h-4';
      }
    });
    
    bar.style.width = '0%';
  }, 2800);
}

/* ─── EXPORTAR ─── */
function exportarLote() {
  showToast('Exportando lote: 8 videos en 8 idiomas...');
}

/* ─── TOAST ─── */
let toastTimer = null;

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;
  
  toastMsg.textContent = msg;
  toast.classList.add('show');
  
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ─── DURATION SLIDER ─── */
const durSlider = document.getElementById('dur-slider');
if (durSlider) {
  durSlider.addEventListener('input', function() {
    const durValue = document.getElementById('dur-value');
    const specDur = document.getElementById('spec-dur');
    if (durValue) durValue.textContent = this.value + ' seg';
    if (specDur) specDur.textContent = '00:' + this.value.padStart(2, '0');
  });
}

/* ─── OPACITY SLIDER ─── */
const opSlider = document.getElementById('op-slider');
if (opSlider) {
  opSlider.addEventListener('input', function() {
    const opVal = document.getElementById('op-val');
    const watermarkPreview = document.getElementById('watermark-preview');
    if (opVal) opVal.textContent = this.value + '%';
    if (watermarkPreview) watermarkPreview.style.opacity = this.value / 100;
  });
}

/* ─── TEMA SELECT ─── */
const temaSelect = document.getElementById('tema-select');
if (temaSelect) {
  temaSelect.addEventListener('change', actualizarPreview);
}

/* ─── AI TOGGLE ─── */
const aiToggle = document.querySelector('.toggle-track');
if (aiToggle) {
  aiToggle.addEventListener('click', function() {
    this.classList.toggle('active');
  });
}