
window.onload = function() {
    setTimeout(function() {
        $(".loader").css("visibility", "hidden");
    }, 0);
    


};


$(document).ready(function() {
    $("#dynamic_footer").load("footer.html");
    $("#header").load("header.html");
   


    $("#emailLink").click(function()
    {
        window.open('mailto:contact@dtale.io','_blank','',true);
    });
    // $('body').click(function() {
    //     console.log("outside",menuFlag);
    //     if(menuFlag){
    //         menuFlag=false;
    //         console.log("inside if");
    //     }else{
    //         $('.sidenav').removeClass('width_100');
    //         $('body').removeClass('has-mobile-navigation-open');
    //         console.log("inside close");
    //         menuFlag=true;
    //     }
    // });
    // $('.menuclose ').click(function() {
    //     $('.sidenav').removeClass('width_100');
    //     $('body').removeClass('has-mobile-navigation-open');
    //
    // });
    return false;

});

// var menuFlag=false;
function toggleDemo(){



    // if(!menuFlag) {
        $('body').toggleClass('has-mobile-navigation-open');
        $('.sidenav').toggleClass('width_100');
        // $('.mobile-nav-toggle-button').addClass('menuclose');
        // menuFlag = true;
    //
    // }
    // else{
    //     $('body').removeClass('has-mobile-navigation-open');
    //     $('.sidenav').removeClass('width_100');
    // }
    // console.log("inside on clice ");
}

$(window).on('load', function() {
    var wow = new WOW(
        {
            boxClass:     'wow',
            animateClass: 'animated',
            offset:       0,
            mobile:       true,
            live:         true,
            callback:     function(box) {

            },
            scrollContainer: null
        }
    );
    wow.init();
});


