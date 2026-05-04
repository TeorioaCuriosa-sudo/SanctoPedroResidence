// ── LIGHTBOX CUSTOM ──
(function() {
  var images = [];
  var current = 0;

  function openLightbox(src, idx) {
    current = idx;
    document.getElementById('glb-img').src = src;
    document.getElementById('glb-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    document.getElementById('glb-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  function showImage(idx) {
    current = (idx + images.length) % images.length;
    document.getElementById('glb-img').src = images[current];
  }

  document.addEventListener('DOMContentLoaded', function() {
    images = Array.from(document.querySelectorAll('[data-lightbox]')).map(function(a) {
      return a.getAttribute('href');
    });

    document.querySelectorAll('[data-lightbox]').forEach(function(a, idx) {
      a.addEventListener('click', function(e) {
        e.preventDefault();
        openLightbox(a.getAttribute('href'), idx);
      });
    });

    document.getElementById('glb-close').addEventListener('click', closeLightbox);

    document.getElementById('glb-prev').addEventListener('click', function(e) {
      e.stopPropagation();
      showImage(current - 1);
    });

    document.getElementById('glb-next').addEventListener('click', function(e) {
      e.stopPropagation();
      showImage(current + 1);
    });

    // Fechar ao clicar fora da imagem (no overlay escuro)
    document.getElementById('glb-overlay').addEventListener('click', function(e) {
      if (e.target === this) closeLightbox();
    });

    // Fechar com Escape, navegar com setas do teclado
    document.addEventListener('keydown', function(e) {
      if (!document.getElementById('glb-overlay').classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showImage(current - 1);
      if (e.key === 'ArrowRight') showImage(current + 1);
    });
  });
})();
