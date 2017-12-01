
$(document).ready(function() {
    $("#dynamic_footer").load("footer.html");
    $("#header").load("header.html");
    return false;

});
var menuFlag;
function toggleDemo(){
    $('body').toggleClass('has-mobile-navigation-open');
    $('.sidenav').toggleClass('width_100');
     menuFlag=true;
}
window.onload = function() {
    setTimeout(function() {
        $(".loader").css("visibility", "hidden");

    }, 0);
};

