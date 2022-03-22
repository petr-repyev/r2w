$(function() {
  $('.js__item').each(function() {
    var $item = $(this),
      $sizesBox = $item.find('.js__item-sizes'),
      $sizes = $sizesBox.find('.js__item-size'),
      $sizesSelect = $item.find('.js__item-size_select'),
      $faver = $item.find('.js__item-fav'),
      $tocart = $item.find('.js__item-tocart'),
      $disclicker = $item.find('.js__item-choose'),
      $buy = $item.find('.js__item-buy'),

      $cartCounter = $('.header-cart-counter'),

      CLASS_DISABLED = 'is__disabled',
      CLASS_ACTIVE = 'is__active',
      CLASS_OUT = 'is__out',
      CLASS_WISHED = 'is__wished',
      CLASS_WISHCHANGE = 'is__wishchange',
      CLASS_BOUGHT = 'is__bought',
      CLASS_TOOSOON = 'is__toosoon',
      CLASS_LOOK = 'item_look';

    $sizes.on('click.item', function(e) {
      var $size = $(this);

      $sizes.removeClass(CLASS_ACTIVE);
      $item.removeClass(CLASS_OUT);
      $item.removeClass(CLASS_DISABLED);

      $size.addClass(CLASS_ACTIVE);
      if ($size.hasClass(CLASS_DISABLED)) {
        $item.addClass(CLASS_OUT);
      }

      e.preventDefault();
    });

    $faver.on('click.item', function(e) {
      var tip = '';
      if ($item.hasClass(CLASS_WISHED)) {
        $item.removeClass(CLASS_WISHED);
        if ($item.hasClass(CLASS_LOOK)) {
          tip = 'весь look удалён'
        }
        else {
          tip = 'товар удалён'
        }
      }
      else {
        $item.addClass(CLASS_WISHED);
        if ($item.hasClass(CLASS_LOOK)) {
          tip = 'весь look добавлен'
        }
        else {
          tip = 'товар добавлен'
        }
      }

      $faver.qtip({
        content: { text: tip },
        position: {
          my: 'bottom center',
          at: 'top center',
          target: $faver
        },
        show: {
          event: 'click'
        },
        hide: {
          delay: 1500
        }
      });
      $(this).qtip('show');

      e.preventDefault();
    });



    $tocart.on('click.item', function(e) {
      $item.toggleClass(CLASS_BOUGHT);
      $sizes.off('click.item')
      e.preventDefault();
      $cartCounter.addClass(CLASS_ACTIVE).text(parseInt($cartCounter.text()) + 1);
      setTimeout(function() {
        $cartCounter.removeClass(CLASS_ACTIVE)
      }, 300);
    });

    $disclicker.on('click.item', function(e) {
      e.preventDefault();
      $item.addClass(CLASS_TOOSOON);
      setTimeout(function() {
        $item.removeClass(CLASS_TOOSOON);
      }, 300);
    });


    $sizesSelect.on('change', function(e) {
      var $size = $(this);

      $sizes.removeClass(CLASS_ACTIVE);
      $item.removeClass(CLASS_OUT);
      $item.removeClass(CLASS_DISABLED);

      $size.addClass(CLASS_ACTIVE);
      // if ($size.hasClass(CLASS_DISABLED)) {
      //   $item.addClass(CLASS_OUT);
      // }
    })
  });
});
