/*
==============
JS for - Responsive Menu jQuery
Muhammad Adam Firdaus
http://www.muhammadadamfirdaus.com/
==============
*/

$(function(){
  // RESPONSIVE STUFF
  function responsive(){
    window.responsive;
    $(window).on('resize', function(){
      clearTimeout(window.responsive);
      window.responsive = setTimeout(function(){
        mobile();
      }, 0);
    });
  }

	menumobile = $('<div id="menu-button" class="menu-mobile"><a href="#">Menu</a></div>');
  menumobileClone = menumobile.clone(true);
  menumobile.remove();

  function mobile(){
		var w = $(window).width();

    if(w <= 800) {
			// General Mobile Devices
      /* menu mobile */
      if($('#menu-button').length == 0){
        $('header .col:nth-of-type(3)').prepend(menumobileClone);
      }
      mobileMenu();
      /* end menu mobile */
		} else {
			// Desktop Begin
			/* menu desktop */
      if($('#menu-button').length){
        resetmobileMenu();
      }

			$('.menu li').on('mouseenter', function(){
				$(this).find('.sub').stop().slideDown(200);
			}).on('mouseleave', function(){
				$(this).find('.sub').stop().slideUp(200);
			});

      if($('.sub').css('display') == 'block'){
        $('.sub').slideUp();
      }
		}
	}

  mobile();
  $(window).on('load resize', responsive);
  /* end of responsive stuff */

  function resetmobileMenu(){
    $('.menu').removeClass('menu-collapsed menu-expanded');
    menubutton.removeClass('close');
    $('#menu-button').detach();
  }

  function mobileMenu(){
    menubutton = $('.menu-mobile');
		menu = $('.menu');

    if($('.menu-mobile a').filter(function() {
        return $.trim($.text(this)) === 'Close';
      }).length){
      $('.menu-mobile a').html('Menu');
      menubutton.removeClass('close');
    }

    function menumobileexpand(){
      if($('.menu-expanded').length){
        removemenumobile();
      } else {
        menubutton.addClass('close');
        menu.addClass('menu-expanded').removeClass('menu-collapsed');
      }

      if($('.close').length){
        $('.menu-mobile a').html('Close');
      } else {
        $('.menu-mobile a').html('Menu');
      }
    }

    function removemenumobile(){
      if($('.menu-collapsed').length){
        menu.removeClass('menu-collapsed');
      } else {
        menu.removeClass('menu-expanded').addClass('menu-collapsed').delay(1000).queue(function(){
          $('.sub').css({'display':'none'});
        });
        menubutton.removeClass('close');
        $('.menu-mobile a').html('Menu');
        if($('.sub').css('display') == 'block'){
          $('.sub').hide();
        }
      }
    }

    removemenumobile();

    /* buka menu */
    $('.menu-mobile').on('click', function(e){
      e.preventDefault();
      e.stopImmediatePropagation();

      menumobileexpand();
    });

    /* klik link menunya */
    $('.menu a').off('click').on('click', function(e){
      e.stopImmediatePropagation();
      return true;
    });

    /* expand collapse sub menu */
		$('.has-sub').off('click').on('click', function(e){
			e.preventDefault();
      e.stopImmediatePropagation();
			var submenu = $(this).find('.sub');
			$('.sub').not(submenu).slideUp();
			submenu.slideToggle();
		});

    /* tutup menu */
    $(document).on('click', function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
      if(e.target.className != 'menu-mobile'){
        removemenumobile();
      }
    });
	}
});
