'use strict';

var myApp = angular.module('hmsAngularApp');

myApp.controller('CheckoutCtrl', ['$scope', 'roomDamageBroker', 'roomDamageResident', 'roomDamageType', '$http', function ($scope, roomDamageBroker, roomDamageResident, roomDamageType, $http) {
    // Existing room damages, AJAX'd in
    roomDamageBroker.getDamages().then(function (response) {
        $scope.damages = response.data;
    });

    // Array of damage types/descriptions, loaded statically at page generation
    $scope.dmgTypes = roomDamageType;

    // Array of new damages being added to the room
    $scope.newDamages = [];

    // List of residents in the room, by student id => name
    $scope.residents = roomDamageResident.getResidents();

    // Student name
    $scope.student = roomDamageResident.getStudent();

    // Student's assignment
    $scope.assignment = roomDamageResident.getAssignment();

    // Checkin information
    $scope.checkin = roomDamageResident.getCheckin();

    // Add an new (empty) damage object to the array of new damages
    $scope.addDamage = function() {
        //var res = $scope.residents.slice(0);
        var res = angular.copy($scope.residents);
        //res[0].selected = 1;

        $scope.newDamages.push({
                residents: res});
    }

    // Remove a given damage from the array of new damages
    $scope.removeDamage = function(index) {
        $scope.newDamages.splice(index, 1);
    }

    // Initialize other data field
    $scope.data = {};
    $scope.data.keyCode = '';
    $scope.data.keyReturned = -1;       // -1=unset, 0=no, 1=yes
    $scope.data.properCheckout = -1;    // -1=unset, 0=no, 1=yes

    // This will let us show any errors on non-dirty fields on submit
    // TODO: implement setDirty in Angular lol
    $scope.triedSubmit = false;

    // TODO: Proper Directive
    var keyReturnValidity = function() {
        $scope.checkout_form.keyCode.$setValidity('keyReturn',
            $scope.data.keyReturned != 1 || !!$scope.data.keyCode);
        $scope.checkout_form.keyReturned.$setValidity('keyReturn',
            $scope.data.keyReturned != -1);
    };
    $scope.$watch('data.keyReturned', keyReturnValidity);
    $scope.$watch('data.keyCode', keyReturnValidity);

    var properCheckoutValidity = function() {
        $scope.checkout_form.properCheckout.$setValidity('properCheckout',
            $scope.data.properCheckout != -1);
    }
    $scope.$watch('data.properCheckout', properCheckoutValidity);

    // Submit handler
    $scope.submitHandler = function ()
    {
        $scope.triedSubmit = true;
        // For each new damage
        for(var i=0; i < $scope.newDamages.length; i++){
            var aResSelected = false;

            // For each resident in the damage
            for(var j in $scope.newDamages[i].residents){
                if($scope.newDamages[i].residents[j].selected){
                    aResSelected = true;
                }
            }

            // If we made it through all the residents and nothing was selected, show an error
            if(!aResSelected){
                alert('Please select at least one student who is responsible for each damage.');
                return;
            }
        }

        if(!$scope.checkout_form.$valid) {
            alert('Cannot complete checkout because the form is incomplete.  Please check the form for errors.');
            return;
        }

        var baseLocation = roomDamageBroker.getBaseLocation();

        $http.post(baseLocation + '?module=hms&action=CheckoutFormSubmit&ajax=true', {'bannerId': $scope.student.studentId, 'checkinId': $scope.checkin.id, 'keyCode': $scope.data.keyCode, 'keyReturned': $scope.data.keyReturned, 'newDamages': $scope.newDamages, 'properCheckout': $scope.data.properCheckout})
            .success(function (data, status, headers, config){
                window.location = headers('location');
            })
            .error(function(data, status, headers, config){
                alert('Something went wrong while saving this checkout. Please contact the Housing Assignments Office.');
            });
    }
    
}]);
