(function ($) {
    "use strict";
    // offcanvas humbarger
    let offcanvasElement = $('.header-offcanvas');
    offcanvasElement.on('show.bs.offcanvas', function () {
        $('.humbarger-btn').addClass('open');
        $('.btn-close span:nth-child(1)').css({
            transform: 'rotate(45deg)',
            marginBottom: '0'
        });
        $('.btn-close span:nth-child(2)').css({
            transform: 'rotate(-45deg)',
            marginTop: '-5px'
        });
    });
    offcanvasElement.on('hide.bs.offcanvas', function () {
        $('.humbarger-btn').removeClass('open');
        $('.btn-close span:nth-child(1)').css({
            transform: '',
            marginBottom: ''
        });
        $('.btn-close span:nth-child(2)').css({
            transform: '',
            marginTop: ''
        });
    });

    // process section animation
    function initProcessAnimations() {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", function () {

            // Process Line Animation
            gsap.fromTo(".process-line",
                { height: 0 },
                {
                    height: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".process-timeline",
                        start: "top 80%",
                        end: "bottom 70%",
                        scrub: 1,
                    },
                }
            );

            // Process Dots Animation
            $(".process-dot").each(function () {
                gsap.from(this, {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: this,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                });
            });

            // Process Items Animation
            $(".process-item").each(function () {
                const item = this;
                const img = $(item).find(".process-img")[0];
                const content = $(item).find(".process-content")[0];

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                });

                tl.from(img, {
                    x: -50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                })
                .from(content, {
                    x: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                }, "-=0.4");
            });

        });
    }

    // window load → jQuery version
    $(window).on("load", function () {
        initProcessAnimations();
    });


    let resizeTimer;
    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
            // initProcessAnimations(); 
        }, 250);
    });





     // OverlayScrollbars
        const {
            OverlayScrollbars,
            ClickScrollPlugin
        } = OverlayScrollbarsGlobal;
        // Initialize the ClickScrollPlugin
        OverlayScrollbars.plugin(ClickScrollPlugin);
        $("body").each(function () {
            OverlayScrollbars(this, {
                scrollbars: {
                    clickScroll: true,
                    autoHide: "leave",
                    dragScrolling: true,
                    clickScrolling: true,
                },
                scrollBehavior: 'smooth',
            });
        });

        


        // text animation
        gsap.registerPlugin(ScrollTrigger, SplitText);
        gsap.utils.toArray(".hero-title").forEach((element) => {
            // Wrap each word to prevent line breaks between characters
            const originalText = element.textContent;
            const words = originalText.trim().split(/\s+/);
            element.innerHTML = words
                .map(word => `<span class="word-wrap">${word}</span>`)
                .join(' ');

            const split = new SplitText(element, { type: "chars", tag: "span" });

            gsap.set(split.chars, {
                display: "inline-block",
                y: 80,
                opacity: 0,
                force3D: true
            });

            gsap.to(split.chars, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.03,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    // markers: true,
                    toggleActions: "play reverse play reverse"
                }
            });
        });
        gsap.utils.toArray(".animation-line").forEach((element) => {
            const delay = parseFloat(element.getAttribute("animation-dealy")) || 0;
            
            gsap.fromTo(
                element,
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: delay,        // ← dynamic delay from attribute
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                         start: "top 98%",
                        // markers: true,
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        // lenis
        // Initialize a new Lenis instance for smooth scrolling
        const lenis = new Lenis();

        // Listen for the 'scroll' event and log the event data to the console
        // lenis.on('scroll', (e) => {
        //     console.log(e);
        // });

        // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
        // This ensures Lenis's smooth scroll animation updates on each GSAP tick
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000); // Convert time from seconds to milliseconds
        });

        // Disable lag smoothing in GSAP to prevent any delay in scroll animations
        gsap.ticker.lagSmoothing(0);
        // lenis

        // Header scroll detection - add/remove active class
        lenis.on('scroll', (e) => {
            if (e.scroll > 0) {
                $('.header-area').addClass('active');
            } else {
                $('.header-area').removeClass('active');
            }
        });





})(jQuery);