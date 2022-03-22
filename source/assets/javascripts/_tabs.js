$(function() {
  $('.js__tabs').each(function() {
    var $box = $(this),
      $switchersBox = $box.find('.js__tabs-switchers').first(),
      $switchers = $switchersBox.find('.js__tabs-switcher-item'),
      $tabsBox = $box.find('.js__tabs-container').first(),
      $tabs = $tabsBox.children('.js__tabs-tab'),

      CLASS_ACTIVE = 'is__active';

    $switchers.on('click', function() {
      $switchers.removeClass(CLASS_ACTIVE);
      $tabs.removeClass(CLASS_ACTIVE);

      $(this).addClass(CLASS_ACTIVE);
      $tabs.eq($(this).index()).addClass(CLASS_ACTIVE);

      return false;
    });
  });
});
