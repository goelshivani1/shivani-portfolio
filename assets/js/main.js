(function($) {
  "use strict";
  // Add "loaded" class when a section has been loaded
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    $(".section").each(function() {
      var elementTop = $(this).offset().top - $('#header').outerHeight();
      if(scrollTop >= elementTop) {
        $(this).addClass('loaded');
      }
    });
  });

  // One Page Navigation Setup
  $('.one-page-nav #navigation').singlePageNav({
    offset: $('.one-page-nav').outerHeight(),
    filter: ':not(.external)',
    speed: 750,
    currentClass: 'active',

    beforeStart: function() {
    },
    onComplete: function() {
    }
  });

  // Sticky Navbar Affix
  $('.one-page-nav').affix({
    offset: {
      top: $('#topbar').outerHeight(),
    }
  });

  // Smooth Hash Link Scroll
  $('.smooth-scroll').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  $('.nav a').on('click', function(){
    if($('.navbar-toggle').css('display') !=='none'){
      $(".navbar-toggle").click();
    }
  });

  var $container = $('.portfolio-isotope');
  $container.imagesLoaded(function(){
    $container.isotope({
      itemSelector : '.portfolio-item',
      resizable: true,
      resizesContainer: true
    });
  });

  // filter items when filter link is clicked
  $('#filters a').click(function(){
    var selector = $(this).attr('data-filter');
    $container.isotope({ filter: selector });
    return false;
  });

  $('#contactform').submit(function() {
    var action = $(this).attr('action');
    var values = $(this).serialize();

    $.post(action, values, function(data) {
      $('.results').hide().html(data).slideDown('slow');
      $('#contactform').find('.form-control').val('');
    });
    return false;
  });

  $('.iphone-carousel').on('slid.bs.carousel', function () {
    var carouselData = $(this).data('bs.carousel');
    var currentIndex = carouselData.getActiveIndex();
    $('.section-iphone-features .feature-block').removeClass('active');
    $(".section-iphone-features").find("[data-slide-to='" + currentIndex + "']").addClass('active');
  });
})(jQuery);

$(function() {
  $('#carousel-brainstorming').carouFredSel({
    width: '100%',
    items: {
      visible: 1,
      start: 1
    },
    scroll: {
      items: 1,
      duration: 1000,
      timeoutDuration: 4000
    },
    prev: '#prev-brainstorming',
    next: '#next-brainstorming',
    pagination: {
      container: '#pager-brainstorming',
      deviation: 1
    }
  });
});

(function() {

  // detect if IE : from http://stackoverflow.com/a/16657946    
  var ie = (function(){
    var undef,rv = -1; // Return value assumes failure.
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');

    if (msie > 0) {
      // IE 10 or older => return version number
      rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    } else if (trident > 0) {
      // IE 11 (or newer) => return version number
      var rvNum = ua.indexOf('rv:');
      rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
    }

    return ((rv > -1) ? rv : undef);
  }());


  // disable/enable scroll (mousewheel and keys) from http://stackoverflow.com/a/4770179          
  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = [32, 37, 38, 39, 40], wheelIter = 0;

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
    e.preventDefault();
    e.returnValue = false;  
  }

  function keydown(e) {
    for (var i = keys.length; i--;) {
      if (e.keyCode === keys[i]) {
        preventDefault(e);
        return;
      }
    }
  }

  function touchmove(e) {
    preventDefault(e);
  }

  function wheel(e) {
    // for IE 
    //if( ie ) {
      //preventDefault(e);
    //}
  }

  function disable_scroll() {
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
    document.body.ontouchmove = touchmove;
  }

  function enable_scroll() {
    window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;  
  }

  var docElem = window.document.documentElement,
    scrollVal,
    isRevealed, 
    noscroll, 
    isAnimating,
    container = document.getElementById( 'alz-container' ),
    trigger = container.querySelector( 'button.trigger' ),
    process = document.getElementById( 'process' );

  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }
  
  function scrollPage() {
    scrollVal = scrollY();
    
    if( noscroll && !ie ) {
      if( scrollVal < 0 ) return false;
      // keep it that way
      window.scrollTo( 0, 0 );
    }

    if( classie.has( container, 'notrans' ) ) {
      classie.remove( container, 'notrans' );
      return false;
    }

    if( isAnimating ) {
      return false;
    }
    
    if( scrollVal <= 0 && isRevealed ) {
      toggle(0);
    }
    else if( scrollVal > 0 && !isRevealed ){
      toggle(1);
    }
  }

  function toggle( reveal ) {
    isAnimating = true;
    
    if( reveal ) {
      classie.add( container, 'modify' );
      classie.add( process, 'modify' );
    }
    else {
      noscroll = true;
      disable_scroll();
      classie.remove( container, 'modify' );
      classie.remove( process, 'modify' );
    }

    // simulating the end of the transition:
    setTimeout( function() {
      isRevealed = !isRevealed;
      isAnimating = false;
      if( reveal ) {
        noscroll = false;
        enable_scroll();
      }
    }, 600 );
  }

  // refreshing the page...
  var pageScroll = scrollY();
  noscroll = pageScroll === 0;
  
  disable_scroll();
  
  if( pageScroll ) {
    isRevealed = true;
    classie.add( container, 'notrans' );
    classie.add( container, 'modify' );
  }
  
  window.addEventListener( 'scroll', scrollPage );
  trigger.addEventListener( 'click', function() { toggle( 'reveal' ); } );
})();