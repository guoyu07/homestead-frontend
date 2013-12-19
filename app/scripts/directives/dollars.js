var myApp = angular.module('hmsAngularApp');

myApp.directive('dollars', function() {
	return {
		require: 'ngModel',
		link: function(scope, elem, attrs, modelCtrl) {
			// TODO: locale could really affect this but we're Americans and don't care
			// This is somewhat permissive, will allow 1, 12, 123, ..., 123., 123.4, 123.45
			var cashRegex = /^(?:[0-9]+(?:\.(?:[0-9](?:[0-9])?)?)?)?$/;

			var lastGood = scope.$eval(attrs.ngModel);

			var skipWatch = false;

			scope.$watch(attrs.ngModel, function(newval, oldval) {
				modelCtrl.$setValidity('dollars', !!newval && cashRegex.test(newval));

				if(skipWatch) return;

				if(newval == null) return;

				if(!cashRegex.test(newval)) {
					skipWatch = true;
					scope.$eval(attrs.ngModel + ' = ' + angular.toJson(oldval));
					setTimeout(function() { skipWatch = false; }, 0);
				}
			})
		}
	}
})