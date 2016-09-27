angular.module('common', [
  // Declare here all AngularJS dependencies that are shared by all modules.
  'supersonic'
])
.constant('Coupons', supersonic.data.model('coupons'))
.constant('Business', supersonic.data.model('Business'));;
