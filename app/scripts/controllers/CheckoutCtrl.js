var myApp = angular.module('hmsAngularApp');

myApp.controller('CheckoutCtrl', ['$scope', 'roomDamageBroker', 'roomDamageResident', '$http', function ($scope, roomDamageBroker, roomDamageResident, $http) {
"use strict";
    // Existing room damages, AJAX'd in
    roomDamageBroker.getDamages().then(function (response) {
        $scope.damages = response.data;
    });

    // Array of damage types/descriptions, loaded statically at page generation
    $scope.dmgTypes = roomDamageBroker.getDamageTypes();

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
    $scope.data.keyNotReturned = '';
    $scope.data.improperCheckout = '';

    // Submit handler
    $scope.submitHandler = function ()
    {
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

        $http.post('index.php?module=hms&action=CheckoutFormSubmit', {'bannerId': $scope.student.studentId, 'checkinId': $scope.checkin.id, 'keyCode': $scope.data.keyCode, 'keyNotReturned': $scope.data.keyNotReturned, 'newDamages': $scope.newDamages, 'improperCheckout': $scope.data.improperCheckout})
            .success(function (data){
                console.log('posted');
            });
    }
    
}]);
