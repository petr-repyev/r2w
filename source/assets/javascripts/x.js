//= require lib/preload.js
//= require lib/chosen.js
//= require lib/masonry.js
//= require lib/magnific.js
//= require lib/qtip.js
//= require lib/swipe.js
//= require lib/pscroll.js
//= require lib/form.js

//= require _menu.js
//= require _filters.js
//= require _item.js
//= require _product.js
//= require _slider.js
//= require _toggler.js
//= require _footer.js
//= require _events.js
//= require _tabs.js
//= require _designers.js
//= require _qa.js
//= require _alert.js
//= require _search.js

var isMobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
  isMobile = true;
}

$(function() {
  var state = -1,
    stTo,
    $body = $('body');

  function checkState() {
    var w = $(window).width(),
      oldState = state;
    if (w > 1024) {
      if (state == 0) return false;
      else {
        state = 0;
        $body.trigger('desktop');
        return 'desktop';
      }
    }
    else if (w > 768) {
      console.log(2);
      if (state == 1) return false;
      else {
        state = 1;;
        $body.trigger('tablet');
        return 'tablet';
      }
    }
    else {
      if (state == 2) return false;
      else {
        state = 2;
        $body.trigger('mobile');
        return 'mobile';
      }
    }
  }

  $(window).resize(function() {
    clearTimeout(stTo);
    stTo = setTimeout(function() {
      checkState();
    }, 100);
  });

  var $categories = $('.category-item');
  $('.category-list').on('click', '.category-title', function() {
    $categories.removeClass(CLASS_ACTIVE);
    $(this).closest('.category-item').addClass(CLASS_ACTIVE);
    return false;
  });

  // $('.block').each(function() {
  //   var $box = $(this);
  //   var $t = $('.js__product');
  //   $box.find('.block-header').on('click', function() {
  //     $box.toggleClass(CLASS_ACTIVE);
  //     if ($t.length) $t.trigger('boxresize');
  //   });
  // })

  var $addresses = $('.address');
  $addresses.on('click', function() {
    $addresses.removeClass(CLASS_ACTIVE);
    $(this).addClass(CLASS_ACTIVE);
  });

  var $blocks = $('.js__block');
  $blocks.each(function() {
    var $block = $(this)
    $block.find('.js__block-clicker').on('click', function(e) {
      e.preventDefault();
      $block.toggleClass(CLASS_ACTIVE);
      $('.js__product').trigger('boxresize');
    });
  });

  $('.form-select').each(function() {
    var w = $(this).data('width');
    $(this).chosen({
      width: w,
      disable_search: true,
      placeholder_text_single: " "
    });
  });

  var $tables = $('.js__table');
  $tables.each(function() {
    $clickers = $(this).find('.js__table-clicker');
    $clickers.on('click', function() {
      $(this).toggleClass(CLASS_ACTIVE);
      $(this).next('.js__table-box').toggleClass(CLASS_ACTIVE);
    })
  });

  var $container = $('.article-list');
  $container.imagesLoaded( function() {
    $container.masonry({
      itemSelector: '.article-item',
      width: 370,
      gutter: 30
    });
  });

  var $cnt = $('.media');
  $cnt.imagesLoaded( function() {
    $cnt.masonry({
      itemSelector: '.media-block',
      width: 270,
      gutter: 115
    });
  });

  $('.js__line').each(function() {
    var $line = $(this),
      $remover = $line.find('.js__line-remover');

      $remover.on('click', function() {
        $line.remove();
      })
  })

  $('.js__popup-link').magnificPopup({
    type: 'inline'
  });
  $('.js__gallery').each(function() {
    $(this).magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
          enabled:true
        }
    });
  });

  // $('.menubox-sub-clicker').on('click', function() {
  //   $(this).next('.menubox-sub').addClass(CLASS_ACTIVE);
  // });
  // $('.menubox-sub').on('click', function(e) {
  //   e.stopPropagation();
  // })
  // $('.header-menu-link').on('click', function() {
  //   $('.menubox-sub').removeClass(CLASS_ACTIVE);
  // });
  // $('.menubox-overlay').on('click', function(e) {
  //   e.stopPropagation();
  //   $(this).parent().removeClass('.is__active');
  //   $('.menubox-sub').removeClass(CLASS_ACTIVE);
  // })



  $('.js__banner').each(function() {
    var $box = $(this),
      $closer = $box.find('.js__banner-close'),
      id = $box.data('bannerId');

    // if (!localStorage['banner' + id])
      $box.addClass(CLASS_ACTIVE);
    $closer.on('click', function() {
      $box.removeClass(CLASS_ACTIVE);
      localStorage['banner' + id] = false;
    });
  });

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  $('.js__subscribe').each(function() {
    var $box = $(this),
      $button = $box.find('.js__subscribe-button'),
      $input = $box.find('.js__subscribe-input'),

      CLASS_BTN = 'button_alt',
      TEXT_SUB = 'Подписаться',
      TEXT_UNSUB = 'Отписаться';

    $box.on('submit', function(e) {
      e.preventDefault();
      var id = '#notsubscribed';
      if ($box.hasClass(CLASS_ACTIVE)) {
        id = '#unsubscribed';
        $input.prop('disabled', false);
        $button.text(TEXT_SUB).addClass(CLASS_BTN);
        $box.removeClass(CLASS_ACTIVE);
      }
      else if (isEmail($input.val())) {
        id = '#subscribed';
        $input.prop('disabled', true);
        $button.text(TEXT_UNSUB).removeClass(CLASS_BTN);
        $box.addClass(CLASS_ACTIVE);
      }
      $.magnificPopup.open({
        items: {
          src: id
        },
        type: 'inline'
      });
    });
  })

  $('.js__popup-closer').on('click', function(e) {
    e.preventDefault();
    $.magnificPopup.close();
  });

  $('.olist-table').each(function() {
    $(this).find('.olist-desc:odd').addClass('strip')
  });

  $('.olist-collapse').on('click', function(e) {
    e.preventDefault();
  });

  $('.js__search').each(function() {
    var $box = $(this),
      $toggler = $box.find('.js__search-expander');

    $toggler.on('click', function(e) {
      e.preventDefault();
      $box.addClass(CLASS_ACTIVE);
      $toggler.remove();
    })
  });

  $('.js__order-item').each(function() {
    var $box = $(this),
      $clicker = $box.find('.js__order-item-remove');

    $clicker.on('click', function(e) {
      e.preventDefault();
      $box.remove();
    });

  })

  function addNoScrollEvent($el, $target) {
    $el.on('mousewheel DOMMouseScroll', function(e) {
      var scrollTo = null;

      if (e.type == 'mousewheel') {
          scrollTo = (e.originalEvent.wheelDelta * -1);
      }
      else if (e.type == 'DOMMouseScroll') {
          scrollTo = 20 * e.originalEvent.detail;
      }

      if (scrollTo) {
          e.preventDefault();
          e.stopPropagation();
          $target.scrollTop(scrollTo + $target.scrollTop());
      }
    });
  }
  $('.js__noscroll').each(function() {
    var $scrlr = $(this).find('.scroll');
    addNoScrollEvent($(this), $scrlr);
  });

  $('.js__filterbox, #mmenu').each(function() {
    var $jsf = $(this),
      $scrlr = $jsf.find('.scroll');
    $body.on('tablet', function() {
      addNoScrollEvent($jsf, $scrlr);
    });
    $body.on('mobile', function() {
      addNoScrollEvent($jsf, $jsf);
    });
    $body.on('desktop', function() {
      $jsf.off('mousewheel DOMMouseScroll');
    });

    $(window).trigger('resize');
  });

  $('.sidebox').each(function() {
    var $jsf = $(this),
      $scrlr = $jsf.find('.scroll');

    $body.on('mobile', function() {
      addNoScrollEvent($jsf, $scrlr);
    });
    $body.on('desktop tablet', function() {
      $jsf.off('mousewheel DOMMouseScroll');
    });

    $(window).trigger('resize');
  });

  $('.js__form').on('submit', function(e) {
    var isValid = true,
      $goLink = $(this).find('.js__form-go'),

      CLASS_ERROR = 'form-error',
      TEXT_REQUIRED = 'это поле обязательно для заполнения',
      TEXT_EMAILFORMAT = 'неверный формат имэйла'

    $(this).find('.form-row').each(function() {
      var $row = $(this),
        $input = $row.find('.form-input'),
        $helper = $row.find('.form-notifier');

      $row.removeClass(CLASS_ERROR);
      $input.on('keydown', function() {
        $row.removeClass(CLASS_ERROR);
      });

      if (!!$input.attr('required') && !$input.val().length) {
        isValid = false;
        $row.addClass(CLASS_ERROR);
        $helper.text(TEXT_REQUIRED);
      }
      else if ($input.attr('type') === 'email' && !isEmail($input.val())) {
        isValid = false;
        $row.addClass(CLASS_ERROR);
        $helper.text(TEXT_EMAILFORMAT);
      }
    });

    e.preventDefault();
    if (isValid) {
      // submit
      $goLink.trigger('click');
    }
  })

  $('.brands').each(function() {
    var $boxes = $(this).find('.brands-list');
    $boxes.each(function() {
      var $box = $(this),
        $clicker = $box.find('h2');

      $clicker.on('click', function(e) {
        e.preventDefault();
        $box.toggleClass(CLASS_ACTIVE);
      })
    })
  });

  $('.js__balance').each(function() {
    var $box = $(this),
      $checker = $box.find('.js__balance-check'),
      $resetter = $box.find('.js__balance-reset');

    $checker.on('click', function(e) {
      e.preventDefault();
      $box.addClass(CLASS_ACTIVE);
    })
    $resetter.on('click', function(e) {
      e.preventDefault();
      $box.removeClass(CLASS_ACTIVE);
    })
  });

  $('.js__prechoice').each(function() {
    var $box = $(this),
      $choices = $box.find('.js__prechoice-filler'),
      $city = $box.find('.js__prechoice-city'),
      $region = $box.find('.js__prechoice-region'),
      $country = $box.find('.js__prechoice-country');

    $choices.on('click', function(e) {
      var $ch = $(this);
      e.preventDefault();
      console.log($region, $ch.data('prechoice-region'));

      $choices.removeClass(CLASS_ACTIVE)
      $ch.addClass(CLASS_ACTIVE);

      $city.val($ch.data('prechoice-city'));
      $region.val($ch.data('prechoice-region')).trigger('chosen:updated');
      $country.val($ch.data('prechoice-country')).trigger('chosen:updated');
    })
  })

  $('.cart-item-remove').on('click', function(e) {
    e.preventDefault();
    $(this).parent().remove();
  });

  var ws = 10;
  if(navigator.platform.indexOf('Win') != -1) ws = 100;
  $('.scroll').perfectScrollbar({
    suppressScrollX: true,
    wheelSpeed: ws
  });
  // $('.js__filterbox').pefectScrollbar('destroy');

  // $('.js__form').ajaxForm(function() {
  //   console.log('ok')
  // });

  var $html = $('html'),
    $body = $('body'),
    $footer = $('.footer_static'),

    CLASS_FIXED = 'html__fixed';

  var heighter = function() {
    var height = $(window).height();
    console.log(height, $body.outerHeight());
    $html.removeClass(CLASS_FIXED);
    if (height >= $body.outerHeight()) {
      $body.css({
        'padding-bottom': $footer.height()
      })
      $html.addClass(CLASS_FIXED);
    }
    else {
      $body.css({
        'padding-bottom': 0
      })
      $html.removeClass(CLASS_FIXED);
    }
  };

  heighter();

  $(window).resize(heighter);
});
