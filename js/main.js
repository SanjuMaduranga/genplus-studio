/*  ---------------------------------------------------
    Template Name: Dreams
    Description: Dreams wedding template
    Author: Colorib
    Author URI: https://colorlib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(600).fadeOut("slow").addClass('hide');

        /*------------------
            Portfolio filter
        --------------------*/
        $('.portfolio__filter li').on('click', function () {
            $('.portfolio__filter li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.portfolio__gallery').length > 0) {
            var containerEl = document.querySelector('.portfolio__gallery');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Masonary
    $('.work__gallery').masonry({
        itemSelector: '.work__item',
        columnWidth: '.grid-sizer',
        gutter: 10
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
		Hero Slider
	--------------------*/
    $('.hero__slider').owlCarousel({
        loop: true,
        dots: true,
        mouseDrag: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 1,
        margin: 0,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
    });

    var dot = $('.hero__slider .owl-dot');
    dot.each(function () {
        var index = $(this).index() + 1;
        if (index < 10) {
            $(this).html('0').append(index);
        } else {
            $(this).html(index);
        }
    });

    /*------------------
        Testimonial Slider
    --------------------*/
    $(".testimonial__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        dotsEach: 2,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 3
            },
            768: {
                items: 2
            },
            320: {
                items: 1
            }
        }
    });

    /*------------------
        Latest Slider
    --------------------*/
    $(".latest__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        dotsEach: 2,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 3
            },
            768: {
                items: 2
            },
            320: {
                items: 1
            }
        }
    });

    /*------------------
        Logo Slider
    --------------------*/
    $(".logo__carousel").owlCarousel({
        loop: true,
        margin: 100,
        items: 6,
        dots: false,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 5
            },
            768: {
                items: 4
            },
            480: {
                items: 3
            },
            320: {
                items: 2
            }
        }
    });

    /*---------------------
    FOOTER TEXT SLIDER
    -----------------------*/

    $('.footertextslider__carousel').owlCarousel({
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 2000,
    smartSpeed: 800,
    responsive:{
        0:{ items:1 },
        576:{ items:2 },
        768:{ items:3 },
        992:{ items:4 }
    }
    });

    /*------------------
    Ultra PRO Video Popup
    --------------------*/
    $('.video-popup').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade mfp-with-zoom',
    removalDelay: 300,
    preloader: true,
    fixedContentPos: false,
    closeOnContentClick: false,
    closeOnBgClick: true,

        iframe: {
        markup: `
        <div class="mfp-iframe-scaler ultra-video">
            <div class="mfp-close"></div>
            <iframe class="mfp-iframe" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
        </div>`,
        patterns: {
            youtube: {
                index: 'youtube.com/',
                id: function(url) {
                    var match = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                    return match ? match[1] : null;
                },
                src: 'https://www.youtube.com/embed/%id%?autoplay=1&rel=0'
            },
            youtu_be: {
                index: 'youtu.be/',
                id: function(url) {
                    return url.split('/').pop();
                },
                src: 'https://www.youtube.com/embed/%id%?autoplay=1&rel=0'
            },
            vimeo: {
                index: 'vimeo.com/',
                id: function(url) {
                    return url.split('/').pop();
                },
                src: 'https://player.vimeo.com/video/%id%?autoplay=1'
            }
        }
        },

        callbacks: {
        open: function () {
            setTimeout(function () {
                const scaler = document.querySelector('.ultra-video');
                const winW = window.innerWidth;
                const winH = window.innerHeight;

                let width, height;

                // 📱 Mobile
                if (winW < 768) {
                    width = winW * 0.95;
                } else {
                    width = Math.min(winW * 0.75, 1100);
                }

                height = width * 0.5625; // 16:9 ratio

                if (height > winH * 0.85) {
                    height = winH * 0.85;
                    width = height / 0.5625;
                }

                scaler.style.width = width + "px";
                scaler.style.height = height + "px";

                // 🎬 Animation
                const popup = document.querySelector('.mfp-content');
                if (popup) {
                    popup.style.animation = 'zoomInPro 0.4s ease';
                }
            }, 100);
        },

        close: function () {
            const popup = document.querySelector('.mfp-content');
            if (popup) {
                popup.style.animation = 'zoomOutPro 0.3s ease';
            }
        }
        }
    });
    
    /*------------------
    Ultra PRO Image Popup
    --------------------*/
    $('.image-popup').magnificPopup({
    type: 'image',
    mainClass: 'mfp-fade mfp-with-zoom',
    removalDelay: 300,
    preloader: true,
    fixedContentPos: false,
    closeOnContentClick: true,
    closeOnBgClick: true,
    gallery: {
        enabled: true // 🔥 enable gallery scroll
    },

    image: {
        markup: `
        <div class="mfp-figure ultra-image">
            <div class="mfp-close"></div>
            <img class="mfp-img" />
        </div>`
    },

    callbacks: {
        open: function () {
            setTimeout(function () {

                const container = document.querySelector('.ultra-image');
                const img = document.querySelector('.mfp-img');

                const winW = window.innerWidth;
                const winH = window.innerHeight;

                let width, height;

                // 📱 Mobile
                if (winW < 768) {
                    width = winW * 0.95;
                } else {
                    width = Math.min(winW * 0.75, 1100);
                }

                height = width * 0.75; // 🔥 flexible ratio for images

                if (height > winH * 0.85) {
                    height = winH * 0.85;
                    width = height * 1.33;
                }

                container.style.width = width + "px";
                container.style.height = height + "px";

                if (img) {
                    img.style.width = "100%";
                    img.style.height = "100%";
                    img.style.objectFit = "cover"; // 🔥 premium look
                }

                // 🎬 Animation
                const popup = document.querySelector('.mfp-content');
                if (popup) {
                    popup.style.animation = 'zoomInPro 0.4s ease';
                }

            }, 100);
        },

        close: function () {
            const popup = document.querySelector('.mfp-content');
            if (popup) {
                popup.style.animation = 'zoomOutPro 0.3s ease';
            }
        }
    }
    });

    /*------------------
        Counter
    --------------------*/
    $('.counter_num').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

})(jQuery);