document.addEventListener('DOMContentLoaded', function () {
    // ===== Mobile Menu Toggle =====
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            navList.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // ===== Close menu on link click =====
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle && navList) {
                menuToggle.classList.remove('active');
                navList.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // ===== Sticky Navbar =====
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 100);
        });
        
        // Initialize on page load
        navbar.classList.toggle('scrolled', window.scrollY > 100);
    }

    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (menuToggle && navList && menuToggle.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navList.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            }
        });
    });

    // ===== Portfolio Filtering =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filter = button.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // ===== Image Modal =====
    const modal = document.querySelector('.image-modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');

    if (modal) {
        document.querySelectorAll('.view-btn').forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                if (modalImg) modalImg.src = this.getAttribute('data-image') || '';
                if (modalCaption) {
                    const caption = this.closest('.portfolio-item')?.querySelector('h3')?.textContent || '';
                    modalCaption.textContent = caption;
                }
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }

        window.addEventListener('click', e => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ===== Testimonial Slider =====
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(n) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;
        testimonialSlides[currentSlide].classList.add('active');
        testimonialDots[currentSlide].classList.add('active');
    }

    function startSlider() {
        slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    if (testimonialSlides.length) {
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(index);
                startSlider();
            });
        });
        
        // Initialize first slide
        showSlide(0);
        startSlider();
    }

    // ===== Newsletter Form =====
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Here you would typically send the data to your server
            alert(`Thank you for subscribing with ${email}! We'll keep you updated.`);
            this.reset();
        });
    }

    // ===== Contact Functions =====
    const phoneNumber = "919542377685";
    const emailAddress = "bhagavanpavan01@gmail.com";

    window.sendViaWhatsApp = function () {
        const messageInput = document.getElementById("messageInput");
        if (!messageInput) return;
        
        const msg = messageInput.value.trim();
        if (!msg) {
            alert("Please enter a message.");
            messageInput.focus();
            return;
        }
        
        const url = /Android|iPhone|iPad/i.test(navigator.userAgent)
            ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`
            : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(msg)}`;
        
        window.open(url, "_blank");
    };

    window.sendViaEmail = function () {
        const messageInput = document.getElementById("messageInput");
        if (!messageInput) return;
        
        const msg = messageInput.value.trim();
        if (!msg) {
            alert("Please enter a message.");
            messageInput.focus();
            return;
        }
        
        const mailto = `mailto:${emailAddress}?subject=${encodeURIComponent("Photography & Videography Request")}&body=${encodeURIComponent(msg)}`;
        window.location.href = mailto;
    };

    // ===== FAQ Accordion =====
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all other items if desired
            // document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            
            item.classList.toggle('active');
        });
    });

    // ===== Timeline Animation =====
    const timelineItems = document.querySelectorAll(".timeline-item");
    if (timelineItems.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: "0px 0px -50px 0px"
        });

        timelineItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.15}s`;
            observer.observe(item);
        });
    }

    // ===== Load More Button =====
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            this.textContent = 'Loading...';
            this.disabled = true;
            
            // Simulate loading (replace with actual AJAX call)
            setTimeout(() => {
                // This would be your actual content loading logic
                alert('More items would be loaded here in a real implementation');
                this.textContent = 'Load More';
                this.disabled = false;
            }, 1000);
        });
    }

    // ===== BTS Overlay =====
    document.querySelectorAll('.bts-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            e.preventDefault();
            const videoUrl = overlay.dataset.videoUrl;
            
            if (videoUrl) {
                // In a real implementation, you would show a modal with the video
                const videoModal = document.createElement('div');
                videoModal.className = 'video-modal';
                videoModal.innerHTML = `
                    <div class="video-modal-content">
                        <span class="close-video-modal">&times;</span>
                        <iframe src="${videoUrl}" frameborder="0" allowfullscreen></iframe>
                    </div>
                `;
                document.body.appendChild(videoModal);
                
                videoModal.querySelector('.close-video-modal').addEventListener('click', () => {
                    videoModal.remove();
                });
                
                videoModal.addEventListener('click', (e) => {
                    if (e.target === videoModal) {
                        videoModal.remove();
                    }
                });
            } else {
                alert('BTS video would play here!');
            }
        });
    });
});