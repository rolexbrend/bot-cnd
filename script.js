// ============================================================
// ADMIN PANEL JS — Enhanced v3
// ============================================================

// Auto-dismiss alerts
document.querySelectorAll('.alert').forEach(el => {
    setTimeout(() => { el.style.opacity='0'; el.style.transition='opacity .5s'; }, 3500);
    setTimeout(() => el.remove(), 4200);
});

// Sidebar mobile toggle — close on outside click
document.addEventListener('click', e => {
    const sb = document.getElementById('sidebar');
    const mb = document.querySelector('.menu-btn');
    if (sb && sb.classList.contains('open') && !sb.contains(e.target) && e.target !== mb) {
        sb.classList.remove('open');
    }
});

// Keyboard escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-ov.open').forEach(m => m.classList.remove('open'));
        document.querySelectorAll('.bc-popup.open').forEach(m => m.classList.remove('open'));
    }
});

// Active nav highlight by URL
(function() {
    const cur = location.pathname.split('/').pop();
    document.querySelectorAll('.nav-item').forEach(el => {
        const href = (el.getAttribute('href') || '').replace('./', '');
        if (href === cur) el.classList.add('active');
    });
})();

// Generic modal open/close helpers
function openModal(id)  { const el = document.getElementById(id); if(el) el.classList.add('open'); }
function closeModal(id) { const el = document.getElementById(id); if(el) el.classList.remove('open'); }

// Payment filter (pay_history page)
function filterPayments(status, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.pay-item').forEach(el => {
        el.style.display = (status === 'all' || (el.dataset.status||'') === status) ? '' : 'none';
    });
}

// Confirm wrapper
function confirmAction(msg, cb) {
    if (window.confirm(msg)) cb();
}

// Copy text utility
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('✅ Copied!');
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta);
        ta.select(); document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('✅ Copied!');
    });
}

// Toast notification
function showToast(msg, type) {
    const t = document.createElement('div');
    t.style.cssText = `
        position:fixed;bottom:80px;left:50%;transform:translateX(-50%);
        background:${type==='error'?'var(--red)':'var(--primary)'};color:#fff;
        padding:10px 20px;border-radius:20px;font-size:13px;font-weight:600;
        z-index:99999;box-shadow:0 4px 16px rgba(0,0,0,.4);
        animation:slideUp .25s ease;pointer-events:none;
    `;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity .3s'; }, 2000);
    setTimeout(() => t.remove(), 2500);
}
