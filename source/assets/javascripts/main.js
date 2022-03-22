//= require lib/mousewheel.js
//= require lib/skrollr.js

$(function() {
  var isMobile = false;
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) { isMobile = true; }


  var $screensBox = $('.js__screens'),
    $screens = $screensBox.find('.js__screen'),
    $menuEls = $('.menu-item'),

    offsets,
    off = $('.header').height(),
    offHeight = off + $('.footer_fixed').height(),
    screensAmount = $screens.length,
    scrollTop = 0,
    currentSlide = 0,
    isAnimating = false,
    isSlides = $screensBox.hasClass('js__sld'),
    screens = [],

    CLASS_ACTIVE = 'is__active',
    CLASS_INVIEW = 'is__inview';

  $screens.each(function(index, el) {
    var scr = {};
    scr.$el = $(this);
    scr.$menuEl = $menuEls.filter('[data-scrollto="#' + scr.$el.attr('id') + '"]');
    screens.push(scr);
  });

  var setScreensOffsets = function() {
    $.each(screens, function(index, scr) {
      scr.offset = scr.$el.offset().top - off;
    });
  };

  function screensResize() {
    var screenHeight = $(window).height() - offHeight;
    if ($(window).width() < 1025) {
      $(document).off('mousewheel');
    }
    else {
      if (isSlides) {
        removeListener();
        addListener();
      }
    }
    $screens.css({
      'height': screenHeight,
      'line-height': screenHeight - 260 + 'px'
    });

    setScreensOffsets();
  }

  function removeListener() {
    $(document).off('mousewheel')
  }
  function addListener() {
    isAnimating = false;
    $(document).on('mousewheel', function(e, delta, deltaX, deltaY) {
      e.preventDefault();
      if (!isAnimating) {
        if (deltaY < 0) {
          slideNext()
        }
        else {
          slidePrev();
        }
      }
      else {
        // e.preventDefault();
      }
    });
  }

  function slideTo(index) {
    if (index <= screensAmount) {
      isAnimating = true;
      $('html, body').stop().animate({
        scrollTop: offsets[index]
      }, 500);
      setTimeout(function() {
        isAnimating = false;
      }, 700);
    }
  }

  function slideNext() {
    currentSlide++;
    if (currentSlide > screensAmount) {
      currentSlide = screensAmount;
    }
    // else if (currentSlide == screensAmount) {
    //   slideTo(-1);
    // }
    slideTo(currentSlide);
  }

  function slidePrev() {
    currentSlide--;
    if (currentSlide < 0) currentSlide = 0;
    slideTo(currentSlide);
  }

  var scrollHandler = function() {
    var scrollTop = $(document).scrollTop(),
      current;

    $.each(screens, function(index, scr) {
      if (scrollTop > scr.offset) {
        current = scr;
      }
    });

    $menuEls.removeClass(CLASS_INVIEW);
    if (current) {
      current.$menuEl.addClass(CLASS_INVIEW);
    }
  };

  if (!isMobile) {

    screensResize();

    setTimeout(function() {
      offsets = $.map($screens, function(el) {
        return $(el).position().top;
      });
      offsets.push($('.footer_static').position().top);

      var scrollTop = $(document).scrollTop();
      if (scrollTop > 0) {
        currentSlide = function() {
          for (var i = 0; i < screensAmount; i++) {
            if (offsets[i] > scrollTop) {
              return i - 1;
            }
          }
          return screensAmount;
        }();
      }
    }, 1000);

    $(window).resize(function() {
      clearTimeout($.data(this, 'timer'));
      $.data(this, 'timer', setTimeout(screensResize, 100));
    });

    // if ($(window).width() > 1024 && isSlides) {
    //   addListener();
    // }

    // $(document).keydown(function(e) {
    //   if (e.keyCode == 40 || e.keyCode == 34) {
    //     e.preventDefault;
    //     slideNext();
    //   }
    //   if (e.keyCode == 38 || e.keyCode == 33) {
    //     e.preventDefault;
    //     slidePrev();
    //   }
    // });

    $('.js__menu').on('click', 'a', function(e) {
      e.preventDefault();
      currentSlide = $(this).index();
      slideTo(currentSlide);
    });
  }
  setTimeout(function() {
    $screensBox.addClass(CLASS_ACTIVE);
    if ($('body').hasClass('index_prlx')) {
      var s = skrollr.init({forceHeight: false});
    }
    if ($('body').hasClass('index_prlx')) {
      skroller();
    }
  }, 1000);

  $('.screen').each(function() {
    var $box = $(this),
      $toggler = $box.find('.promos-toggler');

    $toggler.on('click', function() {
      $box.toggleClass(CLASS_ACTIVE);
    });
  });

  $(window).on('scroll', scrollHandler);

});
