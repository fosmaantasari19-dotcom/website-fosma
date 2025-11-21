document.addEventListener('DOMContentLoaded', () => {

    // 1. Navigasi Mobile (Hamburger Menu)
    const navToggle = document.querySelector('.nav-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Menutup menu saat link diklik (opsional, untuk UX mobile)
            navLinks.querySelectorAll('.nav-item').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });
        });
    }
    
    // 2. Animasi Fade-In saat Scroll (Hyper Active)
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 }); 

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
    
    // 3. Logic untuk Program Kerja Accordion (Hanya berjalan di programs.html)
    const headers = document.querySelectorAll('.accordion-header');
    if (headers.length > 0) {
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling; 
                const isOpen = header.classList.contains('open'); 

                // Tutup semua konten accordion lainnya
                document.querySelectorAll('.accordion-content').forEach(item => {
                    item.style.maxHeight = null;
                    item.parentNode.querySelector('.accordion-header').classList.remove('open');
                });

                // Buka konten yang diklik jika sebelumnya tertutup
                if (!isOpen) {
                    content.style.maxHeight = content.scrollHeight + "px";
                    header.classList.add('open');
                }
            });
        });
        
        // Atur agar accordion pertama terbuka secara default saat halaman dimuat
        const firstHeader = headers[0];
        const firstContent = firstHeader.nextElementSibling;
        if (firstHeader && firstContent) {
            firstContent.style.maxHeight = firstContent.scrollHeight + "px";
            firstHeader.classList.add('open');
        }
    }

    /* ================================================= */
    /* 4. Logic Modal Testimonial (POP-UP BARU - MENGGANTIKAN LOGIC EXPAND LAMA) */
    /* ================================================= */

    const modalOverlay = document.getElementById('testimonial-modal-overlay');
    const modal = document.getElementById('testimonial-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    
    // Fungsi untuk membuka modal
    function openModal(data) {
        document.getElementById('modal-photo').src = data.photo;
        document.getElementById('modal-photo').alt = 'Foto ' + data.name;
        document.getElementById('modal-name').textContent = data.name;
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-quote').textContent = data.quote.trim();
        
        modalOverlay.classList.add('active');
        modal.style.display = 'block';
        setTimeout(() => modal.style.opacity = '1', 10); 
        document.body.style.overflow = 'hidden'; // Mencegah scroll body utama
    }

    // Fungsi untuk menutup modal
    function closeModal() {
        modalOverlay.classList.remove('active');
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Mengaktifkan scroll body lagi
        }, 300); // Tunggu transisi opacity selesai
    }
    
    // Listener untuk tombol tutup
    modalCloseBtn.addEventListener('click', closeModal);
    
    // Listener untuk overlay (klik area buram)
    modalOverlay.addEventListener('click', (e) => {
        if (e.target.id === 'testimonial-modal-overlay') {
            closeModal();
        }
    });

    // Listener untuk setiap tombol "Baca Selengkapnya"
    const readMoreButtons = document.querySelectorAll('.read-more-btn');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.testimonial-card');
            
            // Mengambil data dari elemen card
            const photoUrl = card.querySelector('.testi-photo').src;
            const name = card.querySelector('.testi-name').textContent.trim(); 
            const title = card.querySelector('.testi-title').textContent.trim(); 
            const quote = card.querySelector('blockquote').textContent.trim();

            const testimonialData = {
                photo: photoUrl,
                name: name,
                title: title,
                quote: quote
            };

            openModal(testimonialData);
        });
    });

}); // End of DOMContentLoaded

// 5. Logic untuk Mengirim Formulir Kontak ke WhatsApp (Dibiarkan di luar DOMContentLoaded)
// Meskipun lebih baik di dalam, form ini berjalan tanpa masalah di luar.

const waForm = document.getElementById('whatsapp-form');
const waNumber = '6282295493674'; // Nomor WA Siti Hasna (tanpa + dan 0 di depan)

if (waForm) {
    waForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah form dikirim secara tradisional

        // Ambil nilai dari input
        const nama = document.getElementById('nama').value;
        const email = document.getElementById('email').value;
        const subjek = document.getElementById('subjek').value;
        const pesan = document.getElementById('pesan').value;

        // Format pesan yang akan dikirim ke WhatsApp
        let waMessage = `*Pesan Baru dari Website FOSMA:*\n\n`;
        waMessage += `Subjek: ${subjek}\n`;
        waMessage += `Nama Pengirim: ${nama}\n`;
        
        // Tambahkan email/kontak jika diisi
        if (email) {
            waMessage += `Kontak: ${email}\n`;
        }
        
        waMessage += `\n*Isi Pesan/Kritik & Saran:*\n${pesan}`;
        
        // Encode pesan agar aman untuk URL
        const encodedMessage = encodeURIComponent(waMessage);

        // Buat link WhatsApp
        const waLink = `https://wa.me/${waNumber}?text=${encodedMessage}`;

        // Arahkan browser ke link WhatsApp
        window.open(waLink, '_blank');
    });
}