document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
        });
    });

    // Sticky Navigation on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Image Modal
    const modal = document.querySelector('.image-modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.view-btn');

    viewButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            modal.style.display = 'block';
            modalImg.src = this.getAttribute('data-image');
            modalCaption.textContent = this.parentElement.querySelector('h3').textContent;
        });
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    let currentSlide = 0;

    function showSlide(n) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;

        testimonialSlides[currentSlide].classList.add('active');
        testimonialDots[currentSlide].classList.add('active');
    }

    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            showSlide(index);
        });
    });

    // Auto slide change
    setInterval(function () {
        showSlide(currentSlide + 1);
    }, 5000);

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Here you would typically send the form data to a server
            // For this example, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Here you would typically send the email to a newsletter service
            // For this example, we'll just show an alert
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // Load More Button for Portfolio
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // In a real implementation, this would load more items from a server
            // For this example, we'll just show a message
            alert('More portfolio items would be loaded here in a real implementation.');
        });
    }
});


// ======================= Contact on whatsapp ====================
const phoneNumber = "919542377685"; // Your WhatsApp number with country code
const emailAddress = "bhagavanpavan01@gmail.com"; // Replace with your email

function getMessage() {
    return document.getElementById("messageInput").value.trim();
}

function sendViaWhatsApp() {
    const message = getMessage();
    if (!message) {
        alert("Please enter a message.");
        return;
    }

    const encodedMessage = encodeURIComponent(message);
    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    const whatsappURL = isMobile
        ? `https://wa.me/${phoneNumber}?text=${encodedMessage}`
        : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
}

function sendViaEmail() {
    const message = getMessage();
    if (!message) {
        alert("Please enter a message.");
        return;
    }

    const subject = "Photography & Videography Request";
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
}


// Add this to your existing script.js
document.querySelectorAll('.bts-overlay').forEach(overlay => {
    overlay.addEventListener('click', function() {
        // This would open a modal with the BTS video
        // You can implement similar to your image modal
        alert('BTS video would play here!');
    });
});
