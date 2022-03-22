$(function() {
  $('.js__qa').each(function() {
    var $box = $(this),
      $filters = $box.find('.js__qa-filter-item'),
      $items = $box.find('.js__qa-item'),

      CLASS_ACTIVE = 'is__active',
      CLASS_HIDDEN = 'is__hidden';

    $items.on('click', function() {
      $(this).toggleClass(CLASS_ACTIVE);
    });

    $filters.on('click', function(e){
      var type = $(this).data('filter');
      if (type.length) {
        $items.addClass(CLASS_HIDDEN);
        $items.filter('[data-filter~="' + type + '"]').removeClass(CLASS_HIDDEN)
      }
      else {
        $items.removeClass(CLASS_HIDDEN);
      }

      $filters.removeClass(CLASS_ACTIVE);
      $(this).addClass(CLASS_ACTIVE);

      e.preventDefault();
    })
  })
});
