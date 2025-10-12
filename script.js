document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigasi Mobile (Hamburger Menu)
    const navToggle = document.querySelector('.nav-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Opsional: Tutup menu saat link diklik (untuk UX mobile)
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
                const isOpen = header.classList.contains('open'); // Cek header class

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
});

// 4. Logic untuk Baca Selengkapnya/Expand Testimonial
    const readMoreButtons = document.querySelectorAll('.read-more-btn');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.testimonial-card'); 
            const isExpanded = card.classList.toggle('expanded');
            
            // Ubah teks tombol
            button.textContent = isExpanded ? 'Sembunyikan' : 'Baca Selengkapnya';
        });
    });

// 5. Logic untuk Mengirim Formulir Kontak ke WhatsApp
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