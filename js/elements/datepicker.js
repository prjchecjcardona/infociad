$(function () {
    // Reunion
    $('#fechaInvitacion').datetimepicker({
        format: '',
        daysOfWeekDisabled: [0, 6]
    });

    $('#fechaReunion').datetimepicker({
        format: 'YYYY-MM-DD',
        daysOfWeekDisabled: [0, 6]
    });

    $('#horaInicio').datetimepicker({
        format: 'LT',
    });

    $('#horaFinalizacion').datetimepicker({
        format: 'LT'
    });

    // Pendiente
    $('#fechaEstimadaInicio').datetimepicker({
        format: 'YYYY-MM-DD',
        daysOfWeekDisabled: [0, 6]
    });

    $('#fechaEstimadaFin').datetimepicker({
        format: 'YYYY-MM-DD',
        daysOfWeekDisabled: [0, 6]
    });

});