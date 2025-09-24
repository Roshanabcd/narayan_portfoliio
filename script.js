// Global variables and main functionality
(function() {
    'use strict';
    
    // Mobile Navigation Toggle
    function initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const navLinksItems = document.querySelectorAll('.nav-links li');
        
        if (!hamburger || !navLinks) return;
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
    
    // Animate links
    navLinksItems.forEach((link, index) => {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
// Sticky Header on Scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typing Effect
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = "Hi, I'm Aatish Karn";
    let index = 0;
    
    function type() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        } else {
            // Remove the cursor after typing is done
            typingText.style.borderRight = 'none';
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(type, 500);
}

// Video Popup Functionality
function initVideoPopup() {
    const videoCards = document.querySelectorAll('.video-card');
    const videoPopup = document.querySelector('.video-popup');
    const closePopup = document.querySelector('.close-popup');
    const videoPlayer = document.querySelector('.video-popup .video-player');

    if (!videoPopup || !videoPlayer) return;

    // Video data with titles and durations
    const videoData = {
        'first_thumbnail.mp4': { title: 'First Thumbnail', duration: '2:15' },
        '2nd_thumbnail.mp4': { title: 'Second Thumbnail', duration: '1:45' },
        'moment.mp4': { title: 'Special Moments', duration: '3:20' },
        'thumbnail_3.mp4': { title: 'Adventure Time', duration: '2:50' }
    };

    // Initialize video cards
    videoCards.forEach((card) => {
        const videoThumbnail = card.querySelector('.video-thumbnail');
        const videoPreview = card.querySelector('.video-preview');
        const playButton = card.querySelector('.play-button');
        
        if (!videoPreview || !playButton) return;
        
        const videoSource = videoPreview.querySelector('source');
        if (!videoSource) return;
        
        const videoSrc = videoSource.src;
        const videoFileName = videoSrc.split('/').pop();
        const videoInfo = videoData[videoFileName] || { title: 'Video', duration: '0:00' };

        // Create and add duration badge
        if (!videoThumbnail.querySelector('.video-duration')) {
            const durationBadge = document.createElement('span');
            durationBadge.className = 'video-duration';
            durationBadge.textContent = videoInfo.duration;
            videoThumbnail.appendChild(durationBadge);
        }
        
        // Handle video play
        const playVideo = (e) => {
            if (e) e.stopPropagation();
            
            // Set video source
            videoPlayer.src = videoSrc;
            
            // Show popup
            videoPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Play video
            videoPlayer.load();
            videoPlayer.play().catch(e => {
                console.log('Autoplay prevented:', e);
            });
        };
        
        // Add click handlers
        playButton.addEventListener('click', playVideo);
        videoThumbnail.addEventListener('click', playVideo);
        
        // Hover preview
        card.addEventListener('mouseenter', () => {
            if (!videoPopup.classList.contains('active')) {
                videoPreview.muted = true;
                videoPreview.play().catch(e => {
                    console.log('Autoplay prevented:', e);
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!videoPopup.classList.contains('active')) {
                videoPreview.pause();
                videoPreview.currentTime = 0;
            }
        });
    });

    // Close popup functionality
    function closeVideoPopup() {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        videoPopup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Close button click
    if (closePopup) {
        closePopup.addEventListener('click', closeVideoPopup);
    }

    // Close when clicking outside
    videoPopup.addEventListener('click', (e) => {
        if (e.target === videoPopup) {
            closeVideoPopup();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoPopup.classList.contains('active')) {
            closeVideoPopup();
        }
    });
}

// Image Lightbox Functionality
function initImageLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const currentImageSpan = document.querySelector('.current-image');
    const totalImagesSpan = document.querySelector('.total-images');
    
    if (!lightbox || !lightboxImage) return;
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => item.querySelector('img')).filter(img => img);
    
    if (totalImagesSpan) {
        totalImagesSpan.textContent = images.length;
    }
    
    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImage.src = images[index].src;
        lightboxImage.alt = images[index].alt;
        if (currentImageSpan) {
            currentImageSpan.textContent = index + 1;
        }
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    function showPrevImage() {
        currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
        openLightbox(currentImageIndex);
    }
    
    function showNextImage() {
        currentImageIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
        openLightbox(currentImageIndex);
    }
    
    // Add click handlers to gallery items
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            item.addEventListener('click', () => openLightbox(index));
        }
    });
    
    // Event listeners
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formValues);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Newsletter Subscription
const newsletterForm = document.querySelector('.newsletter-form form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send the email to your mailing list
        console.log('Newsletter subscription:', email);
        
        // Show success message
        alert('Thank you for subscribing to my channel!');
        newsletterForm.reset();
    });
}

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTypingEffect();
    initMobileMenu();
    initScrollEffects();
    initBackToTop();
    initVideoPopup();
    initImageLightbox();
    initThemeToggle();
    initVideoSearch();
    initAnalytics();
    initLazyLoading();
    initContactForm();
    
    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    
    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'dark') {
        themeSwitch.checked = true;
    }
    
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Video Search and Filter Functionality
function initVideoSearch() {
    const searchInput = document.getElementById('video-search');
    const filterSelect = document.getElementById('video-filter');
    const sortSelect = document.getElementById('video-sort');
    const videoCards = document.querySelectorAll('.video-card');
    
    // Video data with categories and metadata
    const videoData = [
        { element: videoCards[0], title: 'First Thumbnail', category: 'adventure', date: new Date('2024-03-15'), views: 1234 },
        { element: videoCards[1], title: 'Second Thumbnail', category: 'lifestyle', date: new Date('2024-03-10'), views: 2456 },
        { element: videoCards[2], title: 'Special Moments', category: 'culture', date: new Date('2024-03-05'), views: 3789 },
        { element: videoCards[3], title: 'Adventure Time', category: 'travel', date: new Date('2024-03-01'), views: 5432 }
    ];
    
    function filterAndSortVideos() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterCategory = filterSelect.value;
        const sortBy = sortSelect.value;
        
        let filteredVideos = videoData.filter(video => {
            const matchesSearch = video.title.toLowerCase().includes(searchTerm);
            const matchesCategory = filterCategory === 'all' || video.category === filterCategory;
            return matchesSearch && matchesCategory;
        });
        
        // Sort videos
        filteredVideos.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return b.date - a.date;
                case 'oldest':
                    return a.date - b.date;
                case 'popular':
                    return b.views - a.views;
                default:
                    return 0;
            }
        });
        
        // Hide all videos first
        videoCards.forEach(card => {
            card.style.display = 'none';
            card.style.animation = 'fadeOut 0.3s ease';
        });
        
        // Show filtered videos with animation
        setTimeout(() => {
            filteredVideos.forEach((video, index) => {
                video.element.style.display = 'block';
                video.element.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
            });
        }, 300);
    }
    
    if (searchInput) searchInput.addEventListener('input', filterAndSortVideos);
    if (filterSelect) filterSelect.addEventListener('change', filterAndSortVideos);
    if (sortSelect) sortSelect.addEventListener('change', filterAndSortVideos);
}

