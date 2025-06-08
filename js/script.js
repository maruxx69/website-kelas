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
        { name: "Candra Wijaya", photo: "https://dummyimage.com/300x300/DA70D6/fff&text=Candra", position: "bendahara", dream: "Entrepreneur", funFact: "Hobi berdagang online" },
        { name: "Dewi Susanti", photo: "https://dummyimage.com/300x300/9370DB/fff&text=Dewi", position: "anggota", dream: "Dokter", funFact: "Punya koleksi komik medis" },
        { name: "Eko Nugroho", photo: "https://dummyimage.com/300x300/BA55D3/fff&text=Eko", position: "anggota", dream: "Desainer Grafis", funFact: "Jago Photoshop dan Illustrator" },
        { name: "Fitri Ramadhani", photo: "https://dummyimage.com/300x300/9400D3/fff&text=Fitri", position: "anggota", dream: "Guru", funFact: "Suka mengajari teman-teman" },
        { name: "Gita Cahyani", photo: "https://dummyimage.com/300x300/BF00FF/fff&text=Gita", position: "anggota", dream: "Penulis", funFact: "Sering menulis cerita pendek" },
        { name: "Hadi Santoso", photo: "https://dummyimage.com/300x300/800080/fff&text=Hadi", position: "anggota", dream: "Insinyur", funFact: "Hobi merakit robot" },
        { name: "Indah Permata", photo: "https://dummyimage.com/300x300/8B008B/fff&text=Indah", position: "anggota", dream: "Fotografer", funFact: "Selalu bawa kamera" },
        { name: "Joko Setiawan", photo: "https://dummyimage.com/300x300/9932CC/fff&text=Joko", position: "anggota", dream: "Atlet Profesional", funFact: "Rutin berlatih basket" },
        { name: "Kiki Amelia", photo: "https://dummyimage.com/300x300/DDA0DD/fff&text=Kiki", position: "anggota", dream: "Koki", funFact: "Pandai membuat kue" },
        { name: "Lukman Hakim", photo: "https://dummyimage.com/300x300/EE82EE/fff&text=Lukman", position: "anggota", dream: "Wartawan", funFact: "Suka mencari berita terkini" },
        { name: "Mega Putri", photo: "https://dummyimage.com/300x300/DA70D6/fff&text=Mega", position: "anggota", dream: "Desainer Fashion", funFact: "Hobi menjahit baju" },
        { name: "Naufal Ramadhan", photo: "https://dummyimage.com/300x300/BA55D3/fff&text=Naufal", position: "anggota", dream: "Peneliti", funFact: "Gemar membaca jurnal ilmiah" },
        { name: "Olivia Wijaya", photo: "https://dummyimage.com/300x300/9400D3/fff&text=Olivia", position: "anggota", dream: "Seniman", funFact: "Melukis di waktu luang" },
        { name: "Putra Sanjaya", photo: "https://dummyimage.com/300x300/BF00FF/fff&text=Putra", position: "anggota", dream: "Pilot", funFact: "Sering membuat model pesawat" },
        
        { name: "Qori Anisa", photo: "https://dummyimage.com/300x300/800080/fff&text=Qori", position: "anggota", dream: "Ahli Gizi", funFact: "Hobi masak makanan sehat" },
        { name: "Rizky Firmansyah", photo: "https://dummyimage.com/300x300/8B008B/fff&text=Rizky", position: "anggota", dream: "Game Developer", funFact: "Sering begadang main game" },
        { name: "Siti Rahayu", photo: "https://dummyimage.com/300x300/9932CC/fff&text=Siti", position: "anggota", dream: "Pustakawan", funFact: "Suka membaca buku klasik" },
        { name: "Taufik Hidayat", photo: "https://dummyimage.com/300x300/DDA0DD/fff&text=Taufik", position: "anggota", dream: "Teknisi", funFact: "Jago memperbaiki elektronik" },
        { name: "Ulfah Nurjanah", photo: "https://dummyimage.com/300x300/EE82EE/fff&text=Ulfah", position: "anggota", dream: "Konsultan", funFact: "Senang memecahkan masalah" },
        { name: "Vina Permata", photo: "https://dummyimage.com/300x300/DA70D6/fff&text=Vina", position: "anggota", dream: "Psikolog", funFact: "Pendengar yang baik" },
        { name: "Wahyu Aditama", photo: "https://dummyimage.com/300x300/BA55D3/fff&text=Wahyu", position: "anggota", dream: "Chef", funFact: "Suka bereksperimen dengan resep" },
        { name: "Xena Putri", photo: "https://dummyimage.com/300x300/9400D3/fff&text=Xena", position: "anggota", dream: "Penari", funFact: "Aktif di sanggar tari" },
        { name: "Yoga Pratama", photo: "https://dummyimage.com/300x300/BF00FF/fff&text=Yoga", position: "anggota", dream: "Fotografer Satwa", funFact: "Suka hiking dan memotret alam" },
        { name: "Zahra Karim", photo: "https://dummyimage.com/300x300/800080/fff&text=Zahra", position: "anggota", dream: "Astronot", funFact: "Penggemar sains fiksi" },
        { name: "Aisyah Nur", photo: "https://dummyimage.com/300x300/8B008B/fff&text=Aisyah", position: "anggota", dream: "Desainer Produk", funFact: "Kreatif membuat prototype" },
        { name: "Bayu Saputra", photo: "https://dummyimage.com/300x300/9932CC/fff&text=Bayu", position: "anggota", dream: "Data Scientist", funFact: "Suka menganalisis data" },
        { name: "Citra Dewi", photo: "https://dummyimage.com/300x300/DDA0DD/fff&text=Citra", position: "anggota", dream: "Ahli Arkeologi", funFact: "Suka membaca buku sejarah" },
        { name: "Deni Ramadhan", photo: "https://dummyimage.com/300x300/EE82EE/fff&text=Deni", position: "anggota", dream: "Petani Modern", funFact: "Tertarik teknologi hidroponik" },
        { name: "Elsa Fitri", photo: "https://dummyimage.com/300x300/DA70D6/fff&text=Elsa", position: "anggota", dream: "Ilustrator", funFact: "Menggambar komik sendiri" },
        { name: "Fajar Rizky", photo: "https://dummyimage.com/300x300/BA55D3/fff&text=Fajar", position: "anggota", dream: "Geologis", funFact: "Suka koleksi batu" }
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

    // --- 7. Jadwal Pelajaran ---
    const scheduleData = [
        { time: "07.00 - 07.45", monday: "Upacara/Apel Pagi", tuesday: "Geografi", wednesday: "Biologi", thursday: "Fisika", friday: "Biologi", saturday: "Kegiatan Pramuka" },
        { time: "07.45 - 08.30", monday: "B. Indonesia", tuesday: "Matematika", wednesday: "Fisika", thursday: "Kimia", friday: "Biologi", saturday: "Ekskul Pilihan" },
        { time: "08.30 - 09.15", monday: "B. Indonesia", tuesday: "Kimia", wednesday: "Matematika", thursday: "Fisika", friday: "Sejarah", saturday: "Ekskul Pilihan" },
        { time: "09.15 - 09.45", monday: "Istirahat", tuesday: "Istirahat", wednesday: "Istirahat", thursday: "Istirahat", friday: "Istirahat", saturday: "Istirahat" },
        { time: "09.45 - 10.30", monday: "Fisika", tuesday: "Kimia", wednesday: "Matematika", thursday: "Biologi", friday: "Sosiologi", saturday: "Olahraga/Seni" },
        { time: "10.30 - 11.15", monday: "Fisika", tuesday: "Biologi", wednesday: "Kimia", thursday: "Biologi", friday: "Sosiologi", saturday: "Olahraga/Seni" },
        { time: "11.15 - 12.00", monday: "Matematika", tuesday: "Biologi", wednesday: "Kimia", thursday: "B. Inggris", friday: "Pend. Agama", saturday: "Kebersihan Kelas" },
        { time: "12.00 - 13.00", monday: "Istirahat & Ishoma", tuesday: "Istirahat & Ishoma", wednesday: "Istirahat & Ishoma", thursday: "Istirahat & Ishoma", friday: "Istirahat & Ishoma", saturday: "Istirahat & Ishoma" },
        { time: "13.00 - 13.45", monday: "B. Inggris", tuesday: "Sejarah", wednesday: "Seni Budaya", thursday: "PJOK", friday: "B. Arab/Mandarin", saturday: "Remedial/Pengayaan" },
        { time: "13.45 - 14.30", monday: "B. Inggris", tuesday: "Sejarah", wednesday: "Seni Budaya", thursday: "PJOK", friday: "B. Arab/Mandarin", saturday: "Remedial/Pengayaan" },
        { time: "14.30 - 15.15", monday: "Prakarya", tuesday: "Prakarya", wednesday: "BK/TIK", thursday: "BK/TIK", friday: "Diskusi/Piket", saturday: "Pulang" }
    ];

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
            } else {
                const dayColumnKey = days[Object.keys(row).indexOf(key)]; // Get day name based on index
                if (todayName === key) { // Check if the current column key matches today's name
                    td.classList.add('bg-purple-100', 'dark:bg-purple-800', 'font-semibold'); // Highlight today's column
                }

                const subject = row[key];
                // Split subject by '/' to find guru/lokasi if available
                const parts = subject.split(' (');
                const mainSubject = parts[0];
                const detail = parts[1] ? parts[1].replace(')', '') : '';

                td.innerHTML = `
                    <span class="block">${mainSubject}</span>
                    ${detail ? `<span class="text-xs text-gray-500 dark:text-gray-400 block">${detail}</span>` : ''}
                `;

                // Add hover effect with tooltip for subject, teacher, location (if applicable)
                if (subject && subject !== "Istirahat" && subject !== "Pulang" && subject !== "Upacara/Apel Pagi" && subject !== "Kegiatan Pramuka" && subject !== "Ekskul Pilihan" && subject !== "Olahraga/Seni" && subject !== "Kebersihan Kelas" && subject !== "Remedial/Pengayaan") {
                    td.classList.add('hover:bg-purple-50', 'dark:hover:bg-gray-700', 'transition-colors', 'duration-200');
                }
            }
            // td.textContent = row[key]; // Ini akan menimpa innerHTML di atas, jadi kita komentari
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