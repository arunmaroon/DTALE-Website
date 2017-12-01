
$(document).ready(function() {
    $("#dynamic_footer").load("footer.html");
    $("#header").load("header.html");
    return false;
    $(".work_btn").click(function(){
        $('.contactus_popup').css('display','block');
    });
});
var menuFlag;
function toggleDemo(){
    $('body').toggleClass('has-mobile-navigation-open');
    $('.sidenav').toggleClass('width_100');
     menuFlag=true;
}


