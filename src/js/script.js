$(function() {
    $('.slider').slick({
        infinite: true,
        fade: true,
        prevArrow: '<img class="slider__arrow slider__arrow_left" src="icons/arrow-left.svg">',
        nextArrow: '<img class="slider__arrow slider__arrow_right" src="icons/arrow-right.svg">',
        asNavFor: '.slider-dots'
    });

    $('.slider-dots').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        asNavFor: '.slider'
    });

});