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

function clock() {
    let d = new Date();
    let month_num = d.getMonth();
    let day = d.getDate();
    
    month=new Array("01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12");
    
    if (day <= 9) day = "0" + day;
    
    date = month[month_num] + " | " + d.getFullYear();

    if (document.layers) {
     document.layers.doc_time.document.write(day, date);
     document.layers.doc_time.document.close();
    }
    else document.getElementById("doc_day").innerHTML = day;
        document.getElementById("doc_date").innerHTML = date;
}
clock();