
$(document).ready(function() {
    $("#dynamic_footer").load("footer.html");
    $("#header").load("header.html");
    return false;
    $(".work_btn").click(function(){
        $('.contactus_popup').css('display','block');
    });
});

function toggleDemo(){
    $('body').toggleClass('has-mobile-navigation-open');
    $('.sidenav').toggleClass('width_100');
    $('body').toggleclass('overflow_hidden');
};



//form validator






// window.onload = function() {
//     setTimeout(function() {
//         $(".loader").css("visibility", "hidden");
//             $(".container").css("visibility", "visible");
//     }, 0);
// }
// $(document).ready(function() {
//
//  $('#nav-icon3').click(function() {
//   $("#menu_list").fadeToggle();
//
// });
//
//
//     $('#nav-icon3').click(function() {
//         $(this).toggleClass('open');
//             $("#nav-icon3 span").toggleClass('opencolor');
//
//
//     });
// });
// $(document).ready(function(){
//     var burger = document.querySelector('#nav-icon3'),
//         header = document.querySelector('.menu');
//     console.log(burger);
//      console.log(header);
//     burger.onclick = function() {
//         header.classList.toggle('menu-opened');
//          console.log(header);
//     }
// });
/*$('.send_button').click(function() {

    $(this).css('display', 'none');
    $('.loading').css('display', 'block');



});
*/


/*===========freebies css===============*/

//
// var modal = document.getElementById('myModal');
//
//
// var btn = document.getElementById("f1");
//
//
// var span = document.getElementsByClassName("close")[0];
//
//
// span.onclick = function() {
//     modal.style.display = "none";
//    $('body').css('overflow-y','scroll')
// }
//
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//         $('body').css('overflow-y', 'scroll')
//     }
// }

//
// function selectfreebies(el) {
//
//     var imgSrc = el.src;
//     document.getElementById("fimage").src = imgSrc;
//     console.log("img Src  = " + imgSrc);
//     modal.style.display = "block";
//     $('body').css('overflow', 'hidden')
//
// }
/*======================company====================*/


