'use strict';

angular.module('roomDamages')
    .provider('roomDamageType', function() {

        var damageTypes = null;

        this.setDamageTypes = function(dmgTypes)
        {
            damageTypes = dmgTypes;
        }

        this.$get = function()
        {
       		return damageTypes;
        }
    });