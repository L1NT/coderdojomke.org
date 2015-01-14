var UpcomingEvents = function () {

    var loadEvents = function () {
        $.ajax({
            method: 'GET',
            url: 'https://www.eventbriteapi.com/v3/events/search',
            data: {
                'token': 'VXFP6CIOSA7NV6PAHWL5',
                'organizer_id': '6894758817'
            },
            success: function (data, status, xhr) {
                if (data.pagination.page_count == 1) {
                    var futureEventList = $('#future-event-list')[0]; //lets assume there's only one
                    $.each(data.events, function(index, event) {
                        var formattedDate = event.start.local.split('T')[0].replace('-', '/');

                        var li = futureEventList.append('<li>')
                                    .append('<a class="event-date-and-time"')
                                    .prop('href', event.url)
                                    .html(data.name.text + ' ' + formattedDate);
                        $.each(event.ticket_classes, function (index, element) {
                            if (element.quantity_total - element.quantity_sold === 0) {
                                li.append('<p>Sorry, this ticket type is sold out! Please try selecting a future event.</p>');
                            } else {
                                var available = element.quantity_total - element.quantity_sold;
                                li.append('<p class="availability-info"><span class="number-available">' + available + ' ' + element.name + ' Session</span> tickets available</p>');
                            }
                        });
                    });
	            }
            }
        });
    };

    var _public = {};
    _public.init = function () {
        loadEvents();
    };

    return _public;
}();
$(document).ready(UpcomingEvents.init);