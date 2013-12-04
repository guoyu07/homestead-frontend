angular.module('roomDamages')
    .provider('roomDamageResident', function() {

        var residents = null;

        var student = null;

        var assignment = null;

        var checkin = null;

        this.setResidents = function(resid)
        {
            residents = resid;
        }

        this.setStudent = function(stu)
        {
            student = stu;
        }

        this.setAssignment = function(assign)
        {
            assignment = assign;
        }

        this.setCheckin = function(ci)
        {
            checkin = ci;
        }

        function RoomDamageResident() {
            this.getResidents = function() {
                return residents;
            }

            this.getStudent = function() {
                return student;
            }

            this.getAssignment = function() {
                return assignment;
            }

            this.getCheckin = function() {
                return checkin;
            }
        }

        this.$get = function() {
            return new RoomDamageResident();
        }
});
