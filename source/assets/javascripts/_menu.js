$(function() {
  $('.js__menubox').each(function() {
      var $box = $(this),
        $blocks = $box.find('.js__menubox-block'),
        $closer = $box.find('.js__menubox-closer'),
        $link = $('.header-menu-link'),

        CLASS_ACTIVE = 'is__active';

      $blocks.each(function(){
        var $block = $(this);
        $block.find('.js__menubox-block-clicker').on('click', function(e) {
          e.preventDefault();
          if ($block.hasClass(CLASS_ACTIVE)) $block.removeClass(CLASS_ACTIVE);
          else {
            $blocks.removeClass(CLASS_ACTIVE);
            $block.addClass(CLASS_ACTIVE);
          }
        });
      });

      $box.on('click', function(e) {
        e.stopPropagation();
      })

      $closer.on('click', function() {
        $box.removeClass(CLASS_ACTIVE);
        $(document).trigger('closeall');
        $link.removeClass(CLASS_ACTIVE);
      });

      $(document).on('click', function() {
        $box.removeClass(CLASS_ACTIVE);
        $(document).trigger('closeall');
        $link.removeClass(CLASS_ACTIVE);
      });
  });
});
