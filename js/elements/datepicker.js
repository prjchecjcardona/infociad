$(function () {
    $('#fechaInvitacion').datetimepicker({
        format: 'L',
        daysOfWeekDisabled: [0, 6],
        tooltips: {
            today: 'Go to today',
            clear: 'Clear selection',
            close: 'Close the picker',
            selectMonth: 'Select Month',
            prevMonth: 'Previous Month',
            nextMonth: 'Next Month',
            selectYear: 'Select Year',
            prevYear: 'Previous Year',
            nextYear: 'Next Year',
            selectDecade: 'Select Decade',
            prevDecade: 'Previous Decade',
            nextDecade: 'Next Decade',
            prevCentury: 'Previous Century',
            nextCentury: 'Next Century',
            incrementHour: 'Increment Hour',
            pickHour: 'Pick Hour',
            decrementHour:'Decrement Hour',
            incrementMinute: 'Increment Minute',
            pickMinute: 'Pick Minute',
            decrementMinute:'Decrement Minute',
            incrementSecond: 'Increment Second',
            pickSecond: 'Pick Second',
            decrementSecond:'Decrement Second'
        }

        
        

    });

    $('#fechaReunion').datetimepicker({
        format: 'L',
        daysOfWeekDisabled: [0, 6]
    });

    $('#HoraInicio').datetimepicker({
        format: 'LT'

    });

    $('#HoraFin').datetimepicker({
        format: 'LT'
    });
});