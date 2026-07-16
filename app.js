(function() {
  const STORAGE_KEY = 'aurora_azzalea_photos_6july2026';
  let photos = [];

  const grid = document.getElementById('photoGrid');
  const counter = document.getElementById('photoCounter');
  const fileInput = document.getElementById('imageInput');
  const uploadBtn = document.getElementById('uploadBtn');
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(msg, isError = true) {
    toast.textContent = msg;
    toast.style.background = isError ? '#b33a4a' : '#3d2b4f';
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 4000);
  }

  function loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) photos = parsed;
      }
    } catch (_) { photos = []; }
  }

  function saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
    } catch (e) {
      showToast('❌ Gagal menyimpan! Total ukuran foto terlalu besar. Hapus beberapa foto atau gunakan foto yang lebih kecil.', true);
      console.error(e);
    }
  }

  // Kompresi gambar: resize ke max 800px, kualitas 0.7 (JPEG)
  function compressImage(file, maxSize = 800, quality = 0.7) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > maxSize) { height = (maxSize / width) * height; width = maxSize; }
          } else {
            if (height > maxSize) { width = (maxSize / height) * width; height = maxSize; }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error('Gagal memuat gambar'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Gagal membaca file'));
      reader.readAsDataURL(file);
    });
  }

  async function addPhotos(fileList) {
    if (!fileList || fileList.length === 0) return;

    const files = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    if (files.length === 0) {
      showToast('⚠️ Pilih file gambar (JPG, PNG, dll).', true);
      return;
    }

    let successCount = 0;
    for (const file of files) {
      try {
        const dataUrl = await compressImage(file);
        const id = Date.now() + '-' + Math.random().toString(36).substr(2, 6) + '-' + successCount;
        photos.push({
          id: id,
          dataUrl: dataUrl,
          timestamp: Date.now()
        });
        successCount++;
      } catch (err) {
        console.warn('Gagal kompres foto:', file.name, err);
        // tetap coba tanpa kompresi (jika gagal, skip)
      }
    }

    if (successCount > 0) {
      saveToStorage();
      render();
      showToast(`✅ ${successCount} foto berhasil diunggah!`, false);
    } else {
      showToast('❌ Gagal memproses semua foto.', true);
    }
    fileInput.value = '';
  }

  function render() {
    const count = photos.length;
    counter.textContent = count + ' foto';

    if (count === 0) {
      grid.innerHTML = `
        <div class="empty-message">
          <span>🖼️</span>Belum ada foto. Yuk, unggah momen pertama Aurora & Azzalea!
        </div>
      `;
      return;
    }

    let html = '';
    const sorted = [...photos].reverse(); // terbaru di atas
    for (const photo of sorted) {
      const date = new Date(photo.timestamp);
      const dateStr = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
      const timeStr = date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      html += `
        <div class="card" data-id="${photo.id}">
          <img src="${photo.dataUrl}" alt="Foto Aurora & Azzalea" loading="lazy" />
          <div class="card-footer">
            <span class="timestamp">📅 ${dateStr} · ${timeStr}</span>
            <button class="delete-btn" data-id="${photo.id}" title="Hapus foto">✕</button>
          </div>
        </div>
      `;
    }
    grid.innerHTML = html;

    grid.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const id = this.getAttribute('data-id');
        if (id && confirm('Hapus foto ini?')) {
          deletePhotoById(id);
        }
      });
    });
  }

  function deletePhotoById(id) {
    const index = photos.findIndex(p => p.id === id);
    if (index === -1) return;
    photos.splice(index, 1);
    saveToStorage();
    render();
    showToast('🗑️ Foto dihapus.', false);
  }

  // Event listeners
  uploadBtn.addEventListener('click', function() {
    if (fileInput.files && fileInput.files.length > 0) {
      addPhotos(fileInput.files);
    } else {
      showToast('⚠️ Silakan pilih foto terlebih dahulu.', true);
    }
  });

  fileInput.addEventListener('change', function() {
    if (this.files && this.files.length > 0) {
      addPhotos(this.files);
      this.value = '';
    }
  });

  // Set tanggal lahir
  const birthSpan = document.getElementById('birthDateDisplay');
  if (birthSpan) {
    const birth = new Date(2026, 6, 6); // 6 Juli 2026
    birthSpan.textContent = birth.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  // Inisialisasi
  loadFromStorage();
  render();

  // Daftarkan Service Worker untuk PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log('SW terdaftar'))
      .catch(err => console.warn('SW gagal:', err));
  }
})();
