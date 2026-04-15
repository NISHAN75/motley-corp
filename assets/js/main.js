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

})(jQuery);