////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// jQuery
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var $ = jQuery.noConflict();
$(document).ready(function($) {
    "use strict";

    equalHeight('.equal-height');

    $('footer .copyright').css( 'top', $('footer .contact').height() / 2  );

//  Animations

    if ( $(window).width() > 980 ) {
        $('.navigation').toggleClass('fade-in');

        $('.navigation .navbar-nav li a').eachStep(200, function(i, el, duration){
            $(el).toggleClass('fade-in');
        });

        setTimeout(function() {
            $('.slider .fade-in').eachStep(200, function(i, el, duration){
                $(el).toggleClass('fade-in');
            });
        }, 200);

        setTimeout(function() {
            $('.slider .move').eachStep(100, function(i, el, duration){
                $(el).toggleClass('move');
            });
        }, 100);
    }

    var select = $('select');
    if (select.length > 0 ){
        select.selectpicker();
    }

    var bootstrapSelect = $('.bootstrap-select');
    var dropDownMenu = $('.dropdown-menu');

    bootstrapSelect.on('shown.bs.dropdown', function () {
        dropDownMenu.removeClass('animation-fade-out');
        dropDownMenu.addClass('animation-fade-in');
    });

    bootstrapSelect.on('hide.bs.dropdown', function () {
        dropDownMenu.removeClass('animation-fade-in');
        dropDownMenu.addClass('animation-fade-out');
    });

    bootstrapSelect.on('hidden.bs.dropdown', function () {
        var _this = $(this);
        $(_this).addClass('open');
        setTimeout(function() {
            $(_this).removeClass('open');
        }, 100);
    });

//  Fit videos width and height

    if($(".video").length > 0) {
        $(".video").fitVids();
    }

//  Smooth scrolling

    $('.navigation .nav a[href^="#"], a[href^="#"].roll').on('click',function (e) {
        e.preventDefault();
        var target = this.hash,
            $target = $(target);
        if (document.documentElement.clientWidth > 768) {
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - $('.navigation').height()
            }, 2000)
        } else {
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, 2000)
        }
    });

//  iCheck

    if ($('.checkbox').length > 0) {
        $('input').iCheck();
    }

    if ($('.radio').length > 0) {
        $('input').iCheck();
    }


//  Tabs height animation

    if ( $(window).width() > 980 ) {
        $('.tab-content').height( $('.tab-content .tab-pane').height() + 20 );

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var _height = $( $(this).attr('href') + '.tab-pane .panel-group' ).height() + 20;
            $('.tab-content').css('height', _height);
            $('.tab-content').css('overflow', 'visible');

        });

        $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
            setTimeout(function() {
                $('.tab-content').addClass('inherit');
            }, 400);
        });

        $('.nav-tabs li a').on('click', function(){
            $('.tab-content').removeClass('inherit');
        });

        $('.panel-header').on('click', function(){
            $('.tab-content').addClass('inherit');
        });
    }

//  Subscription validation

    submitForm('subscribe');
    submitForm('register');

    $('.fa-plus').click(function(){
       // Fix for Bootstrap Modal on mobile browser. It is kind of mystery why this is working:)
    });

});

//----------------------------------------------------------------------------------------------------------------------
// Functions
//----------------------------------------------------------------------------------------------------------------------

$(window).load(function(){

//  Owl Carousel

    if ($('.owl-carousel').length > 0) {
        setCarouselWidth();
        $("#slider").owlCarousel({
            autoplay: true,
            autoplayTimeout: 5000,
            mouseDrag: false,
            items: 1,
			responsiveClass: true,
            responsiveBaseElement: ".slide",
            dots: false,
            animateOut: 'fadeOut',
            navigationText: ["",""],
			loop: true
        });

        $(".testimonials-carousel").owlCarousel({
            items: 1,
			responsiveClass: true,
            responsiveBaseElement: ".testimonial",
            dots: true
        });
    }

    centerSlider();

});

$(window).on('resize', function(){
    setCarouselWidth();
    centerSlider();
});

// Mobile Slider

function centerSlider(){
    if ( $(window).width() < 979) {
        //$('.modal').removeClass('fade');
        var $navigation = $('.navigation');
        $('#slider .slide').height( $(window).height() - $navigation.height() );
        $('#slider').height( $(window).height() - $navigation.height() );
    }
    setImageHeight();
    setImageHeight(); // Google Chrome fix - the function needs to bee called two times
}

function setImageHeight(){
    var imageWidth = $('#slider .slide img').width();
    var viewPortWidth = $(window).width();
    var centerImage = ( imageWidth/2 ) - ( viewPortWidth/2 );
    $('#slider .slide img').css('left', -centerImage);
}

// Set carousel width

function setCarouselWidth(){
    $('#slider').width( $(window).width() );
}

// Submit form with validation

function submitForm(form){
    $('#form-'+form+" .btn").on("click", function(event){
        $('#form-'+form).validate({
            submitHandler: function() {
                if( form == 'register' && $('#register_ticket').val() == '' ){
                    alert('Select the ticket');
                    return false;
                }
                $.ajax({
                    url: 'assets/php/'+form+'.php',
                    type: 'POST',
                    data: $('#form-'+form).serialize(),
                    success: function(data) {
                        $('#form-'+form + ' .form-group').eachStep(100, function(i, el, duration){
                            $(el).toggleClass('hide-element');
                        });
                        $( '#form-'+form+'-status').removeClass('hide-status');
                        $( '#form-'+form+'-status').html(data);
                    },
                    error : function(data) {
                        //alert(data.responseText);
                    }
                });
                return false;
            }
        });
    });
}

//  Equal heights

function equalHeight(container){

    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;
    $(container).each(function() {

        $el = $(this);
        $($el).height('auto');
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}