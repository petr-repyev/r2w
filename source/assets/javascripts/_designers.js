$(function() {
  $('.js__des').each(function() {
    var $box = $(this),
      $filters = $box.find('.js__des-filter-list a'),
      $filtersReset = $box.find('.js__des-filter-reset'),
      $itemsBox = $box.find('.js__des-list'),

      CLASS_ACTIVE = 'is__active';

    $filters.on('click', function(e) {
      e.preventDefault();
      $itemsBox.attr('data-filter', $(this).text().toLowerCase());

      $filters.removeClass(CLASS_ACTIVE);
      $filtersReset.removeClass(CLASS_ACTIVE);
      $(this).addClass(CLASS_ACTIVE);
    });

    $filtersReset.on('click', function(e) {
      e.preventDefault();
      $itemsBox.removeAttr('data-filter');

      $filters.removeClass(CLASS_ACTIVE);
      $(this).addClass(CLASS_ACTIVE);
    });
  });
});
