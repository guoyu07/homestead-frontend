angular.module('roomDamages')
    .provider('roomDamageBroker', function() {

        var damageTypes = null;

        var baseLocation = null;

        this.setDamageTypes = function(dmgTypes)
        {
            damageTypes = dmgTypes;
        }

        this.setLocation = function(newLoc)
        {
            baseLocation = newLoc;
        }

        function DamageBroker($http, bedId) {
            this.getDamages = function() {
                //return [{id: 3, roomPersistentId: 'asdfasdfasdf', term: 201340, damageType: 100, side: 'left', note: 'Big hole in middle of the wall on left side of room under window.', repaired: false, reportedOn: 1383943450, reportedBy: 'jb67803'}];
                return $http.get(baseLocation + '?module=hms&ajax=true&action=GetRoomDamages&bed_id=' + bedId);
            }

            this.getDamageTypes = function() {
                return damageTypes;
            }

            this.getBaseLocation = function() {
                return baseLocation;
            }
        }

        this.$get = function($http, roomDamageResident) {
            return new DamageBroker($http, roomDamageResident.getCheckin().bed_id);
        }
});
