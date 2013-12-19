'use strict';

angular.module('roomDamages')
    .provider('roomDamageBroker', function() {

        var baseLocation = null;

        this.setLocation = function(newLoc)
        {
            baseLocation = newLoc;
        }

        function DamageBroker($http, bedId) {
            this.getDamages = function() {
                return $http.get(baseLocation + '?module=hms&ajax=true&action=GetRoomDamages&bed_id=' + bedId);
            }

            this.getBaseLocation = function() {
                return baseLocation;
            }
        }

        this.$get = function($http, roomDamageResident) {
            return new DamageBroker($http, roomDamageResident.getCheckin().bed_id);
        }
});
