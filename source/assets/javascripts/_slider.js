$(function() {
  $('.js__slider').each(function() {
    var $slider = $(this),
      $nav = $slider.find('.js__slider-nav'),
      $navPrev = $nav.filter('.js__slider-nav_prev'),
      $navNext = $nav.filter('.js__slider-nav_next'),
      $limiter = $slider.find('.js__slider-limiter'),
      $list = $limiter.find('.js__slider-list'),
      $items = $list.find('.js__slider-item'),

      itemWidth = $items.first().outerWidth(true),
      // listWidth = $items.length * itemWidth,
      maxOffset = 1,
      offset = 0,

      CLASS_DISABLED = 'is__disabled',
      RESIZE_TRESHOLD = 150;

    var calcSliderSize = function() {
      var num = parseInt(($slider.width() - 40) / itemWidth),
        sliderWidth = num * itemWidth;
      maxOffset = $items.length - num;
      if (num >= $items.length) {
        $slider.addClass(CLASS_DISABLED);
      }
      else {
        $slider.removeClass(CLASS_DISABLED);
        $limiter.width(sliderWidth);
      }
    };

    var slide = function(offset) {
      $list.css({
        transform: 'translateX(' + (-offset * itemWidth) + 'px)'
      });
    };

    var calcNext = function() {
      if (offset > maxOffset) offset = maxOffset;
      slide(offset);

      $nav.removeClass(CLASS_DISABLED);
      if (offset == maxOffset) $navNext.addClass(CLASS_DISABLED);
    };

    var slideLeft = function() {
      offset++;
      calcNext();
    };
    var slideRight = function() {
      offset--;
      if (offset < 0) offset = 0;
      slide(offset);

      $nav.removeClass(CLASS_DISABLED);
      if (offset == 0) $navPrev.addClass(CLASS_DISABLED);
    };

    $navNext.on('click', function() {
      slideLeft();
    });

    $navPrev.on('click', function() {
      slideRight();
    });

    $slider.on('movestart', function(e) {
        // If the movestart is heading off in an upwards or downwards
        // direction, prevent it so that the browser scrolls normally.
        if ((e.distX > e.distY && e.distX < -e.distY) ||
            (e.distX < e.distY && e.distX > -e.distY)) {
          e.preventDefault();
        }
    });
    $slider.on('swiperight', function(e) {
      slideRight();
    });
    $slider.on('swipeleft', function(e) {
      slideLeft();
    });

    $(window).on('resize', function() {
      resizeTimeout = setTimeout(function() {
        calcSliderSize();
        calcNext();
      }, RESIZE_TRESHOLD);
    });

    calcSliderSize();
  });
});
