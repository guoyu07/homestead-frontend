var myApp = angular.module('hmsAngularApp');

myApp.controller('RoomDamageAssessmentCtrl', ['$scope', 'roomDamageType', 'roomDamageAssessment', function($scope, roomDamageType, roomDamageAssessment) {
	roomDamageAssessment.getDamages().then(function (response) {
		$scope.assessment = {
			rooms: response.data
		};
	});

	$scope.damageTypes = roomDamageType;

	$scope.sumAmounts = function(responsibilities) {
        if(!responsibilities){
            return;
        }

		var acc = 0.0;
		for(var index in responsibilities) {
			if(!!responsibilities[index] && !!responsibilities[index].amount) {
				acc += Number(responsibilities[index].amount);
			}
		}
		return acc.toFixed(2);
	}

	$scope.submitDamage = function(room) {
		room.submitted = 'saving';

		var data = [];

		for(var di in room.damages) {
			for(var ri in room.damages[di].responsibilities) {
				data.push(room.damages[di].responsibilities[ri]);
			}
		}

		roomDamageAssessment.postResponsibilities(data)
			.success(function(data, status, headers, config) {
				room.submitted = 'success';
			})
			.error(function(data, status, headers, config) {
				room.submitted = 'failure';
			})
	}

	$scope.splitEvenly = function(damage) {
		var peeps = damage.responsibilities.length;
		var each = $scope.damageTypes[damage.damage_type].cost / peeps;

		for(var index in damage.responsibilities) {
			damage.responsibilities[index].amount = each.toFixed(2);
		}
	}
}]);
