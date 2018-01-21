
$(document).ready(function () {
    $('#fullpage').fullpage(


        {
            menu: '#menu',
            lockAnchors: false,
            // anchors:['Home', 'Portfolio','Contact Us'],
            navigation: true,
            navigationPosition: 'right',
            // navigationTooltips: ['Home', 'Portfolio','Contact Us'],
            showActiveTooltip: false,
            slidesNavigation: false,
            slidesNavPosition: 'bottom',
            scrollingSpeed: 500,
            verticalCentered: true,
            responsiveWidth: 767,
            allowPageScroll: true,

        }
    );
    $(".linkedin_icon1").mouseenter(function () {
        $(this).attr('src', 'images/linkedin_icon_active.png');
    });
    $(".linkedin_icon1").mouseleave(function () {
        $(this).attr('src', 'images/linkedin_icon.png');
    });
    $(".medium").mouseenter(function () {
        $(this).attr('src', 'images/medium1.png');
    });
    $(".medium").mouseleave(function () {
        $(this).attr('src', 'images/medium.png');
    });
    $(".facebook_icon1").mouseenter(function () {
        $(this).attr('src', 'images/facebook1.png');
    });
    $(".facebook_icon1").mouseleave(function () {
        $(this).attr('src', 'images/facebook.png');
    });
    $(".linkedin_icon").mouseenter(function () {
        $(this).attr('src', 'images/linkedin1.png');
    });
    $(".linkedin_icon").mouseleave(function () {
        $(this).attr('src', 'images/linkedin.png');
    });
    $(".twitter_icon1").mouseenter(function () {
        $(this).attr('src', 'images/twitter1.png');
    });
    $(".twitter_icon1").mouseleave(function () {
        $(this).attr('src', 'images/twitter.png');
    });
    $(".hovered_container").mouseenter(function () {
        $(this).find(".comming_soon").fadeIn(100);
    });
    $(".hovered_container").mouseleave(function () {
        $(this).find(".comming_soon").fadeOut(100);
    });

});