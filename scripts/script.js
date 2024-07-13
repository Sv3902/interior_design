'use strict';

new WOW({
    animateClass: 'animate__animated',
}).init();

let loader = $('.loader');

$(document).ready(function () {

    //главный слайдер "Отзывы наших клиентов"
    $('.single-item').slick({
        centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [

            {
                breakpoint: 992,
                settings: {
                    // centerMode: false,
                    slidesToScroll: 1,
                    slidesToShow: 1
                }
            },

            {
                breakpoint: 767,
                settings: {
                    centerMode: false,
                    slidesToScroll: 1,
                    slidesToShow: 1
                }
            },

            {
                breakpoint: 374,
                settings: {
                    centerMode: false,
                    slidesToScroll: 1,
                    slidesToShow: 1
                }
            }
        ]
    });
    let slider = $('.slider');
    $('.sl-count-total').text(slider.slick('getSlick').slideCount);
    slider.on('afterChange' , function(event , slick, currentSlide) {
        $('.sl-count-current').text(currentSlide + 1);
    });


    //второй слайдер "Почему клиенты выбирают нас"
    $('.slick-item-1').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
    });
    let sl = $('.slider-2');
    $('.sl-count-total-1').text(sl.slick('getSlick').slideCount);
    sl.on('afterChange' , function(event , slick, currentSlide) {
        $('.sl-count-current-1').text(currentSlide + 1);
    });


    //третий слайдер "Наше портфолио"
    $('.slick-item-2').slick({
        centerMode: 3,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
    let slder = $('.slider-3');
    $('.sl-count-total-2').text(slder.slick('getSlick').slideCount);
    slder.on('afterChange' , function(event , slick, currentSlide) {
        $('.sl-count-current-2').text(currentSlide + 1);
    });



    //валидация и вывод обращения
    $('#submit').click(function (){

        let yourName = $('#your_name');
        let yourPhone = $('#your_phone');
        let yourAgree = $('#agree');

        let hasError = false;

        $('.error-input-1').hide();
        $('.error-input-2').hide();

        yourName.css('border-color', 'black');
        yourPhone.css('border-color', 'black');

        if(!yourName.val()) {
            yourName.css('border-color', 'red');
            yourName.next().show();
            hasError = true;
        }

        if(!yourPhone.val()) {
            yourPhone.css('border-color', 'red');
            yourPhone.next().show();
            hasError = true;
        }

        if(!yourAgree.is(':checked')) {
            $('#agree-form-text').css('color', 'red');
            hasError = true;
        }

        if(!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "http://testologia.site/checkout",
                data: { name: yourName.val(), your_phone: yourPhone.val(), agree: yourAgree.checked }
            })
                .done (function (msg) {
                    loader.hide();
                    let msgOrder = $('.message-form');
                    let forms = $('.page-form');

                    if (msg.hasOwnProperty('success') && msg.success === 1) {
                        msgOrder.removeClass('d-none').addClass('d-flex');
                        forms.css('display', 'none');
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                    }
                });
        }
    });


    $('.hdr-btn').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#your_name-popup',
        mainClass: 'mfp-fade',

        callbacks: {
            beforeOpen: function() {
                if($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#your_name-popup';
                }
            },
        }
    });


    //валидация popup
    $('#submit-popup').click(function () {

        let yourNamePopup = $('#your_name_popup');
        let yourPhonePopup = $('#your_phone_popup');
        let yourAgreePopup = $('#agree-popup');
        let hasErrorPopup = false;

        $('.error-input-1-popup').hide();
        $('.error-input-2-popup').hide();
        yourNamePopup.css('border-color', 'rgb(28, 28, 28)');
        yourPhonePopup.css('border-color', 'rgb(28, 28, 28)');

        if (!yourNamePopup.val()) {
            yourNamePopup.css('border-color', 'red');
            yourNamePopup.next().show();
            hasErrorPopup = true;
        }

        if (!yourPhonePopup.val()) {
            yourPhonePopup.css('border-color', 'red');
            yourPhonePopup.next().show();
            hasErrorPopup = true;
        }

        if(!yourAgreePopup.is(':checked')) {
            $('#agree-form-text-popup').css('color', 'red');
            hasErrorPopup = true;
        }

        if(!hasErrorPopup) {
            $.ajax({
                method: "POST",
                url: "http://testologia.site/checkout",
                data: { name: yourNamePopup.val(), your_phone: yourPhonePopup.val(), agree: yourAgreePopup.checked }
            })
                .done (function (msg) {
                    let msgOrder = $('.message-form-popup');
                    let forms = $('.popup-header');

                    if (msg.hasOwnProperty('success') && msg.success === 1) {
                        forms.hide();
                        msgOrder.show();

                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                    }
                });
        }

    })

});