// Analytics Counter Animation
function initAnalytics() {
    const counters = document.querySelectorAll('.analytics-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
    
    // Initialize Chart.js for growth chart
    const ctx = document.getElementById('growthChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Subscribers',
                    data: [1200, 1900, 3000, 5000, 6500, 8500],
                    borderColor: '#ff6b35',
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Views',
                    data: [15000, 25000, 45000, 75000, 95000, 125000],
                    borderColor: '#f39c12',
                    backgroundColor: 'rgba(243, 156, 18, 0.1)',
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y1'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                }
            }
        });
    }
}

// Advanced Image Lightbox
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const currentImageSpan = document.querySelector('.current-image');
    const totalImagesSpan = document.querySelector('.total-images');
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems);
    
    if (totalImagesSpan) {
        totalImagesSpan.textContent = images.length;
    }
    
    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImage.src = images[index].src;
        lightboxImage.alt = images[index].alt;
        if (currentImageSpan) {
            currentImageSpan.textContent = index + 1;
        }
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    function showPrevImage() {
        currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
        openLightbox(currentImageIndex);
    }
    
    function showNextImage() {
        currentImageIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
        openLightbox(currentImageIndex);
    }
    
    // Event listeners
    images.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });
    
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Advanced Video Player
function initAdvancedVideoPlayer() {
    const videoPlayer = document.querySelector('.video-player');
    const playPauseBtn = document.querySelector('.play-pause-btn');
    const progressBar = document.querySelector('.progress-bar');
    const progressFilled = document.querySelector('.progress-filled');
    const volumeBtn = document.querySelector('.volume-btn');
    const volumeRange = document.querySelector('.volume-range');
    const currentTimeSpan = document.querySelector('.current-time');
    const totalTimeSpan = document.querySelector('.total-time');
    const speedBtn = document.querySelector('.speed-btn');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const videoOverlay = document.querySelector('.video-overlay');
    
    if (!videoPlayer) return;
    
    let isPlaying = false;
    let currentSpeed = 1;
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    
    function togglePlay() {
        if (isPlaying) {
            videoPlayer.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            videoPlayer.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }
    
    function updateProgress() {
        const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        progressFilled.style.width = `${progress}%`;
        
        if (currentTimeSpan) {
            currentTimeSpan.textContent = formatTime(videoPlayer.currentTime);
        }
    }
    
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
    
    function setProgress(e) {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        videoPlayer.currentTime = percent * videoPlayer.duration;
    }
    
    function toggleMute() {
        if (videoPlayer.muted) {
            videoPlayer.muted = false;
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            volumeRange.value = videoPlayer.volume * 100;
        } else {
            videoPlayer.muted = true;
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            volumeRange.value = 0;
        }
    }
    
    function changeSpeed() {
        const currentIndex = speeds.indexOf(currentSpeed);
        const nextIndex = (currentIndex + 1) % speeds.length;
        currentSpeed = speeds[nextIndex];
        videoPlayer.playbackRate = currentSpeed;
        speedBtn.textContent = `${currentSpeed}x`;
    }
    
    function toggleFullscreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        } else {
            videoPlayer.requestFullscreen();
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        }
    }
    
    // Event listeners
    if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);
    if (progressBar) progressBar.addEventListener('click', setProgress);
    if (volumeBtn) volumeBtn.addEventListener('click', toggleMute);
    if (speedBtn) speedBtn.addEventListener('click', changeSpeed);
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    if (volumeRange) {
        volumeRange.addEventListener('input', (e) => {
            videoPlayer.volume = e.target.value / 100;
            videoPlayer.muted = e.target.value == 0;
        });
    }
    
    videoPlayer.addEventListener('timeupdate', updateProgress);
    videoPlayer.addEventListener('loadedmetadata', () => {
        if (totalTimeSpan) {
            totalTimeSpan.textContent = formatTime(videoPlayer.duration);
        }
    });
    
    videoPlayer.addEventListener('waiting', () => {
        videoOverlay.classList.add('show');
    });
    
    videoPlayer.addEventListener('canplay', () => {
        videoOverlay.classList.remove('show');
    });
}

// Lazy Loading Implementation
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const videos = document.querySelectorAll('video[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    videos.forEach(video => imageObserver.observe(video));
}

// Advanced Contact Form
function initContactForm() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error
        clearError(e);
        
        // Validation rules
        if (field.hasAttribute('required') && !value) {
            showError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        return true;
    }
    
    function showError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }
    
    function clearError(e) {
        const field = e.target;
        field.classList.remove('error');
        
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField({ target: input })) {
                isValid = false;
            }
        });
        
        if (isValid) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                alert('Message sent successfully!');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    .error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
    }
    
    .error-message {
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 0.5rem;
        display: block;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);
