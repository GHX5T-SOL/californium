(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const copyBtn = document.getElementById('copyBtn');
  const input = document.getElementById('contractAddress');

  function copyAddress() {
    if (!(input instanceof HTMLInputElement)) return;

    // Prefer modern API
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(input.value).then(showCopied, showError);
    } else {
      input.removeAttribute('readonly');
      input.select();
      input.setSelectionRange(0, 99999);
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (_) { ok = false; }
      input.setAttribute('readonly', 'true');
      window.getSelection && window.getSelection().removeAllRanges();
      ok ? showCopied() : showError();
    }
  }

  function showCopied() {
    if (!(copyBtn instanceof HTMLElement)) return;
    const original = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('copied');
    setTimeout(() => {
      copyBtn.textContent = original || 'Copy';
      copyBtn.classList.remove('copied');
    }, 1400);
  }

  function showError() {
    if (!(copyBtn instanceof HTMLElement)) return;
    const original = copyBtn.textContent;
    copyBtn.textContent = 'Copy failed';
    copyBtn.classList.add('error');
    setTimeout(() => {
      copyBtn.textContent = original || 'Copy';
      copyBtn.classList.remove('error');
    }, 1400);
  }

  if (copyBtn) copyBtn.addEventListener('click', copyAddress);
})();


