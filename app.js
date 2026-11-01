const $ = (id) => document.getElementById(id);
let files = [], busy = false, resultUrl = null, draggedId = null;
const size = (bytes) => bytes < 1048576 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / 1048576).toFixed(1)} MB`;
function status(message, error = false) { $('status').textContent = message; $('status').classList.toggle('error', error); }
function invalidate() { if (resultUrl) URL.revokeObjectURL(resultUrl); resultUrl = null; $('download').hidden = true; }
function render() {
  $('files').replaceChildren();
  files.forEach((file, index) => {
    const row = document.createElement('div'); row.className = 'file-row'; row.draggable = !busy;
    const icon = document.createElement('span'); icon.className = 'file-icon'; icon.textContent = 'PDF';
    const info = document.createElement('div'); info.className = 'file-info';
    const name = document.createElement('div'); name.className = 'file-name'; name.textContent = file.name;
    const meta = document.createElement('div'); meta.className = 'file-meta'; meta.textContent = `${index + 1} · ${file.pages} ${file.pages === 1 ? 'page' : 'pages'} · ${size(file.size)}`;
    info.append(name, meta);
    const actions = document.createElement('div'); actions.className = 'row-actions';
    [['↑', 'Move up', -1], ['↓', 'Move down', 1], ['×', 'Remove', 0]].forEach(([label, title, delta]) => {
      const button = document.createElement('button'); button.textContent = label; button.title = title; button.setAttribute('aria-label', `${title}: ${file.name}`);
      button.disabled = busy || (delta === -1 && index === 0) || (delta === 1 && index === files.length - 1);
      button.onclick = () => { if (delta) [files[index], files[index + delta]] = [files[index + delta], files[index]]; else files.splice(index, 1); invalidate(); status(''); render(); }; actions.append(button);
    });
    row.append(icon, info, actions);
    row.addEventListener('dragstart', (event) => { draggedId = file.id; event.dataTransfer.setData('text/plain', file.id); row.classList.add('dragging'); });
    row.addEventListener('dragend', () => { draggedId = null; row.classList.remove('dragging'); });
    row.addEventListener('dragover', event => { if (draggedId && !busy) event.preventDefault(); });
    row.addEventListener('drop', event => { if (!draggedId || busy) return; event.preventDefault(); event.stopPropagation(); const from = files.findIndex(f => f.id === draggedId); if (from < 0) return; const [moved] = files.splice(from, 1); files.splice(index, 0, moved); invalidate(); status(''); render(); });
    $('files').append(row);
  });
  $('count').textContent = files.length ? `${files.length} files · ${files.reduce((n, f) => n + f.pages, 0)} pages` : 'Ready when you are';
  $('list-tools').hidden = !files.length; $('merge').disabled = busy || files.length < 2; $('drop').disabled = busy; $('clear').disabled = busy; $('filename').disabled = busy;
}
async function addFiles(incoming) {
  if (busy || !incoming.length) return;
  if (!window.PDFLib) { status('The PDF engine could not load. Please refresh the page and try again.', true); return; }
  busy = true; invalidate(); render(); const errors = [];
  try {
    for (let i = 0; i < incoming.length; i++) {
      const file = incoming[i]; status(`Reading file ${i + 1} of ${incoming.length}…`); await new Promise(resolve => setTimeout(resolve, 0));
      if (!/\.pdf$/i.test(file.name) && file.type !== 'application/pdf') { errors.push(`${file.name}: please choose a PDF file.`); continue; }
      try {
        const bytes = await file.arrayBuffer(); const doc = await PDFLib.PDFDocument.load(bytes);
        if (!doc.getPageCount()) throw new Error('empty');
        files.push({ id: crypto.randomUUID(), name: file.name, size: file.size, bytes, pages: doc.getPageCount() });
      } catch (error) { errors.push(`${file.name}: ${/encrypt/i.test(error.message) ? 'password-protected. Unlock this PDF first.' : 'could not be read. It may be damaged, empty or unsupported.'}`); }
    }
  } finally { busy = false; render(); status(errors.length ? errors.join('\n') : files.length > 1 ? 'All set. Arrange your files, then merge.' : 'Add another PDF to bring them together.', !!errors.length); }
}
$('drop').onclick = () => $('picker').click();
$('picker').onchange = async event => { const incoming = [...event.target.files]; event.target.value = ''; await addFiles(incoming); };
for (const type of ['dragenter', 'dragover']) $('drop').addEventListener(type, event => { event.preventDefault(); if (!busy && !draggedId) $('drop').classList.add('dragover'); });
for (const type of ['dragleave', 'drop']) $('drop').addEventListener(type, event => { event.preventDefault(); $('drop').classList.remove('dragover'); });
$('drop').addEventListener('drop', event => addFiles([...event.dataTransfer.files]));
window.addEventListener('dragover', event => event.preventDefault()); window.addEventListener('drop', event => event.preventDefault());
$('clear').onclick = () => { if (busy) return; files = []; invalidate(); status(''); render(); };
function outputName() { return ($('filename').value.trim().replace(/\.pdf$/i, '').replace(/[<>:"/\\|?*\x00-\x1F]/g, '-') || 'merged-document') + '.pdf'; }
$('filename').addEventListener('input', () => { if (resultUrl) $('download').download = outputName(); });
$('merge').onclick = async () => {
  if (busy || files.length < 2) return;
  busy = true; invalidate(); render();
  try {
    const merged = await PDFLib.PDFDocument.create();
    for (let i = 0; i < files.length; i++) {
      status(`Combining file ${i + 1} of ${files.length}…`); await new Promise(resolve => setTimeout(resolve, 0));
      const source = await PDFLib.PDFDocument.load(files[i].bytes); const pages = await merged.copyPages(source, source.getPageIndices()); pages.forEach(page => merged.addPage(page));
    }
    status('Preparing your download…'); await new Promise(resolve => setTimeout(resolve, 0));
    const bytes = await merged.save(); resultUrl = URL.createObjectURL(new Blob([bytes], {type: 'application/pdf'}));
    $('download').href = resultUrl; $('download').download = outputName(); $('download').hidden = false;
    status(`Your PDF is ready. ${files.length} files, ${merged.getPageCount()} pages, all together.`); $('download').focus();
  } catch (error) { status('These files could not be combined. Try fewer files or smaller PDFs, and check that each PDF opens correctly.', true); }
  finally { busy = false; render(); }
};
