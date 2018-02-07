
$( document ).ready(function() {
//     function load_home() {
//         document.getElementById("360degVideo").innerHTML='<object type="text/html" data="2_Bhk_Vtour/index.html" class="video_container"></object>';
//     };
//     load_home();
    // $("#content").load("content.html");
    $('.show_fullscreen').click(function() {
        $('.animation360').addClass('full_screen');
        $('.show_fullscreen').toggleClass('display_block');
        $('.hide_fullscreen').toggleClass('display_block');
        $('body').css('overflow','hidden');
    });
    function hide_control() {
        $('.animation360').removeClass('full_screen');
        $('.show_fullscreen').toggleClass('display_block');
        $('.hide_fullscreen').toggleClass('display_block');
        $('body').css('overflow','auto');
    }
    $('.hide_fullscreen').click(function() {
        hide_control();
    });

    window.addEventListener("keydown", function(event) {
        if($( ".hide_fullscreen " ).hasClass( "display_block" )){
            if(event.code === 'Escape'){
                hide_control();
            }
        }
    }, true);

    $("#header").load("header.html");
    $("#dynamic_footer").load("footer.html");
    // $("#stickyform").load("stickycontactform.html");
    $('.nav-toggle').click(function() {
        $(this).toggleClass('opened');
        $('.main_menu').toggleClass('display_block');
    });
    $('.brochure_dwnld,.enquire_btn').click(function(){
        $('.lead_form_popup_container').css('display','block');
        $('body ').css('overflow','hidden');
    });
    $('.close_icon').click(function(){
        $('.lead_form_popup_container').css('display','none');
        $('body').css('overflow','auto');
    });
    //for autoplaying the youtube video when its come to view
    var iframe = document.getElementById("autoplay-video"),
        disableAutoPlay = false;
    function isScrolledIntoView(el) {
        var elemTop = el.getBoundingClientRect().top,
            elemBottom = el.getBoundingClientRect().bottom,
            isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        return isVisible;
    }
    $(window).scroll(function () {
        if (!disableAutoPlay) {
            if (isScrolledIntoView(iframe)) {
                iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            } else {
                iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
        }
    });
    window.addEventListener("scroll", function (event) {
        var scroll = this.scrollY,
            left = this.scrollX;
        var distance = $('#overview').offset().top  - nav_height - nav_height1,
            $window = $(window);
        if ( $window.scrollTop() >= distance ) {
            $(".submenu_container").addClass('slideInDown');
            $(".submenu_container").css("position","fixed");
            $(".submenu_container").css("margin-top","0");
        }
        if ( $window.scrollTop() < distance ) {
            $(".submenu_container").removeClass('slideInDown');
            $(".submenu_container").css("position","absolute");
            $(".submenu_container").css("margin-top","-52px");
        }
    }, false);
    var sections = $('.sec'),
        nav = $('nav'),
        nav1 = $('.submenu_container'),
        nav_height = nav.outerHeight();
    nav_height1 = nav1.outerHeight();
    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();
        sections.each(function() {
            var top = $(this).offset().top - nav_height - nav_height1 - 10 ,
                bottom = top + $(this).outerHeight();
            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');
                $(this).addClass('active');
                nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
                if(window.innerWidth<1024) {
                    $("#menutitle").text($('.active .hdr').text());
                }
            }
        });
    });
    nav.find('a').on('click', function () {
        var $el = $(this),
            id = $el.attr('href');
        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height - nav_height1
        }, 500);
        return false;
    });

    //mention last section id name here eg:#development_photo
    var curr = $( "#development_photo" );
    $( ".prev_section" ).click(function() {
        curr = curr.prev();
        console.log(" $curr", curr);
        $('html, body').animate({
            scrollTop: curr.offset().top
        }, 200);
    });
    $( ".next_section" ).click(function() {
        next = curr.next();
        $('html, body').animate({
            scrollTop: next.offset().top
        }, 200);
    });
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 8,
        asNavFor: '.slider-for',
        dots: false,
        centerMode: false,
        focusOnSelect: true
    });
    $('.floor_plan_carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        variableWidth: false,
        asNavFor: '.carousel_list'
    });
    $('.carousel_list').slick({
        slidesToShow: 6,
        asNavFor: '.floor_plan_carousel',
        dots: false,
        centerMode: false,
        variableWidth: true,
        focusOnSelect: true
    });
    $('.floor_plan_carousel .slick-slide').click(function() {
        $('.floor_plan_container1').css('display','block');
        $('.slider-nav,.slider-for').slick('setPosition');
        $('body').css('overflow','hidden');
    });
    $('.close_floor_plan').click(function() {
        $('.floor_plan_container1').css('display','none');
        $('body').css('overflow','auto');
    });
    $("a").on("click touchend", function(e) {
        var el = $(this);
        var link = el.attr("href");
        window.location = link;
    });
    $(".tower_list div").on('click',function() {
        //getting value of clicked element using custom attribute
        var id = $(this).attr('data-skylark');
        $('.tower_list div').removeClass('active_section');
        $(this).addClass('active_section');
        $("#" + id ).removeClass('display_none');
        $("#" + id ).addClass('display_block');
        $('.floor_plan_carousel').slick('setPosition');

        $('.tower').not("#" + id ).addClass('display_none');
    });

    $(".tower_list div").on('click',function() {
        //getting value of clicked element using custom attribute
        var id = $(this).attr('data-skylark');
        $('.tower_list div').removeClass('active_section');
        $(this).addClass('active_section');
        console.log("id",id);
        $("#" + id ).removeClass('display_none');
        $("#" + id ).addClass('display_block');
        $('.floor_plan_carousel').slick('setPosition');

        $('.tower_big').not("#" + id ).addClass('display_none');
    });


    $('.slideshow_smallscreen').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: false

    });

    $('.development_photos_carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: false

    });


});
