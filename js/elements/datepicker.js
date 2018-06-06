$(function () {
    $('#fechaInvitacion').datetimepicker({
        format: 'L',
        daysOfWeekDisabled: [0, 6]
    });

    $('#fechaReunion').datetimepicker({
        format: 'L',
        daysOfWeekDisabled: [0, 6]
    });

    $('#horaInicio').datetimepicker({
        format: 'LT'
    });

    $('#horaFinalizacion').datetimepicker({
        format: 'LT'
    });

});