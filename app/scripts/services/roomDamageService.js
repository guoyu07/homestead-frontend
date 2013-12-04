angular.module('roomDamages')
    .provider('roomDamageBroker', function() {

        var damageTypes = null;

        this.setDamageTypes = function(dmgTypes)
        {
            damageTypes = dmgTypes;
        }

        function DamageBroker($http) {
            this.getDamages = function() {
                //return [{id: 3, roomPersistentId: 'asdfasdfasdf', term: 201340, damageType: 100, side: 'left', note: 'Big hole in middle of the wall on left side of room under window.', repaired: false, reportedOn: 1383943450, reportedBy: 'jb67803'}];
                return $http.get('http://localhost/hms/phpws/index.php?module=hms&action=GetRoomDamages&bannerId=900325006&hallId=553');
            }

            this.getDamageTypes = function() {
                return damageTypes;
            }
        }

        this.$get = function($http) {
            return new DamageBroker($http);
        }
});
