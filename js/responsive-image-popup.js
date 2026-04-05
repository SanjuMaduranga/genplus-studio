/*  ========================================
    RESPONSIVE IMAGE POPUP HANDLER
    ======================================== */

'use strict';

const ResponsiveImagePopup = (function() {

    let currentImageIndex = 0;
    let images = [];

    // ========== CALCULATE RESPONSIVE DIMENSIONS ==========
    const calculateDimensions = function() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        let maxWidth;
        let maxHeight;
        
        // Responsive max dimensions based on device
        if (screenWidth < 480) {
            maxWidth = screenWidth * 0.90; // 90% on very small screens
            maxHeight = screenHeight * 0.80;
        } else if (screenWidth < 768) {
            maxWidth = screenWidth * 0.95; // 95% on mobile
            maxHeight = screenHeight * 0.85;
        } else {
            maxWidth = screenWidth * 0.80; // 80% on desktop
            maxHeight = screenHeight * 0.90;
        }
        
        return {
            maxWidth: Math.floor(maxWidth),
            maxHeight: Math.floor(maxHeight)
        };
    };

    // ========== LOAD IMAGE WITH NATURAL DIMENSIONS ==========
    const loadImageWithDimensions = function(imgUrl) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = function() {
                resolve({
                    src: imgUrl,
                    width: this.naturalWidth,
                    height: this.naturalHeight
                });
            };
            img.onerror = function() {
                resolve(null);
            };
            img.src = imgUrl;
        });
    };

    // ========== CALCULATE FIT DIMENSIONS ==========
    const fitImageToScreen = function(imgData, maxDimensions) {
        if (!imgData) return null;

        let width = imgData.width;
        let height = imgData.height;
        const ratio = width / height;

        // Fit to max width
        if (width > maxDimensions.maxWidth) {
            width = maxDimensions.maxWidth;
            height = width / ratio;
        }

        // Fit to max height
        if (height > maxDimensions.maxHeight) {
            height = maxDimensions.maxHeight;
            width = height * ratio;
        }

        return {
            width: Math.floor(width),
            height: Math.floor(height)
        };
    };

    // ========== DISPLAY IMAGE ==========
    const displayImage = function(imageSrc) {
        // Show overlay
        const overlay = document.getElementById('image-popup-overlay');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Show loading spinner
        const spinner = document.getElementById('image-popup-spinner');
        spinner.style.display = 'flex';

        // Load image
        loadImageWithDimensions(imageSrc).then((imgData) => {
            if (!imgData) {
                console.error('Could not load image');
                return;
            }

            const dimensions = calculateDimensions();
            const fitDimensions = fitImageToScreen(imgData, dimensions);

            const container = document.querySelector('.popup-image-container');
            const img = document.querySelector('.popup-image-container img');
            
            container.style.width = fitDimensions.width + 'px';
            container.style.height = fitDimensions.height + 'px';
            img.src = imageSrc;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';

            img.addEventListener('load', function() {
                spinner.style.display = 'none';
            }, { once: true });

            // Update counter if gallery
            if (document.querySelector('.popup-image-counter')) {
                updateCounter();
            }
        });
    };

    // ========== UPDATE COUNTER ==========
    const updateCounter = function() {
        if (images.length > 1) {
            const counter = document.querySelector('.popup-image-counter');
            if (counter) {
                counter.textContent = `${currentImageIndex + 1} / ${images.length}`;
            }
        }
    };

    // ========== NAVIGATE GALLERY ==========
    const navigateGallery = function(direction) {
        if (images.length <= 1) return;

        currentImageIndex += direction;
        if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        }

        displayImage(images[currentImageIndex]);
    };

    // ========== OPEN IMAGE POPUP ==========
    const openPopup = function(imageSrc, galleryId = null) {
        if (!imageSrc) {
            console.warn('No image source provided');
            return;
        }

        currentImageIndex = 0;
        images = [];

        // If gallery ID provided, collect all images
        if (galleryId) {
            const galleryImages = document.querySelectorAll(`[data-image-gallery="${galleryId}"]`);
            galleryImages.forEach((img) => {
                images.push(img.getAttribute('data-image-popup'));
            });

            // Find starting index
            currentImageIndex = images.indexOf(imageSrc);
            if (currentImageIndex === -1) {
                images = [imageSrc];
                currentImageIndex = 0;
            }
        } else {
            images = [imageSrc];
        }

        displayImage(imageSrc);
    };

    // ========== CLOSE IMAGE POPUP ==========
    const closePopup = function() {
        const overlay = document.getElementById('image-popup-overlay');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';

        // Clear image
        const img = document.querySelector('.popup-image-container img');
        if (img) {
            img.src = '';
        }
    };

    // ========== FULLSCREEN TOGGLE ==========
    const toggleFullscreen = function() {
        const container = document.querySelector('.popup-image-container');
        
        if (!document.fullscreenElement) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.mozRequestFullScreen) {
                container.mozRequestFullScreen();
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen();
            } else if (container.msRequestFullscreen) {
                container.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    // ========== KEYBOARD NAVIGATION ==========
    const handleKeyboard = function(e) {
        const overlay = document.getElementById('image-popup-overlay');
        if (!overlay || !overlay.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closePopup();
                break;
            case 'ArrowRight':
                navigateGallery(1);
                break;
            case 'ArrowLeft':
                navigateGallery(-1);
                break;
        }
    };

    // ========== EVENT LISTENERS ==========
    const initEventListeners = function() {
        // Close button
        const closeBtn = document.getElementById('image-popup-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closePopup);
        }

        // Overlay click to close
        const overlay = document.getElementById('image-popup-overlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    closePopup();
                }
            });
        }

        // Previous/Next buttons
        const prevBtn = document.getElementById('image-popup-prev');
        const nextBtn = document.getElementById('image-popup-next');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => navigateGallery(-1));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => navigateGallery(1));
        }

        // Fullscreen button
        const fullscreenBtn = document.getElementById('image-popup-fullscreen');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', toggleFullscreen);
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', handleKeyboard);

        // Recalculate dimensions on window resize
        window.addEventListener('resize', function() {
            if (overlay && overlay.classList.contains('active')) {
                if (images.length > 0) {
                    displayImage(images[currentImageIndex]);
                }
            }
        });

        // Trigger popup on image links
        document.addEventListener('click', function(e) {
            if (e.target.closest('[data-image-popup]')) {
                e.preventDefault();
                const imageSrc = e.target.closest('[data-image-popup]').getAttribute('data-image-popup');
                const galleryId = e.target.closest('[data-image-popup]').getAttribute('data-image-gallery');
                openPopup(imageSrc, galleryId);
            }
        });
    };

    // ========== PUBLIC API ==========
    return {
        init: function() {
            initEventListeners();
        },
        open: function(imageSrc, galleryId) {
            openPopup(imageSrc, galleryId);
        },
        close: function() {
            closePopup();
        }
    };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    ResponsiveImagePopup.init();
});
