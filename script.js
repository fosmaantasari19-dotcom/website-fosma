// script.js

document.addEventListener("DOMContentLoaded", function() {
    // 1. Logika untuk Animasi Timeline saat Scroll
    const timelineContents = document.querySelectorAll(".timeline-content");

    const observerOptions = {
        root: null, // Mengamati dari viewport
        threshold: 0.1, // Mulai tampilkan jika 10% elemen terlihat
        rootMargin: "0px 0px -50px 0px" // Sedikit menunda, agar tidak terlalu cepat muncul
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Jika elemen terlihat di viewport
                entry.target.classList.add("show");
                // Hentikan pengamatan setelah muncul agar lebih efisien
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Amati semua konten timeline
    timelineContents.forEach(content => {
        observer.observe(content);
    });

    // 2. (Opsional) Logika Navigasi Aktif
    // Anda bisa menempatkan kode logika navigasi aktif dari balasan sebelumnya di bawah ini
    // ...
});

// script.js (Gabungan Logika Animasi Timeline dan Navigasi Aktif)

document.addEventListener("DOMContentLoaded", function() {
    
    // ===========================================
    // 1. LOGIKA ANIMASI TIMELINE (dari Poin 6.2)
    // ===========================================
    const timelineContents = document.querySelectorAll(".timeline-content");

    const observerOptions = {
        root: null, // Mengamati dari viewport
        threshold: 0.1, // Mulai tampilkan jika 10% elemen terlihat
        rootMargin: "0px 0px -50px 0px" 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    timelineContents.forEach(content => {
        observer.observe(content);
    });


    // ===========================================
    // 2. LOGIKA NAVIGASI AKTIF (dari Tahap 3)
    // ===========================================
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    window.addEventListener("scroll", () => {
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Gunakan sedikit offset agar transisi lebih baik
            if (scrollY >= sectionTop - 150) { 
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(a => {
            a.classList.remove("active");
            if (a.getAttribute("href").includes(current)) {
                a.classList.add("active");
            }
        });
    });

});
// script.js (Tambahkan di bagian paling bawah)

// ===========================================
// 3. LOGIKA MODAL PROFIL DIVISI (Struktur Kepengurusan)
// ===========================================

document.addEventListener("DOMContentLoaded", function() {
    // Definisi data (ganti dengan profil divisi FOSMA yang sebenarnya)
    const divisiData = {
        "KetuaUmum": {
            title: "Ketua Umum FOSMA",
            description: "Bertanggung jawab atas seluruh kegiatan organisasi, memimpin koordinasi antar divisi, dan menjadi representasi FOSMA di tingkat universitas.",
            proker: "Laporan Pertanggungjawaban Akhir, Rapat Kerja Akbar."
        },
        "Sekretaris": {
            title: "Sekretaris Umum",
            description: "Bertanggung jawab atas administrasi, surat menyurat, kearsipan, dan notulensi rapat organisasi.",
            proker: "Pembuatan Standar Operasional Prosedur (SOP) Kesekretariatan."
        },
        "Bendahara": {
            title: "Bendahara Umum",
            description: "Bertanggung jawab atas pengelolaan keuangan FOSMA, transparansi anggaran, dan pelaporan keuangan berkala.",
            proker: "Penyusunan Anggaran Tahunan, Dana Usaha."
        },
        "Pendidikan": {
            title: "Divisi Pendidikan",
            description: "Fokus pada pengembangan akademis mahasiswa baru, fasilitasi diskusi ilmiah, dan peningkatan literasi kampus.",
            proker: "Kelas Mentoring Akademik, Diskusi Ilmiah Mingguan."
        },
        "Kominfo": {
            title: "Divisi Komunikasi & Informasi",
            description: "Bertugas mengelola media sosial resmi FOSMA, menyebarkan informasi kegiatan, dan memproduksi konten digital.",
            proker: "Maintenance Website, Konten Kreatif Harian (Instagram/TikTok)."
        },
        "Kreatif": {
            title: "Divisi Kreatif",
            description: "Bertanggung jawab atas desain visual, publikasi, dan aspek dekorasi acara FOSMA untuk mendukung semua divisi lainnya.",
            proker: "Pelatihan Desain Grafis, Merchandise FOSMA."
        }
        // Tambahkan Divisi lain di sini
    };

    const modal = document.getElementById("divisi-modal");
    const closeButton = document.querySelector(".close-button");
    const positions = document.querySelectorAll(".position");

    positions.forEach(position => {
        position.addEventListener("click", () => {
            const divisiKey = position.getAttribute("data-divisi");
            const data = divisiData[divisiKey];

            if (data) {
                // Isi konten modal dengan data yang sesuai
                document.getElementById("modal-title").innerText = data.title;
                document.getElementById("modal-description").innerText = data.description;
                document.getElementById("modal-proker").innerText = data.proker;
                
                // Tampilkan modal
                modal.style.display = "block";
            }
        });
    });

    // Tutup modal ketika tombol 'x' diklik
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Tutup modal ketika area gelap (di luar modal) diklik
    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // ... Logika Navigasi Aktif (lama)
});
// script.js (Tambahkan di bagian DOMContentLoaded)

// ===========================================
// 4. LOGIKA FILTER PROGRAM KERJA
// ===========================================
const tabButtons = document.querySelectorAll(".tab-button");
const programItems = document.querySelectorAll(".program-card-item");

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        // 1. Kelola Kelas Aktif pada Tombol
        tabButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        
        const filter = button.getAttribute("data-divisi");

        // 2. Filter Item Program
        programItems.forEach(item => {
            const divisi = item.getAttribute("data-divisi");
            
            // Logika Sembunyikan/Tampilkan
            if (filter === "all" || filter === divisi) {
                item.style.display = "block"; // Tampilkan
                item.style.opacity = "1";
                item.style.transform = "scale(1)";
            } else {
                // Sembunyikan dengan efek transisi (CSS sudah diatur)
                item.style.opacity = "0";
                item.style.transform = "scale(0.95)";
                setTimeout(() => {
                    item.style.display = "none";
                }, 300); // Tunggu animasi selesai baru display: none
            }
        });
    });
});

// script.js (Tambahkan di bagian DOMContentLoaded)

// ===========================================
// 5. LOGIKA ACCORDION FAQ
// ===========================================
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {
    question.addEventListener("click", function() {
        this.classList.toggle("active");
        const answer = this.nextElementSibling;
        
        if (answer.style.maxHeight) {
            // Jika terbuka, tutup
            answer.style.maxHeight = null;
        } else {
            // Jika tertutup, buka (setinggi kontennya)
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});

// script.js (Tambahkan di bagian paling bawah fungsi DOMContentLoaded)

// ===========================================
// 6. LOGIKA ANIMASI SCROLL FADE-IN
// ===========================================
// 1. Ambil semua elemen yang memiliki kelas 'fade-in'
const fadeElements = document.querySelectorAll(".fade-in");

// 2. Buat objek yang akan mendeteksi perpotongan (IntersectionObserver)
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        // Cek apakah elemen sudah terlihat (isIntersecting = true)
        if (entry.isIntersecting) {
            // Tambahkan kelas 'visible' (yang membuat elemen muncul)
            entry.target.classList.add("visible");
            
            // Setelah muncul, kita tidak perlu mengamatinya lagi
            observer.unobserve(entry.target); 
        }
    });
}, {
    // Threshold 0.2: Mulai animasi ketika 20% elemen terlihat di viewport
    threshold: 0.2 
});

// 3. Mulai mengamati setiap elemen 'fade-in'
fadeElements.forEach(element => {
    observer.observe(element);
});