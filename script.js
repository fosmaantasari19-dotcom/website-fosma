<script>
    document.addEventListener('DOMContentLoaded', () => {
        // Logic untuk Navigasi Mobile (Hamburger Menu)
        const navToggle = document.querySelector('.nav-menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (navToggle && navLinks) {
            navToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
        
        // Logic untuk Animasi Fade-In saat Scroll (Hyper Active Feel)
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Hentikan observasi setelah terlihat
                }
            });
        }, { threshold: 0.1 }); // Mulai animasi ketika 10% elemen terlihat

        document.querySelectorAll('.fade-in').forEach(element => {
            observer.observe(element);
        });
        
        // Logic untuk Program Kerja Accordion (hanya di programs.html)
        const headers = document.querySelectorAll('.accordion-header');
        if (headers.length > 0) {
            headers.forEach(header => {
                header.addEventListener('click', () => {
                    const content = header.nextElementSibling; 
                    const isOpen = content.style.maxHeight;

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
        }
    });
</script>