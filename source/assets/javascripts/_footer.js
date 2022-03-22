$(function() {
  var $footer = $('.footer_fixed'),
    $staticFooter = $('.footer_static'),
    $cartFooter = $('#cart_footer'),
    maxOffset,
    scrollTimeout,
    windowTimeout;

    CLASS_ACTIVE = 'is__active';

  function setMaxOffset() {
    maxOffset = $staticFooter.offset().top - $(window).height() + 30;
  }

  setMaxOffset();

  windowTimeout = setTimeout(function() {
    setMaxOffset();
  }, 1000);

  setTimeout(function() {
    $(window).trigger('resize');
  }, 3000);

  $(window).scroll(function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
      $footer.removeClass(CLASS_ACTIVE);
      $cartFooter.removeClass(CLASS_ACTIVE);
      if ($(document).scrollTop() < maxOffset) {
        $footer.addClass(CLASS_ACTIVE);
      }
      if ($(document).scrollTop() < maxOffset - 300) {
        $cartFooter.addClass(CLASS_ACTIVE);
      }
    }, 100)
  });

  $(window).resize(function() {
    clearTimeout(windowTimeout);
    windowTimeout = setTimeout(function() {
      setMaxOffset();
    }, 100);
  });
})
