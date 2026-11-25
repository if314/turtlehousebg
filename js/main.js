(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
// Google Reviews carousel
const $reviews = $("#google-reviews");

if ($reviews.length) {
    fetch("reviews.json", { cache: "no-store" })
        .then(response => {
            if (!response.ok) throw new Error("Unable to load reviews");
            return response.json();
        })
        .then(data => {
            const reviews = (data.reviews || []).filter(
                review => review.comment
            );

            reviews.forEach(review => {
                const name = review.reviewer?.displayName || "Google User";

                const card = $("<div>", {
                    class: "testimonial-item bg-transparent border rounded p-4"
                });

                card.append('<i class="fa fa-quote-left fa-2x text-primary mb-3"></i>');
                card.append($("<p>").text(review.comment));

                const author = $("<div>", {
                    class: "d-flex align-items-center"
                });

                author.append($("<div>", {
                    class: "avatar"
                }).text(name.charAt(0)));

                author.append(
                    $("<div>", { class: "ps-3" }).append(
                        $("<h5>", { class: "mb-1" }).text(name),
                        $("<small>").text("Google Review")
                    )
                );

                card.append(author);
                $reviews.append(card);
            });

            $reviews.owlCarousel({
                autoplay: true,
                autoplayTimeout: 10000,
                autoplayHoverPause: false,
                smartSpeed: 1000,
                center: true,
                margin: 24,
                dots: false,
autoHeight: true,
                loop: reviews.length > 3,
                nav: true,
navText: ["&#10094;", "&#10095;"],
                responsive: {
                    0: { items: 1 },
                    768: { items: 2 },
                    992: { items: 3 }
                }
            });
        })
        .catch(error => console.error("Google Reviews:", error));
}
    
})(jQuery);

