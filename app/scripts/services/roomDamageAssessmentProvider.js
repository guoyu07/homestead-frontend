'use strict';

angular.module('roomDamages')
  .provider('roomDamageAssessment', function() {
  	var baseLocation = null;

  	this.setLocation = function(newLoc) {
  		baseLocation = newLoc;
  	}

    var term = null;

    this.setTerm = function(newTerm) {
      term = newTerm;
    }

  	var roomDamageAssessment = function($http, term) {
  		this.getDamages = function() {
  			//return {then: function(callback) { callback({'data':[{"hallName":"B","room_number":"5"},{"hallName":"B","room_number":"1"},{"term":"201340","floor_id":"3338","room_number":"307","gender_type":"1","default_gender":"3","reserved":"0","offline":"0","ra":"1","private":"0","overflow":"0","parlor":"0","ada":"0","hearing_impaired":"0","bath_en_suite":"0","persistent_id":"51faa60be83a1","banner_building_code":null,"_beds":null,"_floor":{"term":"201340","floor_number":"3","residence_hall_id":"553","is_online":"1","gender_type":"2","f_movein_time_id":"65","t_movein_time_id":"64","rt_movein_time_id":"64","rlc_id":null,"floor_plan_image_id":null,"_rooms":null,"_hall":{"hall_name":"Appalachian Heights","term":"201340","banner_building_code":"AHR","gender_type":"2","air_conditioned":"1","is_online":"1","meal_plan_required":"0","assignment_notifications":"1","exterior_image_id":"13","other_image_id":"0","map_image_id":"9","room_plan_image_id":"230","package_desk":null,"_floors":null,"_number_of_floors":0,"_rooms_per_floor":0,"_beds_per_room":0,"_numbering_scheme":0,"id":"553","added_on":"1351884963","added_by":"85","updated_on":"1377023693","updated_by":"5"},"id":"3338","added_on":"1184956407","added_by":"5","updated_on":"1184956407","updated_by":"5"},"message":"","value":false,"id":"68350","added_on":"1351884971","added_by":"85","updated_on":"1361212945","updated_by":"85","hallName":"Appalachian Heights","damages":[{"id":1017,"room_persistent_id":"51faa60be83a1","term":201340,"damage_type":2,"side":"left","note":"adfasdf","repaired":0,"reported_by":"jbooker","reported_on":1386257723,"responsibilities":[{"id":22,"banner_id":900325006,"damage_id":1017,"state":"new","amount":null,"studentName":"Jeremy Booker"},{"id":23,"banner_id":900325006,"damage_id":1017,"state":"new","amount":null,"studentName":"Jeremy Booker"}]}]}]}); }};
  			return $http.get(baseLocation + '?module=hms&ajax=true&action=GetRoomDamagesToAssess&term=' + term);
  		};

      this.postResponsibilities = function(data) {
        return $http.post(baseLocation + '?module=hms&action=AssessRoomDamage&ajax=true', {
          "responsibilities": data
        });
      };
  	}

  	this.$get = function($http) {
  		return new roomDamageAssessment($http, term);
  	}
  });
