document.addEventListener('DOMContentLoaded', () => {
    // === 1. Hamburger Menu Logic ===
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        // Toggle (tambah/hapus) kelas 'active' pada daftar link (untuk slide down)
        navLinks.classList.toggle('active');
        
        // Ganti ikon hamburger menjadi X saat terbuka, dan sebaliknya
        menuToggle.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });
    
    // Tutup menu saat link diklik (Berguna di mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '☰'; 
            }
        });
    });

    // === 2. BEST SELLER CAROUSEL LOGIC ===
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.dot');

    let currentIndex = 0;
    const totalItems = carouselItems.length;
    let autoSlideInterval;

    // Function to update carousel position
    function updateCarousel() {
        carouselSlide.style.transform = `translateX(${-currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }

    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    }

    // Dot click handler
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            resetAutoSlide();
        });
    });

    // Event listeners for prev/next buttons
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide(); 
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide(); 
    });

    // Auto-slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Ganti slide setiap 5 detik
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // Start auto-slide when page loads
    startAutoSlide();

    // Pause auto-slide when hovering over carousel
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);

    // Initial load
    updateCarousel();
});