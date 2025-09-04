// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    // Toggle menu
    navLinks.classList.toggle('active');
    
    // Animate links
    navLinksItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Hamburger animation
    hamburger.classList.toggle('toggle');
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('toggle');
        navLinksItems.forEach(item => {
            item.style.animation = '';
        });
    });
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

// Video Popup
const videoCards = document.querySelectorAll('.video-card');
const videoPopup = document.querySelector('.video-popup');
const closePopup = document.querySelector('.close-popup');
const videoContainer = document.querySelector('.video-popup-inner video');

// Video data with titles and durations (in seconds)
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
    const videoSource = videoPreview.querySelector('source').src;
    const videoFileName = videoSource.split('/').pop();
    const videoInfo = videoData[videoFileName] || { title: 'Video', duration: '0:00' };

    // Create and add duration badge
    const durationBadge = document.createElement('span');
    durationBadge.className = 'video-duration';
    durationBadge.textContent = videoInfo.duration;
    videoThumbnail.appendChild(durationBadge);
    
    // Handle click on play button
    const playVideo = (e) => {
        if (e) e.stopPropagation();
        
        // Show loading state
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'video-loading';
        videoContainer.parentNode.insertBefore(loadingOverlay, videoContainer);
        
        // Set video source
        videoContainer.innerHTML = `
            <source src="${videoSource}" type="video/mp4">
            Your browser does not support the video tag.
        `;
        
        // Set video title if you have a title element in the popup
        const videoTitle = document.querySelector('.video-popup-title');
        if (videoTitle) {
            videoTitle.textContent = videoInfo.title;
        }
        
        // Show popup
        videoPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Handle video loading
        const video = videoContainer;
        video.muted = false;
        
        const handleCanPlay = () => {
            loadingOverlay.remove();
            video.play().catch(e => {
                console.error('Error playing video:', e);
                loadingOverlay.remove();
            });
        };
        
        const handleError = () => {
            console.error('Error loading video:', video.error);
            loadingOverlay.remove();
            alert('Error loading video. Please try again later.');
        };
        
        video.addEventListener('canplay', handleCanPlay, { once: true });
        video.addEventListener('error', handleError, { once: true });
        
        // Load the video
        video.load();
    };
    
    // Add click handlers
    playButton.addEventListener('click', playVideo);
    videoThumbnail.addEventListener('click', (e) => {
        if (e.target === videoThumbnail || e.target === durationBadge) {
            playVideo(e);
        }
    });
    
    // Play video on hover
    card.addEventListener('mouseenter', () => {
        if (!videoPopup.classList.contains('active')) {
            videoPreview.muted = true;
            videoPreview.play().catch(e => {
                // Silent error for autoplay restrictions
                console.log('Autoplay prevented:', e);
            });
        }
    });
    
    // Pause video when not hovering
    card.addEventListener('mouseleave', () => {
        if (!videoPopup.classList.contains('active')) {
            videoPreview.pause();
            videoPreview.currentTime = 0;
        }
    });
});

// Close popup functionality
function closeVideoPopup() {
    if (videoContainer) {
        videoContainer.pause();
        videoContainer.currentTime = 0;
    }
    videoPopup.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close button click
if (closePopup) {
    closePopup.addEventListener('click', closeVideoPopup);
}

// Close when clicking outside the video
if (videoPopup) {
    videoPopup.addEventListener('click', (e) => {
        if (e.target === videoPopup) {
            closeVideoPopup();
        }
    });
}

// Close with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoPopup.classList.contains('active')) {
        closeVideoPopup();
    }
});

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

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    // You can add AOS initialization here if you include the AOS library
    // AOS.init({
    //     duration: 1000,
    //     once: true
    // });
    
    // Add animation class to elements when they come into view
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
