$(function() {
  $('.js__filterbox').each(function() {
    var $box = $(this),
      $body = $(this).find('.filterbox-body'),
      $blocks = $box.find('.js__block'),
      $flist = $box.find('.js__flist'),
      $filters = $box.find('.filter-item'),
      $tboxes = $box.find('.js__tbox'),
      $closer = $box.find('.js__filterbox-closer'),
      $filterLink = $('.js__filter-click'),
      $filterOverlay = $('#js__filterbox-overlay'),
      $scrollers = $box.find('.scroll'),
      $cleaners = $box.find('.js__filter-category-cleaner'),

      $reset = $box.find('.js__filter-reset'),
      $apply = $box.find('.js__filter-apply')

      CLASS_ACTIVE = 'is__active',
      CLASS_CHSD = 'is__chsd',
      CLASS_FLTRD = 'is__fltrd';

    function checkFList() {
      if (!$flist.children().length) $box.removeClass(CLASS_FLTRD);
    }

    function setHeight() {
      $tboxes.css('margin-top', $flist.height());
    }

    function checkBlock($block) {
      var $fltrs = $block.find($filters);
      var fl = false;
      $fltrs.each(function(index, fltr) {
        if ($(fltr).hasClass(CLASS_ACTIVE)) {
          fl = true;
        }
      });
      if (!fl) {
        $block.removeClass(CLASS_FLTRD);
      }
    }

    $blocks.each(function() {
      var $block = $(this);
      $block.find('.js__block-clicker').on('click.filter', function(e) {
        e.preventDefault();
        if ($block.hasClass(CLASS_CHSD)) $block.removeClass(CLASS_CHSD);
        else {
          $blocks.removeClass(CLASS_CHSD);
          $block.addClass(CLASS_CHSD);
        }
      })
    });

    $filters.on('click', function() {
      var id = $(this).data('id'),
        $el = $flist.find('[data-id="' + id + '"]');
      if ($el.length) {
        $el.remove();
        $(this).removeClass(CLASS_ACTIVE);
        checkFList();
        checkBlock($(this).closest($blocks))
      }
      else {
        $flist.append('<span class="filter-item" data-id="' + id + '">' + $(this).text() + ' <span class="filter-item-disable"></span></span>')
        $(this).addClass(CLASS_ACTIVE);
        $box.addClass(CLASS_FLTRD);
        $(this).closest($blocks).addClass(CLASS_FLTRD);
      }
      setHeight();
      return false;
    });

    $cleaners.on('click', function() {
      var $filters = $(this).closest($blocks).find('.filter-item');
      // console.log($(this).closest($blocks).find('.filter-item'));
      $filters.each(function(i, fltr) {
        if ($(fltr).hasClass(CLASS_ACTIVE)) {
          $(fltr).trigger('click');
        }
      });
    });

    $flist.on('click', '.filter-item', function() {
      var id = $(this).data('id');

      var $fltr = $filters.filter('[data-id="' + id + '"]')

      $fltr.removeClass(CLASS_ACTIVE);
      checkBlock($fltr.closest($blocks))

      $(this).remove();
      checkFList();
      setHeight();
    })

    $reset.on('click', function(e) {
      e.preventDefault();
      $flist.empty();
      $filters.removeClass(CLASS_ACTIVE);
      $box.removeClass(CLASS_FLTRD);
      setHeight();
    });

    $apply.on('click', function(e) {
      e.preventDefault();
      $box.removeClass(CLASS_ACTIVE);
      $filterLink.removeClass(CLASS_ACTIVE);
    });

    $closer.on('click', function(e) {
      e.preventDefault();
      $box.removeClass(CLASS_ACTIVE);
    });

    $filterOverlay.on('click', function() {
      $box.removeClass(CLASS_ACTIVE);
    });


    $box.on('click', function() {
      $box.removeClass(CLASS_ACTIVE);
    });
    $body.on('click', function(e) {
      e.stopPropagation();
    });

    $('body').on('mobile', function() {
      $filterLink.off('click.filter');
      $scrollers.perfectScrollbar('destroy');
    })
    $('body').on('tablet', function() {
      $filterLink.on('click.filter', function(e) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: $(this).offset().top - 75
        }, 300);

      });
      $scrollers.perfectScrollbar({
        suppressScrollX: true
      });
    })
  });
});
