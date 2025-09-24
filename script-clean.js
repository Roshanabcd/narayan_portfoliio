// Optimized JavaScript for Aatish Karn Portfolio
(function() {
    'use strict';
    
    // Performance optimization: Use passive event listeners
    const passiveSupported = (() => {
        let passiveSupported = false;
        try {
            const options = {
                get passive() {
                    passiveSupported = true;
                    return false;
                }
            };
            window.addEventListener('test', null, options);
            window.removeEventListener('test', null, options);
        } catch (err) {
            passiveSupported = false;
        }
        return passiveSupported;
    })();
    
    // Throttle function for performance
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };
    
    // Debounce function for performance
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

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

    // Sticky Header on Scroll - Optimized
    function initStickyHeader() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        const handleScroll = throttle(() => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, 16); // ~60fps
        
        window.addEventListener('scroll', handleScroll, passiveSupported ? { passive: true } : false);
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

    // Video Search and Filter - Optimized
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
        
        const filterAndSortVideos = debounce(() => {
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
            
            // Use requestAnimationFrame for smooth animations
            requestAnimationFrame(() => {
                videoCards.forEach(card => {
                    card.style.display = 'none';
                });
                
                filteredVideos.forEach((video, index) => {
                    if (video.element) {
                        video.element.style.display = 'block';
                        video.element.style.animation = `fadeInUp 0.4s ease ${index * 0.05}s both`;
                    }
                });
            });
        }, 300);
        
        searchInput.addEventListener('input', filterAndSortVideos);
        filterSelect.addEventListener('change', filterAndSortVideos);
        sortSelect.addEventListener('change', filterAndSortVideos);
    }

    // Analytics Counter Animation - Optimized
    function initAnalytics() {
        const counters = document.querySelectorAll('.analytics-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const start = performance.now();
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(target * easeOutQuart);
                
                counter.textContent = current.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            requestAnimationFrame(updateCounter);
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });
        
        counters.forEach(counter => observer.observe(counter));
        
        // Initialize Chart if Chart.js is available (lazy loaded)
        const initChart = () => {
            const ctx = document.getElementById('growthChart');
            if (ctx && window.Chart) {
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
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                            }
                        },
                        animation: {
                            duration: 1500
                        }
                    }
                });
            }
        };
        
        // Wait for Chart.js to load
        if (window.Chart) {
            initChart();
        } else {
            // Poll for Chart.js availability
            const checkChart = setInterval(() => {
                if (window.Chart) {
                    clearInterval(checkChart);
                    initChart();
                }
            }, 100);
        }
    }

    // Back to Top Button - Optimized
    function initBackToTop() {
        const backToTopBtn = document.querySelector('.back-to-top');
        if (!backToTopBtn) return;
        
        const handleScroll = throttle(() => {
            const shouldShow = window.scrollY > 300;
            backToTopBtn.style.display = shouldShow ? 'flex' : 'none';
        }, 100);
        
        window.addEventListener('scroll', handleScroll, passiveSupported ? { passive: true } : false);
        
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

    // Optimize gallery animations
    function optimizeAnimations() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('animationend', () => {
                item.classList.add('animation-complete');
            }, { once: true });
        });
    }
    
    // Initialize all functions when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Critical functions first
        initMobileMenu();
        initStickyHeader();
        initTypingEffect();
        
        // Non-critical functions with slight delay
        requestAnimationFrame(() => {
            initVideoPopup();
            initImageLightbox();
            initBackToTop();
            initSmoothScrolling();
            optimizeAnimations();
        });
        
        // Heavy functions with more delay
        setTimeout(() => {
            initThemeToggle();
            initVideoSearch();
            initAnalytics();
            initContactForm();
        }, 100);
        
        console.log('Portfolio initialized successfully!');
    });

    // Preloader - Optimized
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.addEventListener('transitionend', () => {
                preloader.style.display = 'none';
            }, { once: true });
        }
        
        // Remove will-change properties after page load
        setTimeout(() => {
            document.querySelectorAll('[style*="will-change"]').forEach(el => {
                el.style.willChange = 'auto';
            });
        }, 1000);
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
