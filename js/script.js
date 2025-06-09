document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Preloader ---
    const preloader = document.getElementById('preloader');

    // Fungsi untuk menyembunyikan preloader dengan animasi fade-out
    const hidePreloader = () => {
        if (preloader) {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.7, // Durasi fade out
                ease: "power2.out",
                onComplete: () => {
                    preloader.remove(); // Hapus elemen preloader dari DOM setelah animasi selesai
                }
            });
        }
    };

    // Kita akan menunggu event 'load' dari window, yang menandakan semua resource (gambar, CSS, dll.) sudah dimuat.
    // Jika window.onload terlalu lambat (misal, tidak ada gambar), kita bisa pakai setTimeout sebagai fallback.
    window.addEventListener('load', hidePreloader);

    // Fallback jika window.onload tidak terpicu atau terlalu lama (misal: jika koneksi lambat)
    // Ini akan menyembunyikan preloader setelah 5 detik, terlepas dari status loading lainnya.
    setTimeout(() => {
        if (preloader && preloader.parentNode) { // Pastikan preloader masih ada di DOM
            hidePreloader();
        }
    }, 5000); // Sembunyikan setelah 5 detik sebagai fallback maksimum

    // --- 2. Dark/Light Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const htmlElement = document.documentElement;

    // Fungsi untuk mengatur tema
    const setTheme = (theme) => {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            htmlElement.classList.remove('dark');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
        localStorage.setItem('theme', theme);
    };

    // Cek preferensi tema dari localStorage atau sistem
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        setTheme(currentTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    // Event listener untuk toggle tema
    themeToggleBtn.addEventListener('click', () => {
        const newTheme = htmlElement.classList.contains('dark') ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // --- 3. Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('hidden');
        gsap.to(mobileMenuOverlay, { x: '0%', duration: 0.5, ease: "power3.out" });
    });

    const closeMenu = () => {
        gsap.to(mobileMenuOverlay, {
            x: '100%', // Geser kembali ke kanan (keluar dari layar)
            duration: 0.5,
            ease: "power3.in",
            onComplete: () => {
                mobileMenuOverlay.classList.add('hidden');
            }
        });
    };

    closeMobileMenuButton.addEventListener('click', closeMenu);
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // --- 4. Scroll-spy Navigasi ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const activateNavLink = (id) => {
        navLinks.forEach(link => {
            link.classList.remove('active-link', 'text-purple-300');
            link.classList.add('text-white'); // Reset default
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active-link', 'text-purple-300');
                link.classList.remove('text-white');
            }
        });
    };

    // Menggunakan ScrollTrigger untuk navigasi aktif
    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top center", // Ketika bagian atas section mencapai tengah viewport
            end: "bottom center", // Ketika bagian bawah section melewati tengah viewport
            onEnter: () => activateNavLink(section.id),
            onEnterBack: () => activateNavLink(section.id),
        });
    });

    // Smooth scroll for nav links and "Masuk" button
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Offset untuk header sticky
                const headerHeight = document.getElementById('main-header').offsetHeight;
                gsap.to(window, {
                    scrollTo: {
                        y: targetSection,
                        offsetY: headerHeight // Mengurangi tinggi header dari posisi scroll
                    },
                    duration: 1.2,
                    ease: "power2.inOut"
                });
            }
        });
    });


    // --- 5. Wali Kelas Pesan Toggle ---
    const waliKelasBtn = document.getElementById('wali-kelas-pesan-btn');
    const waliKelasText = document.getElementById('wali-kelas-pesan-text');

    if (waliKelasBtn && waliKelasText) {
        waliKelasBtn.addEventListener('click', () => {
            if (waliKelasText.classList.contains('hidden')) {
                waliKelasText.classList.remove('hidden');
                gsap.fromTo(waliKelasText, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
            } else {
                gsap.to(waliKelasText, {
                    opacity: 0,
                    y: 10,
                    duration: 0.5,
                    ease: "power2.in",
                    onComplete: () => {
                        waliKelasText.classList.add('hidden');
                    }
                });
            }
        });
    }

    // --- 6. Data Siswa 
    const studentsData = [
        { name: "Ardika Fahmi Aladdin", photo: "https://dummyimage.com/300x300/4B0082/fff&text=Ardika", position: "ketua", dream: "-", funFact: "-" },
        { name: "Vera Fransiska", photo: "https://dummyimage.com/300x300/8A2BE2/fff&text=Siska", position: "sekretaris", dream: "-", funFact: "-" },
        { name: "Dian", photo: "https://dummyimage.com/300x300/DA70D6/fff&text=Dian", position: "bendahara", dream: "-", funFact: "-" },
        { name: "Dana Satria", photo: "https://dummyimage.com/300x300/9370DB/fff&text=Satrioo", position: "anggota", dream: "Programmer", funFact: "Jago main gitar" },
        { name: "Risak Puspita Aura", photo: "https://dummyimage.com/300x300/BA55D3/fff&text=Ipah", position: "anggota", dream: "Nggembel", funFact: "-" },
        { name: "Albriyan Solehatul Nugroho", photo: "https://dummyimage.com/300x300/9400D3/fff&text=Mr.Hadi", position: "anggota", dream: "Jadi Tuhan", funFact: "Anak jaulah" },
        { name: "Rendi Oktaviano Mahendra", photo: "https://dummyimage.com/300x300/BF00FF/fff&text=Mamen", position: "anggota", dream: "-", funFact: "-" },
        { name: "Kevin Andrea Sebastian", photo: "https://dummyimage.com/300x300/800080/fff&text=Kevin", position: "anggota", dream: "-", funFact: "-" },
        { name: "Juli Andra Saputra", photo: "https://dummyimage.com/300x300/8B008B/fff&text=Andra", position: "anggota", dream: "-", funFact: "-" },
        { name: "Bayu Sandika", photo: "https://dummyimage.com/300x300/9932CC/fff&text=Satam", position: "anggota", dream: "-", funFact: "-" },
        { name: "Andi Amirullah Haqq", photo: "https://dummyimage.com/300x300/DDA0DD/fff&text=Andi", position: "anggota", dream: "Sound Horeg", funFact: "Hamanya cepuluh tujuh" },
        { name: "Asti Aprilia Dwi Ardika", photo: "https://dummyimage.com/300x300/EE82EE/fff&text=Asti", position: "anggota", dream: "-", funFact: "-" },
        { name: "Rendiansyah Dinoto", photo: "https://dummyimage.com/300x300/DA70D6/fff&text=Rendi", position: "anggota", dream: "-", funFact: "-" },
        { name: "Dafa Reza Ekspander", photo: "https://dummyimage.com/300x300/BA55D3/fff&text=Dapa", position: "anggota", dream: "-", funFact: "-" },
        { name: "Risaka Wahyu Ningtias", photo: "https://dummyimage.com/300x300/9400D3/fff&text=Riska", position: "anggota", dream: "-", funFact: "-" },
        { name: "Putra Sanjaya", photo: "https://dummyimage.com/300x300/BF00FF/fff&text=Putra", position: "anggota", dream: "Solikin", funFact: "-" },
    ];

    const studentGrid = document.getElementById('student-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    const renderStudents = (filter = 'all') => {
        studentGrid.innerHTML = ''; // Clear current students
        const filteredStudents = filter === 'all' ? studentsData : studentsData.filter(student => student.position === filter);

        filteredStudents.forEach((student, index) => {
            const studentCard = document.createElement('div');
            studentCard.className = `student-card bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group cursor-pointer`;
            studentCard.setAttribute('data-position', student.position);
            studentCard.setAttribute('data-aos', 'fade-up');
            studentCard.setAttribute('data-aos-delay', (index % 4) * 100); // Stagger animation

            studentCard.innerHTML = `
                <img src="${student.photo}" alt="Foto ${student.name}" class="w-full h-56 object-cover object-top group-hover:opacity-80 transition-opacity duration-300">
                <div class="p-6 text-center">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${student.name}</h3>
                    <p class="text-purple-600 font-semibold mb-2">${student.position.charAt(0).toUpperCase() + student.position.slice(1)}</p>
                    <p class="text-gray-700 dark:text-gray-300 text-sm italic mb-2">Cita-cita: ${student.dream}</p>
                    <p class="text-gray-600 dark:text-gray-400 text-xs">${student.funFact}</p>
                </div>
            `;
            studentGrid.appendChild(studentCard);
        });
        AOS.refresh(); // Refresh AOS after adding new elements
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active', 'bg-purple-600', 'hover:bg-purple-700', 'text-white'));
            filterButtons.forEach(btn => {
                btn.classList.add('bg-gray-200', 'dark:bg-gray-700', 'hover:bg-purple-200', 'dark:hover:bg-purple-600', 'text-gray-800', 'dark:text-white');
            });

            button.classList.add('active', 'bg-purple-600', 'hover:bg-purple-700', 'text-white');
            button.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-white');

            renderStudents(button.dataset.filter);
        });
    });

    renderStudents(); // Render all students on initial load

    
    const scheduleBody = document.getElementById('schedule-body');
    const days = ["minggu", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
    const todayIndex = new Date().getDay(); // 0 for Sunday, 1 for Monday, etc.
    const todayName = days[todayIndex];

    scheduleData.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        tr.className = `border-b dark:border-gray-700 ${rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}`;

        for (const key in row) {
            const td = document.createElement('td');
            td.className = 'py-4 px-6 text-gray-900 dark:text-white whitespace-nowrap group relative';

            if (key === 'time') {
                td.classList.add('font-medium', 'text-purple-600', 'dark:text-purple-400');
                td.textContent = row[key];
            } else {
                const subject = row[key];
                td.innerHTML = `<span class="block">${subject}</span>`;
                td.classList.add('hover:bg-purple-50', 'dark:hover:bg-gray-700', 'transition-colors', 'duration-200');
            }
            tr.appendChild(td);
        }
        scheduleBody.appendChild(tr);
    });

    // --- 8. Galeri Foto dan Kenangan (Masonry & Lightbox) ---
    const galleryData = [
        { src: "https://source.unsplash.com/600x400/?students,school,class,laughing", category: "daily-life" },
        { src: "https://source.unsplash.com/600x800/?school,students,library,studying", category: "daily-life" },
        { src: "https://source.unsplash.com/600x500/?school,graduation,friends,party", category: "school-event" },
        { src: "https://source.unsplash.com/600x700/?students,fieldtrip,museum", category: "study-tour" },
        { src: "https://source.unsplash.com/600x450/?school,sports,basketball,classmeeting", category: "classmeeting" },
        { src: "https://source.unsplash.com/600x600/?school,students,exam,studying", category: "daily-life" },
        { src: "https://source.unsplash.com/600x900/?students,school,assembly", category: "school-event" },
        { src: "https://source.unsplash.com/600x550/?students,study,friends,group", category: "daily-life" },
        { src: "https://source.unsplash.com/600x750/?school,teachers,students", category: "school-event" },
        { src: "https://source.unsplash.com/600x420/?school,trip,nature,students", category: "study-tour" },
        { src: "https://source.unsplash.com/600x480/?school,classmeeting,football,friends", category: "classmeeting" },
        { src: "https://source.unsplash.com/600x650/?students,classroom,discussion", category: "daily-life" },
        { src: "https://source.unsplash.com/600x380/?students,school,ceremony", category: "school-event" },
        // Tambahkan lebih banyak gambar
    ];

    const galleryGrid = document.getElementById('gallery-grid');
    const galleryFilterButtons = document.querySelectorAll('.gallery-filter-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    const renderGallery = (filter = 'all') => {
        galleryGrid.innerHTML = '';
        const filteredImages = filter === 'all' ? galleryData : galleryData.filter(item => item.category === filter);

        filteredImages.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `break-inside-avoid gallery-item`;
            galleryItem.setAttribute('data-category', image.category);
            galleryItem.setAttribute('data-aos', 'fade-up');
            galleryItem.setAttribute('data-aos-delay', (index % 4) * 100);

            const img = document.createElement('img');
            img.src = image.src;
            img.alt = `Kenangan Kelas - ${image.category}`;
            img.className = 'w-full rounded-lg shadow-md cursor-pointer hover:opacity-90 transition-opacity duration-300';
            img.addEventListener('click', () => {
                lightboxImg.src = image.src;
                lightbox.classList.remove('hidden');
                gsap.to(lightbox, { opacity: 1, duration: 0.3 });
                document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
            });
            galleryItem.appendChild(img);
            galleryGrid.appendChild(galleryItem);
        });
        AOS.refresh();
    };

    galleryFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            galleryFilterButtons.forEach(btn => btn.classList.remove('active', 'bg-purple-600', 'hover:bg-purple-700', 'text-white'));
            galleryFilterButtons.forEach(btn => {
                btn.classList.add('bg-gray-200', 'dark:bg-gray-700', 'hover:bg-purple-200', 'dark:hover:bg-purple-600', 'text-gray-800', 'dark:text-white');
            });

            button.classList.add('active', 'bg-purple-600', 'hover:bg-purple-700', 'text-white');
            button.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-white');

            renderGallery(button.dataset.filter);
        });
    });

    lightboxClose.addEventListener('click', () => {
        gsap.to(lightbox, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                lightbox.classList.add('hidden');
                document.body.style.overflow = ''; // Allow scrolling again
            }
        });
    });

    // Close lightbox on click outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            gsap.to(lightbox, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    lightbox.classList.add('hidden');
                    document.body.style.overflow = '';
                }
            });
        }
    });

    renderGallery(); // Render all gallery images on initial load

    // --- 9. Form Kontak (redirect WhatsApp) ---
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        if (name && subject && message) {
            const whatsappNumber = "6281234567890"; // Ganti dengan nomor WhatsApp Ketua Kelas
            const whatsappMessage = `Halo Ketua Kelas XII IPA 1,\n\nNama: ${name}\nSubjek: ${subject}\nPesan: ${message}\n\nTerima kasih.`;
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

            // Optional: Tambahkan SweetAlert2 atau toast notification untuk konfirmasi
            alert('Pesan Anda akan dikirimkan ke WhatsApp Ketua Kelas!'); // Ganti dengan library UI jika ada
            window.open(whatsappURL, '_blank');

            // Reset form
            contactForm.reset();
        } else {
            alert('Mohon lengkapi semua kolom formulir!'); // Ganti dengan validasi yang lebih baik
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
  const scheduleBody = document.getElementById("schedule-body");

  const jadwal = {
    Senin: {
      "07.00-07.45": "Upacara",
      "07.45-08.30": "Sosiologi",
      "08.30-09.15": "Sosiologi",
      "09.15-09.30": "Istirahat",
      "09.30-10.15": "Informatika",
      "10.15-11.00": "Informatika",
      "11.00-11.45": "Muatan Lokal",
      "11.45-12.15": "Istirahat",
      "12.15-13.00": "PKWU",
      "13.00-13.45": "PKWU",
      "13.45-14.30": "Bahasa Indonesia",
      "15.15-16.00": "P5"
    },
    Selasa: {
      "07.00-07.45": "Geografi",
      "07.45-08.30": "Geografi",
      "08.30-09.15": "Pendidikan Agama",
      "09.15-09.30": "Istirahat",
      "09.30-10.15": "Pendidikan Agama",
      "10.15-11.00": "Bahasa Inggris",
      "11.00-11.45": "Bahasa Inggris",
      "11.45-12.15": "Istirahat",
      "12.15-13.00": "Bahasa Inggris",
      "13.00-13.45": "P5",
      "13.45-14.30": "P5",
      "14.30-15.15": "P5"
    },
    Rabu: {
      "07.00-07.45": "Matematika",
      "07.45-08.30": "Matematika",
      "08.30-09.15": "Matematika",
      "09.15-09.30": "Istirahat",
      "09.30-10.15": "Bahasa Indonesia",
      "10.15-11.00": "Bahasa Indonesia",
      "11.00-11.45": "Penjaskes",
      "11.45-12.15": "Istirahat",
      "12.15-13.00": "Penjaskes",
      "13.00-13.45": "P5",
      "13.45-14.30": "P5",
      "14.30-15.15": "P5"
    },
    Kamis: {
      "07.00-07.45": "Kimia",
      "07.45-08.30": "Kimia",
      "08.30-09.15": "Biologi",
      "09.15-09.30": "Istirahat",
      "09.30-10.15": "Biologi",
      "10.15-11.00": "Sejarah Indonesia",
      "11.00-11.45": "Sejarah Indonesia",
      "11.45-12.15": "Istirahat",
      "12.15-13.00": "Ekonomi",
      "13.00-13.45": "Ekonomi",
      "13.45-14.30": "P5",
      "14.30-15.15": "P5"
    },
    Jumat: {
      "06.40-07.45": "Jumat Sehat",
      "07.45-08.30": "Pendidikan Pancasila",
      "08.30-09.15": "Pendidikan Pancasila",
      "09.15-09.30": "Istirahat",
      "09.30-10.15": "Fisika",
      "10.15-11.00": "Fisika",
      "11.00-12.30": "Istirahat",
      "12.30-13.15": "P5",
      "13.15-14.00": "P5",
      "14.00-16.00": "Ekstrakurikuler"
    },
    Sabtu: {
      "07.00-16.00": "Ekstrakurikuler"
    }
  };

  const semuaJam = [...new Set(Object.values(jadwal).flatMap(h => Object.keys(h)))].sort((a, b) => a.localeCompare(b));

  semuaJam.forEach(jam => {
    const tr = document.createElement("tr");
    const tdJam = document.createElement("td");
    tdJam.className = "py-3 px-6 border font-semibold";
    tdJam.textContent = jam;
    tr.appendChild(tdJam);

    ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].forEach(hari => {
      const td = document.createElement("td");
      td.className = "py-3 px-6 border";
      td.textContent = jadwal[hari]?.[jam] || "";
      tr.appendChild(td);
    });

    scheduleBody.appendChild(tr);
  });
});
