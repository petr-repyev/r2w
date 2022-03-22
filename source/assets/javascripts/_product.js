$(function() {
  $('.js__product').each(function() {
    var $box = $(this),
      $photoBox = $box.find('.js__photo-container'),
      $photoList = $box.find('.js__photo-list'),
      $photos = $photoBox.find('.js__photo'),
      $photosOverlay = $photoBox.find('.js__photos-overlay'),
      $switchersBox = $box.find('.js__thumbs'),
      $switchers = $switchersBox.find('.js__thumb'),
      $zoomIn = $box.find('.js__photos-zoom_in'),
      $zoomOut = $box.find('.js__photos-zoom_out'),
      $navNext = $box.find('.js__photos-nav_next'),
      $navPrev = $box.find('.js__photos-nav_prev'),

      offHeight = $('.header').height() + $('.footer_fixed').height(),
      resizeTimeout,
      scrollTreshold,
      noscroll = false,
      isFullScreen = false,

      CLASS_ACTIVE = 'is__active',
      CLASS_READY = 'is__ready',
      CLASS_FULLSCREEN = 'is__fullscreen',
      RESIZE_TRESHOLD = 150;

      var resizePhotoBox = function() {
        var h = $(window).height() - offHeight;
        $photoBox.css({
          height: h,
          'line-height': h + 'px'
        });
        return recalcScrollTreshold();
      }

      var recalcScrollTreshold = function() {
        return $box.height() - $photoBox.height() - 1;
      }

      var zoomIn = function() {
        $photoBox.addClass(CLASS_FULLSCREEN);
        isFullScreen = true;
        return true;
      }

      var zoomOut = function() {
        $photoBox.removeClass(CLASS_FULLSCREEN);
        isFullScreen = false;
        return false;
      }

      var nextImage = function() {
        var $next = $switchers.filter('.' + CLASS_ACTIVE).next();
        if (!$next.length) $next = $switchers.first();
        $next.trigger('click');
      }

      var prevImage = function() {
        var $next = $switchers.filter('.' + CLASS_ACTIVE).prev();
        if (!$next.length) $next = $switchers.last();
        $next.trigger('click');
      }

      $photos.each(function() {
        var $tab = $(this);
        $.preload($tab.find('img').attr('src'), function() {
          $tab.addClass(CLASS_READY);
        });
      });

      $switchers.on('click', function(event) {
        var $switcher = $(this),
          index = $switcher.index();

        $switchers.removeClass(CLASS_ACTIVE);
        $switcher.addClass(CLASS_ACTIVE);

        $photos.removeClass(CLASS_ACTIVE);
        $photos.eq(index).addClass(CLASS_ACTIVE);

        event.preventDefault();
      });

      $navNext.on('click', function() {
        nextImage();
      });

      $navPrev.on('click', function() {
        prevImage();
      });

      $photoBox.on('movestart', function(e) {
        // If the movestart is heading off in an upwards or downwards
        // direction, prevent it so that the browser scrolls normally.
        if ((e.distX > e.distY && e.distX < -e.distY) ||
            (e.distX < e.distY && e.distX > -e.distY)) {
          e.preventDefault();
        }
      });
      $photoBox.on('swipeleft', function(e) {
        nextImage();
      })
      $photoBox.on('swiperight', function(e) {
        prevImage();
      })

      $(window).on('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
          scrollTreshold = resizePhotoBox();
        }, RESIZE_TRESHOLD);
      });

      $(window).on('scroll', function() {
        var ofst = $(document).scrollTop();
        if (ofst > scrollTreshold) ofst = scrollTreshold;
        $photoBox.css({
          transform: 'translateY(' + ofst + 'px)'
        })
      });

      $box.on('boxresize', function() {
        scrollTreshold = recalcScrollTreshold();
        $(window).trigger('scroll');
      });

      $zoomIn.on('click', function() {
        noscroll = zoomIn();
      });


      $zoomOut.on('click', function() {
        noscroll = zoomOut();
      });

      $(document).on('keydown', function(e) {
        if (e.keyCode == 27) {
          noscroll = zoomOut();
        }
        if (noscroll) {
          if (e.keyCode == 39) {
             nextImage();
          }
          if (e.keyCode == 37) {
             prevImage();
          }
          // if (e.keyCode > 32 && e.keyCode < 41) {
          //   return false;
          // }
        }
      });

      $photos.on('click', function() {
        if ($(window).width() < 768) {
          nextImage();
        }
      });

      $photoBox.on('mousewheel DOMMouseScroll', function(e) {
        var scrollTo = null;

        if (e.type == 'mousewheel') {
            scrollTo = (e.originalEvent.wheelDelta * -1);
        }
        else if (e.type == 'DOMMouseScroll') {
            scrollTo = 40 * e.originalEvent.detail;
        }

        if (scrollTo && isFullScreen){
            e.preventDefault();
            e.stopPropagation();
            $photos.scrollTop(scrollTo + $photos.scrollTop());
        }
      });

      // // $photoBox.on('mousewheel', function(e) {
      // //   if (noscroll) {
      // //     // e.preventDefault();
      // //     e.stopPropagation();
      // //   }
      // // });
      // $photoBox.on('mousewheel DOMMouseScroll', function (e) {
      //     var e0 = e.originalEvent,
      //         delta = e0.wheelDelta || -e0.detail;

      //     this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
      //     e.preventDefault();
      // });

      scrollTreshold = resizePhotoBox();
  });
});
