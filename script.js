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