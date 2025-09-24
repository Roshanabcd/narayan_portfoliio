// Clean JavaScript for Aatish Karn Portfolio
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
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Sticky Header on Scroll
    function initStickyHeader() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Typing Effect
    function initTypingEffect() {
        const typingText = document.querySelector('.typing-text');
        if (!typingText) return;
        
        const text = "Hi, I'm Aatish Karn";
        let index = 0;
        
        typingText.innerHTML = '';
        typingText.style.borderRight = '2px solid #ff6b35';
        
        function type() {
            if (index < text.length) {
                typingText.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, 100);
            } else {
                typingText.style.borderRight = 'none';
            }
        }
        
        setTimeout(type, 500);
    }

    // Video Popup Functionality
    function initVideoPopup() {
        const videoCards = document.querySelectorAll('.video-card');
        const videoPopup = document.querySelector('.video-popup');
        const closePopup = document.querySelector('.close-popup');
        const videoPlayer = document.querySelector('.video-popup .video-player');

        if (!videoPopup || !videoPlayer) return;

        // Video data
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

            // Add duration badge
            if (!videoThumbnail.querySelector('.video-duration')) {
                const durationBadge = document.createElement('span');
                durationBadge.className = 'video-duration';
                durationBadge.textContent = videoInfo.duration;
                videoThumbnail.appendChild(durationBadge);
            }
            
            // Handle video play
            const playVideo = (e) => {
                if (e) e.stopPropagation();
                
                videoPlayer.src = videoSrc;
                videoPopup.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                videoPlayer.load();
                setTimeout(() => {
                    videoPlayer.play().catch(e => console.log('Autoplay prevented:', e));
                }, 100);
            };
            
            // Add click handlers
            playButton.addEventListener('click', playVideo);
            videoThumbnail.addEventListener('click', playVideo);
            
            // Hover preview
            card.addEventListener('mouseenter', () => {
                if (!videoPopup.classList.contains('active')) {
                    videoPreview.muted = true;
                    videoPreview.play().catch(e => console.log('Autoplay prevented:', e));
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
            videoPlayer.src = '';
            videoPopup.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        if (closePopup) {
            closePopup.addEventListener('click', closeVideoPopup);
        }

        videoPopup.addEventListener('click', (e) => {
            if (e.target === videoPopup) {
                closeVideoPopup();
            }
        });

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
                item.style.cursor = 'pointer';
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

    // Theme Toggle Functionality
    function initThemeToggle() {
        const themeSwitch = document.getElementById('theme-switch');
        const body = document.body;
        
        if (!themeSwitch) return;
        
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

    // Video Search and Filter
    function initVideoSearch() {
        const searchInput = document.getElementById('video-search');
        const filterSelect = document.getElementById('video-filter');
        const sortSelect = document.getElementById('video-sort');
        const videoCards = document.querySelectorAll('.video-card');
        
        if (!searchInput || !filterSelect || !sortSelect) return;
        
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
            
            videoCards.forEach(card => {
                card.style.display = 'none';
            });
            
            setTimeout(() => {
                filteredVideos.forEach((video, index) => {
                    if (video.element) {
                        video.element.style.display = 'block';
                        video.element.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
                    }
                });
            }, 100);
        }
        
        searchInput.addEventListener('input', filterAndSortVideos);
        filterSelect.addEventListener('change', filterAndSortVideos);
        sortSelect.addEventListener('change', filterAndSortVideos);
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
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
        
        // Initialize Chart if Chart.js is available
        const ctx = document.getElementById('growthChart');
        if (ctx && typeof Chart !== 'undefined') {
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
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    }
                }
            });
        }
    }

    // Back to Top Button
    function initBackToTop() {
        const backToTopBtn = document.querySelector('.back-to-top');
        if (!backToTopBtn) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Contact Form
    function initContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Message sent successfully!');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Smooth Scrolling for Navigation Links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Initialize all functions when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initStickyHeader();
        initTypingEffect();
        initVideoPopup();
        initImageLightbox();
        initThemeToggle();
        initVideoSearch();
        initAnalytics();
        initBackToTop();
        initContactForm();
        initSmoothScrolling();
        
        console.log('Portfolio initialized successfully!');
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

})();

// Add required CSS animations
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
    
    .gallery-item {
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    
    .gallery-item:hover {
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);
